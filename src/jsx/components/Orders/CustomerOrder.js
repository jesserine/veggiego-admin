import React, { Fragment, useEffect, useState } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import PageTitle from "../../layouts/PageTitle";
import firebaseDb from "../../../firebase";
import Select from "react-select";

import swal from "sweetalert";
import { Button } from "react-bootstrap";

import bg5 from "../../../images/big/customer-header.jpg";
import { Link, useLocation } from "react-router-dom";
import OrdersForm from "./OrdersForm";

const CustomerOrder = (props) => {
  /// Get customer list from context provider
  const { customerList } = useDataContext();

  var [currentId, setCurrentId] = useState("");
  const location = useLocation();

  //from update order button
  const { user, userId, orderId, order, deliveryAddress, customerId } =
    location.state;

  // console.log(location.state);

  const [currentCustomer, setCurrentCustomer] = useState(user);
  const [currentCustomerId, setCurrentCustomerId] = useState(
    customerId && customerId
  );

  // console.log("currentCustomerId", currentCustomerId);

  const [selectedOption, setSelectedOption] = useState(null);
  const options = [];
  if (customerList) {
    Object.keys(customerList).map((id) => {
      return options.push({
        value: customerList[id].name,
        label: (
          <div>
            <p>{customerList[id].name}</p>
          </div>
        ),
        customer: customerList[id],
        customerId: id,
      });
    });
  }

  // console.log("selected customer", selectedOption);

  const [selectedAddress, setSelectedAddress] = useState();

  //when a customer is selected, set selectedAddress based on the customer's default address
  useEffect(() => {
    if (selectedOption) {
      const { customer, customerId } = selectedOption;
      setCurrentCustomer(customer);
      setCurrentCustomerId(customerId);
      setSelectedOption(null);

      // console.log(customer, customerId);

      customer.address.map((address) => {
        if (address.default) {
          setSelectedAddress(address);
          // console.log("selectedAddress", address);
        }
      });
    }
  }, [selectedOption]);

  //from update order, set deliveryAddress to selectedAddress state
  useEffect(() => {
    if (deliveryAddress) {
      setSelectedAddress(deliveryAddress);
      // console.log("deliveryAddress", deliveryAddress);
    }
  }, []);

  const addOrEdit = (obj) => {
    if (currentId === "") {
      swal("Nice!", "A new customer profile is added!", "success");
      firebaseDb.ref("customer/").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    } else {
      swal("Nice!", "This customer profile is updated!", "success");
      firebaseDb.ref(`customer/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  const handleChangeDeliveryAddress = (address, index) => {
    setSelectedAddress(address);
    setChangeDeliveryAddress(!changeDeliveryAddress);
    console.log(address);
  };

  const [changeDeliveryAddress, setChangeDeliveryAddress] = useState(false);

  /*********************************
  --- STYLING ---
  ***********************************/

  // styles for combobox
  const customStyles = {
    option: (provided, state) => ({
      color: state.isSelected ? "green" : "",
      padding: 10,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      //width: 250,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  if (!customerList) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <div className="row">
        {currentCustomer ? (
          selectedAddress && (
            <div className="col-xl-4 col-xxl-4 col-lg-12 col-sm-12">
              <div className="card overflow-hidden">
                <div
                  className="text-center p-3 overlay-box "
                  style={{ backgroundImage: `url(${bg5})` }}
                >
                  <h3 className="mt-3 mb-1 text-white">
                    {currentCustomer.name}
                  </h3>
                  <p className="text-white mb-0">Customer</p>
                  {!location.state.user && (
                    <span className="float-right">
                      <Button
                        onClick={() => {
                          setCurrentCustomer(null);
                        }}
                        className="btn btn-warning btn-xs mr-1"
                      >
                        Change Customer
                      </Button>
                    </span>
                  )}
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="mb-0">Contact Number</span>{" "}
                    <strong className="text-muted">
                      {selectedAddress.contactNumber}
                    </strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="mb-0">Address</span>{" "}
                    <strong className="text-muted" align="right">
                      {selectedAddress.street && selectedAddress.street + ","}{" "}
                      {selectedAddress.location.barangay},{" "}
                      {selectedAddress.location.city},{" "}
                      {selectedAddress.location.province}
                    </strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span className="mb-0">Landmark</span>{" "}
                    <strong className="text-muted">
                      {selectedAddress.landmark}
                    </strong>
                  </li>
                </ul>
                <div className="card-footer border-0 mt-0">
                  <div className="form-group">
                    {changeDeliveryAddress ? (
                      <>
                        {currentCustomer.address &&
                          currentCustomer.address.map((address, i) => {
                            return (
                              <div className={"row"}>
                                <div className={"col-xl-2"}>
                                  <Button
                                    className="btn btn-primary btn-xs mr-1 mt-3"
                                    onClick={() =>
                                      handleChangeDeliveryAddress(address, i)
                                    }
                                  >
                                    Use
                                  </Button>
                                </div>
                                <div className={"col-xl-10"}>
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
                              </div>
                            );
                          })}
                      </>
                    ) : (
                      <Button
                        className="mt-4"
                        variant="primary"
                        type="submit"
                        onClick={() =>
                          setChangeDeliveryAddress(!changeDeliveryAddress)
                        }
                      >
                        Change Delivery Address
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="col-xl-4 col-xxl-4 col-lg-12 col-sm-12">
            <div className="card overflow-hidden">
              <div style={{ margin: 25 }}>
                <label>Please select a customer</label>
                <Select
                  className={"form-control"}
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  value={selectedOption}
                  options={options}
                  styles={customStyles}
                  components={{
                    DropdownIndicator: () => null,
                    IndicatorSeparator: () => null,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="col-xl-8 col-xxl-8 col-lg-12 col-sm-12">
          <OrdersForm
            {...{
              addOrEdit,
              currentId,
              currentCustomer,
              currentCustomerId,
              userId,
              order,
              orderId,
              selectedAddress,
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerOrder;
