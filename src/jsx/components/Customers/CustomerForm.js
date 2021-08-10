import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDb from "../../../firebase";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";

import PageTitle from "../../layouts/PageTitle";
import { SplitButton, ButtonGroup, Dropdow, Button } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const CustomerForm = (props) => {
  const initialFieldValues = {
    name: "",
    contactNumber: "",
    address: "",
    landmark: "",
    housePicture: "",
    isActive: "true",
    dateJoined: new Date().toLocaleDateString(),
  };
  var [values, setValues] = useState(initialFieldValues);
  var [contactObjects, setContactObjects] = useState({});

  useEffect(() => {
    firebaseDb.ref("customer/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setContactObjects({
          ...snapshot.val(),
        });
      else setContactObjects({});
    });
  }, []);

  useEffect(() => {

    if (props.currentId === ""){
      setViewMode(false);
      setValues({
        ...initialFieldValues,
      });
    }
    else{
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
    const imagesRef = storage.ref("images").child(id);

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
                {props.currentId === "" ? "Add " : viewMode ? "View " : "Edit " }
                Customer
              </h4>
              {
                  props.currentId !== "" ? 
                     <Button variant='primary btn-rounded' onClick={()=>{ setViewMode(!viewMode) }}>
                        <span className='btn-icon-left text-primary'>
                           
                           { viewMode ? <i className='fa fa-pencil' /> : <i className='fa fa-eye' /> }
                        </span>
                        { viewMode ? "Edit " : "View " }
                     </Button>
                  :
                  null
              }
              
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Name</label>
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
                    <div className="form-group col-md-12">
                      <label>Contact Number</label>
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
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={values.address}
                        onChange={handleInputChange}
                        required
                        disabled={viewMode}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Landmark</label>
                      <input
                        type="text"
                        className="form-control"
                        name="landmark"
                        value={values.landmark}
                        onChange={handleInputChange}
                        disabled={viewMode}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <label>House Picture</label>
                      <div className="input-group">
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
                          disabled={viewMode}
                        />
                        {/* <div className="custom-file">
                                       <input
                                          type="file"
                                          className="custom-file-input"
                                       />
                                       <label className="custom-file-label">
                                          Choose file
                                       </label>
                                    </div> */}
                      </div>
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
                          disabled={viewMode}
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
                          disabled={viewMode}
                        />
                        <label className="form-check-label">No</label>
                      </div>
                    </div>
                  </div>
                  { !viewMode ? 
                     <div className="form-row">
                        <div className="form-group mt-4 col-md-12">
                           <input
                              type="submit"
                              value={props.currentId === "" ? "Save" : "Update"}
                              className="btn btn-primary btn-block"
                              disabled={!enabled}
                           />
                        </div>
                     </div>
                     :
                     null
                  }
                  
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
