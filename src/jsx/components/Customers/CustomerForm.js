import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDb from "../../../firebase";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";

import { toast } from "react-toastify";
import { ListGroup, Badge, Modal, Button } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import AddressModal from "./AddressModal";
import bg5 from "../../../images/big/customer-header.jpg";

const CustomerForm = (props) => {
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

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const [viewMode, setViewMode] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const readImages = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const imagesRef = storage.ref("customer/house").child(id);

    await imagesRef.put(file);
    imagesRef.getDownloadURL().then((url) => {
      setImageUrl(url);
    });
  };

  if (typeof imageUrl !== "undefined" && imageUrl != null) {
    values.housePicture = imageUrl;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.addOrEdit(values);
  };

  const [addressModal, setAddressModal] = useState(false);

  const handleAddressModalState = (e) => {
    setAddressModal(e);
  };
  const [customerAddress, setCustomerAddress] = useState({
    address: [],
  });

  const handleMultipleCustomerAddress = (address) => {
    setCustomerAddress({
      address: [...customerAddress.address, address],
    });

    setValues((prev) => ({
      ...prev,
      address: [...customerAddress.address, address],
    }));
  };

  // console.log("customerAddress", customerAddress.address);
  // console.log("values", values);

  const handleDefaultAddress = () => {
    console.log("set as default", values.address);
  };

  const editAddress = (address, index) => {
    console.log("editing address", address, index);
  };

  const CustomerEditForm = () => {
    return (
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

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Contact</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              placeholder="09-xxx-xxx-xxx"
              name="contactNumber"
              value={values.contactNumber}
              onChange={handleInputChange}
              required
              disabled={viewMode}
              maxLength={11}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Address</label>
          <div className="col-sm-9">
            {/* {JSON.stringify(values.address)} */}
            <Button
              className="btn btn-primary btn-sm pull-right mt-2"
              bsStyle="danger"
              bsSize="small"
              onClick={() => {
                handleAddressModalState(true);
              }}
            >
              Add Address
            </Button>
          </div>
          <div className="mt-4">
            {values.address.map((address, i) => {
              return (
                <>
                  <div
                    className="d-flex justify-content-between align-items-center "
                    key={i}
                  >
                    <Button
                      onClick={() => editAddress(address, i)}
                      className="btn btn-primary shadow btn-xs sharp ml-2 mr-4"
                    >
                      <i className="fa fa-pencil"></i>
                    </Button>
                    <strong>
                      {address.street}, {address.location.barangay},{" "}
                      {address.location.city}, {address.location.province}
                    </strong>

                    {!address.default ? (
                      <Button
                        variant="primary light btn-xs"
                        className="ml-4"
                        onClick={() => handleDefaultAddress(address, i)}
                      >
                        SET AS DEFAULT
                      </Button>
                    ) : (
                      <div style={{ width: 50 }}></div>
                    )}
                  </div>
                  <hr></hr>
                </>
              );
            })}
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">Landmark</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              name="landmark"
              value={values.landmark}
              onChange={handleInputChange}
              disabled={viewMode}
            />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-sm-3 col-form-label">House Picture</label>
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
              value={values.housePicture}
              onChange={handleInputChange}
              disabled={true}
            />
          </div>
        </div>
        <div className="form-group row" hidden>
          <label className="col-sm-3 col-form-label">Notes</label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              name="id"
              value={currentId}
              onChange={handleInputChange}
              disabled={viewMode}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3">Is Active?</div>
          <div className="col-sm-9">
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
        </div>
        {!viewMode && (
          <div className="form-row">
            <div className="form-group mt-4 col-md-12 mt-5">
              <input
                type="submit"
                value={
                  props.currentId === "" ? "Save Customer" : "Update Customer"
                }
                className="btn btn-primary btn-block"
                disabled={viewMode}
              />
            </div>
          </div>
        )}
      </form>
    );
  };

  const CustomerViewForm = () => {
    return (
      <div className="">
        <div
          className="text-center p-3 overlay-box "
          style={{ backgroundImage: `url(${bg5})` }}
        >
          <h3 className="mt-3 mb-1 text-white">{values.name}</h3>
          <p className="text-white mb-0">Customer</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <span className="mb-0">Contact Number</span>
            <strong className="text-muted">{values.contactNumber}</strong>
          </li>
          {values.address && (
            <li className="list-group-item  ">
              <span className="mb-0">Address</span>

              {values.address.map((address, i) => {
                return (
                  <>
                    <hr></hr>

                    <div
                      className="d-flex justify-content-between align-items-center ml-4"
                      key={i}
                    >
                      <strong>
                        {address.street}, {address.location.barangay},{" "}
                        {address.location.city}, {address.location.province}
                      </strong>

                      {address.default ? (
                        <Badge variant="primary" className="ml-4" pill>
                          DEFAULT
                        </Badge>
                      ) : (
                        <div style={{ width: 70 }}></div>
                      )}
                    </div>
                  </>
                );
              })}
            </li>
          )}

          <li className="list-group-item d-flex justify-content-between">
            <span className="mb-0">Landmark</span>
            <strong className="text-muted">{values.landmark} </strong>
          </li>
          {values.housePicture && (
            <li className="list-group-item ">
              <p className="mb-0">House Photo</p>
              <div className="profile-photo">
                <img
                  src={values.housePicture}
                  className="img-fluid rounded-square"
                  alt="profile"
                />
              </div>
            </li>
          )}
        </ul>
        <div className="form-row">
          <div className="form-group mt-5 col-md-12">
            <Link
              to={{
                pathname: "/customer-order",
                state: {
                  user: values,
                  userId: props.currentId,
                },
              }}
              className="btn btn-warning btn-block"
            >
              Create Order
            </Link>
          </div>
        </div>
      </div>
    );
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
                {viewMode ? <CustomerViewForm /> : <CustomerEditForm />}
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-12">
          <AddressModal
            isOpen={addressModal}
            toggleModal={handleAddressModalState}
            handleMultipleCustomerAddress={handleMultipleCustomerAddress}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerForm;
