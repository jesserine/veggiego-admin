import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from "../../../firebase";

const DeliveryLocationForm = (props) => {
  const initialFieldValues = {
    region: "Region VIII",
    province: "",
    city: "",
    barangay: "",
    completeLocation: "test",
    dateAdded: new Date().toLocaleString(),
    isActive: "true",
  };

  var [values, setValues] = useState(initialFieldValues);
  var [deliveryLocationObjects, setDeliveryLocationObjects] = useState({});

  useEffect(() => {
    firebaseDb.ref("deliveryLocations/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setDeliveryLocationObjects({
          ...snapshot.val(),
        });
      else setDeliveryLocationObjects({});
    });
  }, []);

  useEffect(() => {
    if (props.currentId == "")
      setValues({
        ...initialFieldValues,
      });
    else
      setValues({
        ...props.deliveryLocationObjects[props.currentId],
      });
  }, [props.currentId, props.deliveryLocationObjects]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    console.log("inside handleFormSubmit");
    e.preventDefault();
    console.log(values);
    props.addOrEdit(values);
    window.location.reload(false);
  };

  const enabled = values.city != null && values.barangay != null;
  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                {props.currentId === "" ? "Add" : "Update"} Delivery Location
              </h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Region</label>
                      <select
                        defaultValue="Region VIII"
                        id="inputState"
                        className="form-control"
                        name="region"
                        value={values.region}
                        onChange={handleInputChange}
                        required
                        // disabled={viewMode}
                      >
                        <option value="Region VIII" defaultValue>
                          Region VIII
                        </option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Province</label>
                      <select
                        defaultValue="Select Vehicle"
                        id="inputState"
                        className="form-control"
                        name="province"
                        value={values.province}
                        onChange={handleInputChange}
                        required
                        // disabled={viewMode}
                      >
                        <option value="Province">Choose Province..</option>
                        <option value="Motorcycle">Eastern Samar</option>
                        <option value="Car">Leyte</option>
                        <option value="Van">Northern Samar</option>
                        <option value="Truck">Samar (Western Samar)</option>
                        <option value="Van">Southern Leyte</option>
                        <option value="Truck">Biliran</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>City</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Barangay</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Barangay"
                        name="barangay"
                        value={values.barangay}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Complete Location</label>
                      <input
                        type="text"
                        className="form-control"
                        name="completeLocation"
                        value={values.completeLocation}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <label className="col-form-label col-sm-3 pt-0">
                      Is Active?
                    </label>
                    <div className="col-sm-9">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="isActive"
                          value="true"
                          onChange={handleInputChange}
                          defaultChecked
                        />
                        <label className="form-check-label">Yes</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="isActive"
                          value="false"
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label">No</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12 mt-4">
                      <input
                        type="submit"
                        value={
                          props.currentId === ""
                            ? "Add Delivery Location"
                            : "Update Delivery Location"
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

export default DeliveryLocationForm;
