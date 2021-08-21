import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDb from "../../../firebase";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";

import PageTitle from "../../layouts/PageTitle";
import { SplitButton, ButtonGroup, Dropdown, Button } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const RidersForm = (props) => {
  const initialFieldValues = {
    riderName: "",
    vehicleType: "",
    vehiclePlateNum: "",
    riderImage: "",
    riderContactNum: "",
    riderAddress: "",
    username: "",
    password: "",
    dateAdded: new Date().toLocaleString(),
    isActive: "true",
  };

  var [values, setValues] = useState(initialFieldValues);
  var [riderObjects, setRiderObjects] = useState({});

  useEffect(() => {
    firebaseDb.ref("riders/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setRiderObjects({
          ...snapshot.val(),
        });
      else setRiderObjects({});
    });
  }, []);

  useEffect(() => {
    if (props.currentId === "") {
      setViewMode(false);
      setValues({
        ...initialFieldValues,
      });
    } else {
      setViewMode(true);
      setValues({
        ...props.riderObjects[props.currentId],
      });
    }
  }, [props.currentId, props.riderObjects]);

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
    const imagesRef = storage.ref("rider/").child(id);

    await imagesRef.put(file);
    imagesRef.getDownloadURL().then((url) => {
      setImageUrl(url);
    });
  };

  if (typeof imageUrl !== "undefined" && imageUrl != null) {
    values.riderImage = imageUrl;
  }

  const handleFormSubmit = (e) => {
    console.log("inside handleFormSubmit");
    e.preventDefault();
    props.addOrEdit(values);
    window.location.reload(false);
  };

  const enabled = values.username != null;
  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                {props.currentId === "" ? "Add " : viewMode ? "View " : "Edit "}
                Rider
              </h4>
              {props.currentId !== "" ? (
                <Button
                  variant="primary btn-rounded"
                  onClick={() => {
                    setViewMode(!viewMode);
                  }}
                >
                  <span className="btn-icon-left text-primary">
                    {viewMode ? (
                      <i className="fa fa-pencil" />
                    ) : (
                      <i className="fa fa-eye" />
                    )}
                  </span>
                  {viewMode ? "Edit " : "View "}
                </Button>
              ) : null}
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    {values.riderImage && (
                      <>
                        <div className="form-group col-md-4">
                          <img
                            src={values.riderImage}
                            className="rounded-lg mr-2 mb-2"
                            width="100%"
                            alt=""
                          />
                        </div>
                        <div className="form-group col-md-8"></div>
                      </>
                    )}
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Name</label>
                    <div className="col-sm-9 ">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="riderName"
                        value={values.riderName}
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
                        name="riderContactNum"
                        value={values.riderContactNum}
                        onChange={handleInputChange}
                        required
                        disabled={viewMode}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                      Vehicle Type
                    </label>
                    <div className="col-sm-9">
                      <select
                        defaultValue="Select Vehicle"
                        id="inputState"
                        className="form-control"
                        name="vehicleType"
                        value={values.vehicleType}
                        onChange={handleInputChange}
                        required
                        disabled={viewMode}
                      >
                        <option value="Vehicle">Choose Vehicle..</option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Car">Car</option>
                        <option value="Van">Van</option>
                        <option value="Truck">Truck</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                      Vehicle Plate #
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Vehicle Plate Number"
                        name="vehiclePlateNum"
                        value={values.vehiclePlateNum}
                        onChange={handleInputChange}
                        required
                        disabled={viewMode}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Address</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        name="riderAddress"
                        value={values.riderAddress}
                        onChange={handleInputChange}
                        required
                        disabled={viewMode}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">
                      Rider Photo
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
                        name="riderImage"
                        value={values.riderImage}
                        onChange={handleInputChange}
                        disabled={true}
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
                          value={values.isActive}
                          onChange={handleInputChange}
                          defaultChecked
                          disabled={viewMode}
                        />
                        <label className="form-check-label">Yes</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="isActive"
                          value={values.isActive}
                          onChange={handleInputChange}
                          disabled={viewMode}
                        />
                        <label className="form-check-label">No</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-12 mt-5">
                      <input
                        type="submit"
                        value={props.currentId === "" ? "Save" : "Update"}
                        className="btn btn-primary btn-block"
                        disabled={viewMode}
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

export default RidersForm;
