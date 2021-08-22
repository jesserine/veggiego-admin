import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDb from "../../../firebase";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";

import PageTitle from "../../layouts/PageTitle";
import { SplitButton, Row, Modal, Button } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import AddressModal from "./AddressModal";

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

  const initialOrderValues = {
    products: [],
    notes: "",
    total: "",
    rider: "",
    dateAdded: new Date().toLocaleDateString(),
  };
  var [values, setValues] = useState(initialFieldValues);
  var [orderValues, setOrderValues] = useState(initialOrderValues);

  var [contactObjects, setContactObjects] = useState({});
  var [currentId, setCurrentId] = useState("");

  useEffect(() => {
    firebaseDb.ref("customer/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setContactObjects({
          ...snapshot.val(),
        });
      else setContactObjects({});
    });
  }, []);

  const selectedId = props.currentId;

  useEffect(() => {
    if (props.currentId === "") {
      setViewMode(false);
      setValues({
        ...initialFieldValues,
      });
    } else {
      setViewMode(true);
      setValues({
        ...props.contactObjects[props.currentId],
      });
    }
  }, [props.currentId, props.contactObjects]);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
    window.location.reload(false);
  };

  const enabled = values.address != null;
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
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Address</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={values.address}
                        onChange={handleInputChange}
                        required
                        disabled={viewMode}
                      />
                      <Button
                        className="btn btn-primary btn-sm pull-right mt-2"
                        bsStyle="danger"
                        bsSize="small"
                        onClick={() => {
                          props.toggleModal(true);
                        }}
                      >
                        Add Address
                      </Button>
                    </div>
                  </div>

                  {/* <Button
                    variant="primary"
                    className="mb-2 mr-2 fjustify-content-end"
                    //  onClick={() => setLargeModal(true)}
                  >
                    Add Address
                  </Button> */}

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
                  {!viewMode ? (
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
                  ) : (
                    <div className="form-row">
                      <div className="form-group mt-4 col-md-12 mt-5">
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
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerForm;
