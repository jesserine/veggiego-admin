import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDb from "../../../firebase";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import bg5 from "../../../images/big/customer-header.jpg";
import { SplitButton, Row, Modal, Button } from "react-bootstrap";

const AddRiderToOrderForm = (props) => {
  const initialOrderFieldValues = {
    products: [],
    notes: "",
    total: 0,
    rider: "",
    deliveryLocation: "",
    deliveryFee: 0,
    dateOfDelivery: new Date().toLocaleString(),
    customer: "",
    customerId: "",
    dateAdded: new Date().toLocaleString(),
  };

  var [values, setValues] = useState(initialOrderFieldValues);
  var [orderValues, setOrderValues] = useState({});
  var [currentId, setCurrentId] = useState("");
  var [riderValues, setRiderValues] = useState({});

  const [viewMode, setViewMode] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const selectedId = props.currentId;

  // useEffect(() => {
  //   firebaseDb.ref("orders/").on("value", (snapshot) => {
  //     if (snapshot.val() != null)
  //       setOrderValues({
  //         ...snapshot.val(),
  //       });
  //     else setOrderValues({});
  //   });
  // }, []);

  useEffect(() => {
    firebaseDb.ref("riders/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setRiderValues({
          ...snapshot.val(),
        });
      else setRiderValues({});
    });
  }, []);

  useEffect(() => {
    if (props.currentId === "") {
      setViewMode(false);
      setValues({
        ...initialOrderFieldValues,
      });
    } else {
      setViewMode(true);
      setValues({
        ...props.orderValues[props.currentId],
      });
    }
  }, [props.currentId, props.orderValues]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
    window.location.reload(false);
  };

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

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                {props.currentId === ""
                  ? "Customer "
                  : viewMode
                  ? "View "
                  : "Edit "}
                Order Info
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
                        name="customer.name"
                        value={values.customer.name}
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
                        name="customer.contactNumber"
                        value={values.customer.contactNumber}
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
                        name="customer.address"
                        value={values.customer.address}
                        onChange={handleInputChange}
                        required
                        disabled={viewMode}
                      />
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

                  <div className="form-group row" hidden>
                    <label className="col-sm-3 col-form-label">Notes</label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control"
                        name="notes"
                        value={values.notes}
                        onChange={handleInputChange}
                        disabled={viewMode}
                      />
                    </div>
                  </div>
                  {props.currentId === "" ? (
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
                          hidden
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="form-row">
                      <div className="form-group mt-4 col-md-12 mt-5">
                        <input
                          type="submit"
                          value={"Update Customer Order"}
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
      </div>
    </Fragment>
  );
};

export default AddRiderToOrderForm;
