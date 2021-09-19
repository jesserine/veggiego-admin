import React, { Fragment, useState, useEffect } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import firebaseDb from "../../../firebase";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";

import { Button } from "react-bootstrap";

const ProductsForm = (props) => {
  const { categoryList, unitList } = useDataContext();

  const initialFieldValues = {
    productName: "",
    category: "",
    productImage: "",
    price: "",
    unit: "",
    dateUpdated: new Date().toLocaleString(),
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
        ...props.productList[props.currentId],
      });
    }
  }, [props.currentId, props.productList]);

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
    values.productImage = imageUrl;
  }

  const handleFormSubmit = (e) => {
    console.log("inside handleFormSubmit");
    e.preventDefault();
    props.addOrEdit(values);
    window.location.reload(false);
  };

  return (
    <Fragment>
      {categoryList && unitList && (
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">
                  {props.currentId === ""
                    ? "Add "
                    : viewMode
                    ? "View "
                    : "Edit "}
                  Product
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
                      {values.productImage && (
                        <>
                          <div className="form-group col-md-4">
                            <img
                              src={values.productImage}
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
                      <label className="col-sm-3 col-form-label">
                        Product Name
                      </label>
                      <div className="col-sm-9 ">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          name="productName"
                          value={values.productName}
                          onChange={handleInputChange}
                          required
                          disabled={viewMode}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Category
                      </label>
                      <div className="col-sm-9 ">
                        <select
                          defaultValue="Select Category"
                          id="inputState"
                          className="form-control"
                          name="category"
                          value={values.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Choose Category..</option>
                          {Object.keys(categoryList).map((id) => {
                            return (
                              <React.Fragment key={id}>
                                {categoryList[id].isActive == "true" ? (
                                  <option value={categoryList[id].categoryName}>
                                    {categoryList[id].categoryName}
                                  </option>
                                ) : (
                                  ""
                                )}
                              </React.Fragment>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Unit</label>
                      <div className="col-sm-9 ">
                        <select
                          defaultValue="Select Unit"
                          id="inputState"
                          className="form-control"
                          name="unit"
                          value={values.unit}
                          onChange={handleInputChange}
                          required
                          disabled={viewMode}
                        >
                          <option value="Unit">Choose Unit..</option>
                          {Object.keys(unitList).map((id) => {
                            return (
                              <React.Fragment key={id}>
                                {unitList[id].isActive == "true" ? (
                                  <option value={unitList[id].unitName}>
                                    {unitList[id].unitName}
                                  </option>
                                ) : (
                                  ""
                                )}
                              </React.Fragment>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">Price</label>
                      <div className="col-sm-9 ">
                        <input
                          type="text"
                          className="form-control"
                          name="price"
                          value={values.price}
                          onChange={handleInputChange}
                          required
                          disabled={viewMode}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-3 col-form-label">
                        Product Image
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
                          name="productImage"
                          value={values.productImage}
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
                    <div className="form-row">
                      <div className="form-group col-md-12">
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
      )}
    </Fragment>
  );
};

export default ProductsForm;
