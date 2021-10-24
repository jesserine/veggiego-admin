import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from "../../../firebase";
import { Button } from "react-bootstrap";

const DeliveryLocationForm = (props) => {
  const initialFieldValues = {
    region: "Region VIII (Eastern Visayas)",
    province: "",
    city: "",
    barangay: "",
    completeLocation: "",
    longitude: "",
    latitude: "",
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
              {props.currentId !== "" && (
                <Button
                  onClick={() => {
                    props.setCurrentId("");
                  }}
                  className="btn btn-primary light btn-xs  mr-1"
                >
                  Add new Delivery Location
                </Button>
              )}
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Region</label>
                      <select
                        id="inputState"
                        className="form-control"
                        name="region"
                        value={values.region}
                        onChange={handleInputChange}
                        required
                        defaultValue="Region VIII (Eastern Visayas)"
                      >
                        <option>Choose Province</option>
                        <option
                          value="Region VIII (Eastern Visayas)"
                          defaultValue
                        >
                          Region VIII (Eastern Visayas)
                        </option>
                      </select>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Province</label>
                      <select
                        defaultValue="Leyte"
                        id="inputState"
                        className="form-control"
                        name="province"
                        value={values.province}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Eastern Samar">Eastern Samar</option>
                        <option value="Leyte" defaultValue>
                          Leyte
                        </option>
                        <option value="Northern Samar">Northern Samar</option>
                        <option value="Samar (Western Samar)">
                          Samar (Western Samar)
                        </option>
                        <option value="Southern Leyte">Southern Leyte</option>
                        <option value="Biliran">Biliran</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>City</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter a City"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        required
                      />
                      {/* <select
                        defaultValue="Select City"
                        id="inputState"
                        className="form-control"
                        name="city"
                        value={values.city}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Ormoc City">Ormoc City</option>
                      </select> */}
                    </div>
                    <div className="form-group col-md-6">
                      <label>Barangay</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter a Barangay"
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
                      {values.region + ", " + values.province}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Longitude</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Longitude"
                        name="longitude"
                        value={values.longitude}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Latitude</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Latitude"
                        name="latitude"
                        value={values.latitude}
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
