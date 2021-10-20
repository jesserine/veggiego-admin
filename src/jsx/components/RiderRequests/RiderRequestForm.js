import React, { Fragment, useState, useEffect } from "react";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";

import { Button } from "react-bootstrap";

const RiderRequestForm = (props) => {
  const initialFieldValues = {
    riderName: "",
    vehicleType: "",
    vehiclePlateNum: "",
    riderImage: "",
    riderContactNum: "",
    riderAddress: "",
    dateAdded: new Date().toLocaleString(),
    isActive: "true",
  };

  var [values, setValues] = useState(initialFieldValues);

  useEffect(() => {
    if (props.currentId === "") {
      setViewMode(false);
      setValues({
        ...initialFieldValues,
      });
    } else {
      setViewMode(true);
      setValues({
        ...props.riderList[props.currentId],
      });
    }
  }, [props.currentId, props.riderList]);

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

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Request #000</h4>
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
                    <div className="form-group col-md-12 mt-5">
                      <input
                        type="submit"
                        value="Accept Changes"
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

export default RiderRequestForm;
