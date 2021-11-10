import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { useDataContext } from "../../../contexts/DataContext";
import Select from "react-select";
import { toast } from "react-toastify";

import { Badge, Button } from "react-bootstrap";
import AddressModal from "./AddressModal";
import bg5 from "../../../images/big/customer-header.jpg";

const CustomerForm = (props) => {
  const { deliveryLocationList } = useDataContext();
  const [deliveryLocation, setDeliveryLocation] = useState();

  const initialFieldValues = {
    id: "",
    name: "",
    contactNumber: "",
    address: [],
    landmark: "",
    housePicture: "",
    isActive: "true",
    dateJoined: new Date().toLocaleDateString(),
  };

  var [values, setValues] = useState(initialFieldValues);

  var [currentId, setCurrentId] = useState("");

  useEffect(() => {
    if (props.currentId === "") {
      setViewMode(false);
      setValues({
        ...initialFieldValues,
      });
    } else {
      setViewMode(true);
      setValues({
        ...props.customerList[props.currentId],
      });
    }
  }, [props.currentId, props.customerList]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCurrentAddressChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setCurrentAddress({
      ...currentAddress,
      [name]: value,
    });
  };

  const [viewMode, setViewMode] = useState(false);

  const readImages = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const imagesRef = storage.ref("customer/house").child(id);

    await imagesRef.put(file);
    imagesRef.getDownloadURL().then((url) => {
      setCurrentAddress({ ...currentAddress, housePicture: url });
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.addOrEdit(values);
  };

  // prepares delivery locations data for combobox
  const deliveryOptions = [];
  if (deliveryLocationList) {
    Object.keys(deliveryLocationList).map((id) => {
      return deliveryOptions.push({
        value: deliveryLocationList[id].completeLocation,
        label: deliveryLocationList[id].completeLocation,
        location: deliveryLocationList[id],
      });
    });
  }

  const handleDefaultAddress = (address, index) => {
    editAddress(address, index, false);

    const updatedAddressList = values.address.slice();

    //flip all default status to false
    updatedAddressList.map((address) => {
      address.default = false;
    });

    updatedAddressList[index] = {
      ...updatedAddressList[index],
      default: true,
    };

    // console.log("saving address... ", updatedAddressList);

    setValues({
      ...values,
      address: updatedAddressList,
    });
  };

  const initialCurrentAddressFields = {
    street: "",
    location: {},
    default: false,
    index: -1,
    contactNumber: "",
    landmark: "",
    housePicture: "",
  };
  //currentAddress
  const [currentAddress, setCurrentAddress] = useState(
    initialCurrentAddressFields
  );

  const editAddress = (address, index, scroll) => {
    if (scroll) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    setDeliveryLocation({
      name: address.location.completeLocation,
      label: address.location.completeLocation,
      location: address.location,
    });
    setCurrentAddress({
      street: address.street,
      location: address.location,
      default: address.default,
      contactNumber: address.contact,
      landmark: address.landmark,
      housePicture: address.housePicture,
      index: index,
    });
    // setAddressModal(true);
  };

  const addCustomerAddress = () => {
    console.log("add customer address", currentAddress);
    const totalAddresses = values.address ? values.address.length : 0;
    const updatedAddressList = values.address.slice();

    const newAddress = {
      contactNumber: currentAddress.contactNumber,
      default: totalAddresses < 1 ? true : false,
      housePicture: currentAddress.housePicture
        ? currentAddress.housePicture
        : "https://firebasestorage.googleapis.com/v0/b/veggiego-d20b9.appspot.com/o/static%2Flocation.png?alt=media&token=0c270c28-f81d-4ac3-a574-04e74edb3325",
      index: currentAddress.index,
      landmark: currentAddress.landmark,
      location: deliveryLocation.location,
      street: currentAddress.street,
    };
    updatedAddressList.push(newAddress);
    setValues({
      ...values,
      address: updatedAddressList,
    });
  };

  const saveCustomerAddress = () => {
    const index = currentAddress.index;
    const updatedAddressList = values.address.slice();

    updatedAddressList[index] = {
      contactNumber: currentAddress.contactNumber,
      default: currentAddress.default,
      housePicture: currentAddress.housePicture
        ? currentAddress.housePicture
        : "https://firebasestorage.googleapis.com/v0/b/veggiego-d20b9.appspot.com/o/static%2Flocation.png?alt=media&token=0c270c28-f81d-4ac3-a574-04e74edb3325",
      index: currentAddress.index,
      landmark: currentAddress.landmark,
      location: deliveryLocation.location,
      street: currentAddress.street,
    };

    console.log("saving address... ", updatedAddressList);

    setValues({
      ...values,
      address: updatedAddressList,
    });
  };

  const deleteAddress = (address, index) => {
    const filteredArr = values.address.filter((item) => item !== address);
    if (filteredArr < 1) {
      filteredArr[0].default = true;
    }
    console.log("updated", filteredArr);
    setValues((prev) => ({
      ...prev,
      address: filteredArr,
    }));
  };

  const clearAddressForm = () => {
    setCurrentAddress(initialCurrentAddressFields);
    setDeliveryLocation(null);
  };

  useEffect(() => {
    clearAddressForm();
  }, [props.currentId]);

  // styles for combobox
  const customStyles = {
    option: (provided, state) => ({
      color: state.isSelected ? "green" : "",
      padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: "100%",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                {props.currentId === "" ? "Add " : viewMode ? "View " : "Edit "}
                Customer
              </h4>
              {props.currentId !== "" ? (
                <Button
                  className="btn-sm btn-warning light"
                  onClick={() => {
                    setViewMode(!viewMode);
                  }}
                >
                  {viewMode ? "Edit Customer" : "View Customer"}
                </Button>
              ) : null}
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Name</label>
                    <div className="col-sm-9 ">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="name"
                        value={values.name}
                        onChange={handleInputChange}
                        required
                        disabled={viewMode}
                      />
                    </div>
                  </div>
                  <h4> Addresses</h4>
                  <hr></hr>
                  {!viewMode && (
                    <>
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Street Address
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            name="street"
                            value={currentAddress.street}
                            onChange={handleCurrentAddressChange}
                            disabled={viewMode}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Location
                        </label>
                        <div className="col-sm-9">
                          <Select
                            className={"form-control"}
                            name="location"
                            defaultValue={"Choose Location"}
                            value={deliveryLocation}
                            onChange={setDeliveryLocation}
                            options={deliveryOptions}
                            styles={customStyles}
                            components={{
                              DropdownIndicator: () => null,
                              IndicatorSeparator: () => null,
                            }}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Contact
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="09-xxx-xxx-xxx"
                            name="contactNumber"
                            value={currentAddress.contactNumber}
                            onChange={handleCurrentAddressChange}
                            disabled={viewMode}
                            maxLength={11}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          Landmark
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="text"
                            className="form-control"
                            name="landmark"
                            value={currentAddress.landmark}
                            onChange={handleCurrentAddressChange}
                            disabled={viewMode}
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-3 col-form-label">
                          House Picture
                        </label>
                        <div className="col-sm-9">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={readImages}
                            disabled={viewMode}
                          />
                          <input
                            className="form-control"
                            name="housePicture"
                            value={currentAddress.housePicture}
                            onChange={handleCurrentAddressChange}
                            disabled={true}
                          />
                          {currentAddress.index < 0 ? (
                            <Button
                              className="btn btn-primary btn-sm pull-right mt-2 ml-2"
                              onClick={addCustomerAddress}
                            >
                              Add Address
                            </Button>
                          ) : (
                            <Button
                              className="btn btn-primary btn-sm pull-right mt-2 ml-2"
                              onClick={saveCustomerAddress}
                            >
                              Save Address
                            </Button>
                          )}

                          <Button
                            className="btn btn-warning light btn-sm pull-right mt-2 "
                            onClick={clearAddressForm}
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="form-group row ml-4 mr-3">
                    {values.address &&
                      values.address.map((address, i) => {
                        return (
                          <>
                            <div
                              style={{
                                width: "100%",
                                marginLeft: 20,
                                justifyContent: "stretch",
                              }}
                            >
                              <div style={{ flexDirection: "row" }}>
                                <strong>
                                  {address.street && address.street + ","}{" "}
                                  {address.location.barangay},{" "}
                                  {address.location.city},{" "}
                                  {address.location.province}
                                  <br></br>
                                </strong>
                                {address.landmark}
                                <br></br>
                                {address.contactNumber}
                              </div>
                              <div
                                style={{
                                  flexDirection: "row",
                                  paddingTop: 5,
                                }}
                                className="pull-right"
                              >
                                {!viewMode && !address.default && (
                                  <Button
                                    variant="warning light btn-xs ml-1 "
                                    className="ml-4"
                                    onClick={() =>
                                      handleDefaultAddress(address, i)
                                    }
                                  >
                                    Set as Default
                                  </Button>
                                )}
                                {!viewMode && values.address.length > 1 && (
                                  <Button
                                    onClick={() => deleteAddress(address, i)}
                                    className="btn btn-danger light btn-xs ml-1 "
                                  >
                                    Remove
                                  </Button>
                                )}
                                {!viewMode ? (
                                  <Button
                                    onClick={() =>
                                      editAddress(address, i, true)
                                    }
                                    className="btn btn-primary light btn-xs  ml-1 mr-1"
                                  >
                                    Edit
                                  </Button>
                                ) : (
                                  address.default && (
                                    <Badge variant="primary light">
                                      DEFAULT
                                    </Badge>
                                  )
                                )}
                              </div>
                            </div>
                            <hr></hr>
                          </>
                        );
                      })}
                  </div>

                  <div className="form-group row">
                    <div className="col-sm-1">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={handleInputChange}
                          defaultChecked
                          disabled={viewMode}
                        />
                      </div>
                    </div>
                    <label className="col-sm-11 col-form-label">
                      Is Customer Active?
                    </label>
                  </div>
                  {!viewMode && (
                    <div className="form-row">
                      <div className="form-group mt-4 col-md-12 mt-5">
                        <input
                          type="submit"
                          value={
                            props.currentId === ""
                              ? "Save Customer"
                              : "Update Customer"
                          }
                          className="btn btn-primary btn-block"
                          disabled={viewMode}
                        />
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-12">
          {/* <AddressModal
            isOpen={addressModal}
            toggleModal={handleAddressModalState}
            handleMultipleCustomerAddress={handleMultipleCustomerAddress}
            address={editAddressData}
          /> */}
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerForm;
