import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDb from "../../../firebase";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";

import PageTitle from "../../layouts/PageTitle";
import { SplitButton, ButtonGroup, Dropdown } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const DeliveryFeeForm = (props) => {
  const initialFieldValues = {
    location: "",
    deliveryFee: "",
    dateAdded: new Date().toLocaleString(),
    isActive: "true",
  };

  var [values, setValues] = useState(initialFieldValues);
  var [deliveryFeeObjects, setDeliveryFeeObjects] = useState({});

  useEffect(() => {
    firebaseDb.ref("delivery/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setDeliveryFeeObjects({
          ...snapshot.val(),
        });
      else setDeliveryFeeObjects({});
    });
  }, []);

  useEffect(() => {
    if (props.currentId == "")
      setValues({
        ...initialFieldValues,
      });
    else
      setValues({
        ...props.deliveryFeeObjects[props.currentId],
      });
  }, [props.currentId, props.deliveryFeeObjects]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.addOrEdit(values);
  };

  const enabled = values.location != null && values.deliveryFee >= 0;
  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                {props.currentId === "" ? "Add" : "Update"} Delivery Fee
              </h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Location</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Location"
                        name="location"
                        value={values.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Delivery Fee</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        name="deliveryFee"
                        value={values.deliveryFee}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        name="isActive"
                        type="checkbox"
                        defaultChecked={values.isActive}
                        checked={values.isActive}
                        onChange={handleInputChange}
                        className="custom-control-input"
                        id="isActiveChkBox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="isActiveChkBox"
                      >
                        Is Active?
                      </label>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12 mt-4">
                      <input
                        type="submit"
                        value={
                          props.currentId === ""
                            ? "Add Delivery Fee"
                            : "Update Delivery Fee"
                        }
                        className="btn btn-primary"
                        disabled={!enabled}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DeliveryFeeForm;
