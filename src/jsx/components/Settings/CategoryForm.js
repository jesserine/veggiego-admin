import React, { Fragment, useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import firebaseDb from "../../../firebase";
const CategoryForm = (props) => {
  const initialFieldValues = {
    categoryName: "",
    dateAdded: new Date().toLocaleString(),
    isActive: "true",
  };

  var [values, setValues] = useState(initialFieldValues);
  var [categoryObjects, setCategoryObjects] = useState({});

  useEffect(() => {
    firebaseDb.ref("category/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setCategoryObjects({
          ...snapshot.val(),
        });
      else setCategoryObjects({});
    });
  }, []);

  useEffect(() => {
    if (props.currentId == "")
      setValues({
        ...initialFieldValues,
      });
    else
      setValues({
        ...props.categoryObjects[props.currentId],
      });
  }, [props.currentId, props.categoryObjects]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.addOrEdit(values);
  };

  const enabled = values.categoryName != null;
  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                {props.currentId === "" ? "Add" : "Update"} Category
              </h4>
              {props.currentId !== "" && (
                <Button
                  onClick={() => {
                    props.setCurrentId("");
                  }}
                  className="btn btn-primary light btn-xs  mr-1"
                >
                  Add new Product Category
                </Button>
              )}
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
                        name="categoryName"
                        value={values.categoryName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        checked={values.isActive}
                        onChange={handleInputChange}
                        id="isActiveCategory"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckBox1"
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
                            ? "Add Product Category"
                            : "Update Product Category"
                        }
                        className="btn btn-primary "
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

export default CategoryForm;
