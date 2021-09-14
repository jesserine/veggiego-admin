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
  const [customers, setCustomers] = useState(customerList);

  var [currentId, setCurrentId] = useState("");
  const location = useLocation();
  const { user, userId } = location.state;
  const [currentCustomer, setCurrentCustomer] = useState(user);
  const [currentCustomerId, setCurrentCustomerId] = useState(userId);

  const [selectedOption, setSelectedOption] = useState(null);
  const options = [];
  Object.keys(customers).map((id) => {
    return options.push({
      value: customers[id].name,
      label: (
        <div>
          <p>
            {customers[id].name} | {customers[id].address}
          </p>
        </div>
      ),
      customer: customers[id],
      customerId: id,
    });
  });

  useEffect(() => {
    if (selectedOption) {
      const { customer, customerId } = selectedOption;
      setCurrentCustomer(customer);
      setCurrentCustomerId(customerId);
      setSelectedOption(null);
    }
  }, [selectedOption]);

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

  return (
    <Fragment>
      <div className="row">
        {currentCustomer ? (
          <div className="col-xl-4 col-xxl-4 col-lg-12 col-sm-12">
            <div className="card overflow-hidden">
              <div
                className="text-center p-3 overlay-box "
                style={{ backgroundImage: `url(${bg5})` }}
              >
                <h3 className="mt-3 mb-1 text-white">{currentCustomer.name}</h3>
                <p className="text-white mb-0">Customer</p>
                <span className="float-right">
                  <Button
                    onClick={() => {
                      setCurrentCustomer(null);
                    }}
                    className="btn btn-warning shadow btn-xs sharp mr-1"
                  >
                    <i className="fa fa-pencil"></i>
                  </Button>
                </span>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span className="mb-0">Contact Number</span>{" "}
                  <strong className="text-muted">
                    {" "}
                    {currentCustomer.contactNumber}{" "}
                  </strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="mb-0">Address</span>{" "}
                  <strong className="text-muted" align="right">
                    {currentCustomer.address}
                  </strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span className="mb-0">Landmark</span>{" "}
                  <strong className="text-muted">
                    {currentCustomer.landmark}{" "}
                  </strong>
                </li>
              </ul>
              <div className="card-footer border-0 mt-0">
                <button className="btn btn-primary btn-lg btn-block">
                  <i className="las la-map-marked" /> Change Delivery Address
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-xl-4 col-xxl-4 col-lg-12 col-sm-12">
            <div className="card overflow-hidden">
              {/* <p>Please select a user {JSON.stringify(customers)}</p> */}

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
            {...{ addOrEdit, currentId, currentCustomer, currentCustomerId }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerOrder;
