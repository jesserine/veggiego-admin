import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from "../../../firebase";

const DeliveryLocationForm = (props) => {
  const initialFieldValues = {
    location: "",
    deliveryFee: "",
    dateAdded: new Date().toLocaleString(),
    isActive: "true",
  };

  var [values, setValues] = useState(initialFieldValues);
  var [deliveryFeeObjects, setDeliveryFeeObjects] = useState({});

  useEffect(() => {
    firebaseDb.ref("deliverylocations/").on("value", (snapshot) => {
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
    props.addOrEdit(values);
    window.location.reload(false);
  };

  const enabled = values.location != null && values.deliveryFee >= 0;
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
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Location"
                        name="region"
                        value={values.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Province</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Location"
                        name="province"
                        value={values.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>City</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Location"
                        name="city"
                        value={values.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Barangay</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Location"
                        name="barangay"
                        value={values.location}
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
                        name="location"
                        value={values.deliveryFee}
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

export default DeliveryLocationForm;
