import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from "../../../firebase";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { Button, Table } from "react-bootstrap";
import Select from "react-select";

const OrdersForm = (props) => {
  const initialFieldValues = {
    products: "",
    notes: "",
    total: 0,
    rider: "",
    deliveryLocation: "",
    deliveryFee: 0,
    dateOfDelivery: new Date().toLocaleString(),
    customer: props.user,
    customerId: props.userId,
    dateAdded: new Date().toLocaleString(),
  };

  const initialProductValues = {
    productName: "",
    productQty: 1,
    productUnit: "",
    productPrice: 0,
    discount: 0,
    subtotal: 0,
  };

  const customerId = props.userId;

  var [values, setValues] = useState(initialFieldValues);
  var [unitObjects, setUnitObjects] = useState({});
  var [deliveryObjects, setDeliveryObjects] = useState({});
  var [productNameObjects, setProductNameObjects] = useState({});
  var [productValues, setProductValues] = useState(initialProductValues);
  var [productList, setProductList] = useState([]);
  var [result, setResult] = useState([]);
  var [value, setValue] = useState("");
  var [currentProductId, setCurrentProductId] = useState("");
  var [currentId, setCurrentId] = useState("");
  const [selectedDate, handleDateChange] = useState(new Date());

  // retrieves all products in firebase
  useEffect(() => {
    firebaseDb.ref("products/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setProductNameObjects({
          ...snapshot.val(),
        });
      else setProductNameObjects({});
    });
  }, []);

  // prepares products data for combobox
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [];

  Object.keys(productNameObjects).map((id) => {
    return options.push({
      value: productNameObjects[id].productName,
      label: productNameObjects[id].productName,
      product: productNameObjects[id],
    });
  });

  useEffect(() => {
    if (selectedOption) {
      setProductValues((prev) => ({
        ...prev,
        productQty: 1,
        productPrice: selectedOption.product.price,
        productUnit: selectedOption.product.unit,
      }));
      console.log(productValues);
    }
  }, [selectedOption]);

  // calculates subtotal
  useEffect(() => {
    const calc =
      Number(productValues.productQty) * Number(productValues.productPrice);
    const discountVal = calc * (Number(productValues.discount) / 100);
    setProductValues((prev) => ({
      ...prev,
      subtotal: calc - discountVal,
    }));
  }, [
    productValues.productQty,
    productValues.productPrice,
    productValues.discount,
  ]);

  // retrieves all units in firebase
  useEffect(() => {
    firebaseDb.ref("unit/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setUnitObjects({
          ...snapshot.val(),
        });
      else setUnitObjects({});
    });
  }, []);

  useEffect(() => {
    firebaseDb.ref("delivery/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setDeliveryObjects({
          ...snapshot.val(),
        });
      else setDeliveryObjects({});
    });
  }, []);

  useEffect(() => {
    if (props.currentId === "")
      setValues({
        ...initialFieldValues,
      });
    else
      setValues({
        ...props.unitObjects[props.currentId],
      });
  }, [props.currentId, props.unitObjects]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setProductValues({
      ...productValues,
      [name]: value,
    });
  };

  const handleOrderInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

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
    console.log("Date of Delivery", selectedDate.value.toLocaleString());
    e.preventDefault();
    // values.dateOfDelivery = selectedDate.value.toLocaleString();
    values.deliveryLocation = selectedDeliveryOption.value;
    addOrder(values);
    window.location.reload(false);
  };

  const addOrder = (obj) => {
    obj.products = productList;
    firebaseDb.ref("orders/").push(obj, (err) => {
      if (err) console.log(err);
      else setCurrentId("");
    });
  };

  useEffect(() => {
    if (currentProductId === "")
      setProductValues({
        ...initialProductValues,
      });
    else
      setProductValues({
        ...productList[currentProductId],
      });
  }, [currentProductId, productList]);

  const handleProductAddUpdate = (e) => {
    console.log("inside handleProductAddUpdate");
    //FIX THIS SHEEET - change to setstate
    values.total += productValues.subtotal;
    productValues.productName = selectedOption.value;
    addOrEditProduct(productValues);
  };

  const addOrEditProduct = (obj) => {
    console.log("inside addOrEditProduct", obj, currentProductId);
    if (currentProductId === "") {
      console.log("inside addOrEditProduct-ADD PRODUCT", currentProductId);
      setProductList([
        ...productList,
        {
          value: obj,
        },
      ]);
      setCurrentProductId("");
    } else {
      console.log("inside addOrEditProduct-EDIT PRODUCT", currentProductId);
      setProductList([
        ...productList.splice(0, currentProductId),
        {
          value: obj,
        },
      ]);
      setCurrentProductId("");
    }
  };

  const enabled = values.notes != null;

  const deliveryOptions = [];
  Object.keys(deliveryObjects).map((id) => {
    return deliveryOptions.push({
      value: deliveryObjects[id].location,
      label: deliveryObjects[id].location,
      delivery: deliveryObjects[id],
    });
  });

  //
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState(null);
  // useEffect(() => {
  //   if (selectedDeliveryOption !== null) {
  //     values.deliveryFee = selectedDeliveryOption.delivery.deliveryFee;
  //   }
  // }, [selectedDeliveryOption, values]);

  const customStyles = {
    option: (provided, state) => ({
      color: state.isSelected ? "green" : "",
      padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 250,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const onDelete = (key) => {
    // values.total=values.total-Number(productList[key].subtotal);
    if (key !== -1) {
      productList.splice(key, 1);
      setProductList([...productList]);
    }
  };
  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <form onSubmit={handleFormSubmit}>
              <div className="card-header">
                <div className="basic-form">
                  <div className="form-row">
                    <div className="form-group col-md-8">
                      <label>Delivery Area</label>
                      <Select
                        className={"form-control"}
                        defaultValue={selectedDeliveryOption}
                        onChange={setSelectedDeliveryOption}
                        options={deliveryOptions}
                        styles={customStyles}
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }}
                      />
                      {/* <select
                      defaultValue="Select Unit"
                      id="inputState"
                      className="form-control"
                      name="deliveryFee"
                      value={values.deliveryFee}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Unit">Delivery Area</option>
                      {Object.keys(deliveryObjects).map((id) => {
                        return (
                          <React.Fragment key={id}>
                            {deliveryObjects[id].isActive == "true" ? (
                              <option value={deliveryObjects[id].location}>
                                {deliveryObjects[id].location}
                              </option>
                            ) : (
                              ""
                            )}
                          </React.Fragment>
                        );
                      })}
                    </select> */}
                    </div>
                    <div className="form-group col-md-4">
                      <label>Delivery Fee</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0"
                        value={values.deliveryFee}
                        onChange={handleOrderInputChange}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="form-row ">
                    <div className="form-group col-md-3">
                      <label>Product</label>
                      <Select
                        className={"form-control"}
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        styles={customStyles}
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }}
                      />
                      {/* <select
                        defaultValue="Select Unit"
                        id="inputState"
                        className="form-control"
                        name="productName"
                        value={productValues.productName}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Product">Product</option>
                        {Object.keys(productNameObjects).map((id) => {
                          return (
                            <React.Fragment key={id}>
                              {productNameObjects[id].isActive == "true" ? (
                                <option
                                  value={productNameObjects[id].productName}
                                >
                                  {productNameObjects[id].productName}
                                </option>
                              ) : (
                                ""
                              )}
                            </React.Fragment>
                          );
                        })}
                      </select> */}
                      <div className="searchBack" value={result}>
                        {result.map((result, index) => (
                          // <a href="orders" id={index}>
                          <div className="searchEntry">{result}</div>
                          // </a>
                        ))}
                      </div>
                    </div>
                    <div className="form-group col mt-2 mt-sm-0">
                      <label>Quantity</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        name="productQty"
                        value={productValues.productQty}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group col mt-2 mt-sm-0">
                      <label>Unit</label>
                      <select
                        defaultValue="Select Unit"
                        id="inputState"
                        className="form-control"
                        name="productUnit"
                        value={productValues.productUnit}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Unit">
                          {selectedOption
                            ? selectedOption.product.unit
                            : "Unit "}
                        </option>
                        {Object.keys(unitObjects).map((id) => {
                          return (
                            <React.Fragment key={id}>
                              {unitObjects[id].isActive === "true" ? (
                                <option value={unitObjects[id].unitName}>
                                  {unitObjects[id].unitName}
                                </option>
                              ) : (
                                ""
                              )}
                            </React.Fragment>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group col mt-2 mt-sm-0">
                      <label>Price</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        name="productPrice"
                        value={productValues.productPrice}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group col mt-2 mt-sm-0">
                      <label>Discount</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        name="discount"
                        value={`${productValues.discount}`}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group col mt-2 mt-sm-0">
                      <label>Subtotal</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Subtotal"
                        name="subtotal"
                        value={`₱${numberWithCommas(productValues.subtotal)}`}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    <div className="form-group col mt-2 mt-sm-0">
                      <Button
                        className="btn btn-primary btn-sm mt-5"
                        variant="primary"
                        //  type="submit"
                        onClick={handleProductAddUpdate}
                      >
                        +
                      </Button>
                      <Button
                        className="btn btn-primary btn-sm ml-1 mt-5"
                        variant="primary"
                        //  type="submit"
                        onClick={handleProductAddUpdate}
                      >
                        <i className="las la-eraser" />
                      </Button>
                    </div>
                  </div>
                  <div className="form-row">
                    {/* <div className="form-group col-md-12">
                                            <input type="submit"
                                                value={props.currentId == '' ? 'Save' : 'Update'}
                                                className="btn btn-primary btn-block"
                                                disabled={!enabled} />
                                        </div> */}
                  </div>
                </div>
              </div>
              <div className="card-body">
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>
                        <strong></strong>
                      </th>
                      <th>
                        <strong>PRODUCT</strong>
                      </th>
                      <th>
                        <strong>QUANTITY</strong>
                      </th>
                      <th>
                        <strong>UNIT</strong>
                      </th>
                      <th>
                        <strong>PRICE</strong>
                      </th>
                      <th>
                        <strong>DISCOUNT</strong>
                      </th>
                      <th>
                        <strong>SUBTOTAL</strong>
                      </th>
                      <th>
                        <strong></strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((product, index) => {
                      return (
                        <tr
                          key={index}
                          onClick={() => {
                            setCurrentProductId(index);
                          }}
                        >
                          <td>
                            <Button
                              onClick={() => {
                                setCurrentProductId(index);
                              }}
                              className="btn btn-primary shadow btn-xs sharp mr-1"
                            >
                              <i className="fa fa-pencil"></i>
                            </Button>
                          </td>
                          <td>{product.value.productName}</td>
                          <td>{`x${product.value.productQty}`}</td>
                          <td>{product.value.productUnit}</td>
                          <td>{`₱${product.value.productPrice}`}</td>
                          <td>{`${product.value.discount}%`}</td>
                          <td>{`₱${numberWithCommas(
                            product.value.subtotal
                          )}`}</td>
                          <td>
                            <Button
                              onClick={() => {
                                onDelete(index);
                              }}
                              className="btn btn-danger shadow btn-xs sharp"
                            >
                              <i className="fa fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              <div className="card-footer">
                <div className="form-row">
                  <div className="form-group col-md-9 pr-5">
                    {" "}
                    <label>Notes</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      id="notes"
                      name="notes"
                      value={values.notes}
                      onChange={handleOrderInputChange}
                    ></textarea>
                  </div>
                  <div className="form-group col-md-3 pull-right">
                    <label>Total</label>
                    <h3>₱{numberWithCommas(values.total)}</h3>
                    <label>Delivery Fee</label>
                    <h3>₱{numberWithCommas(0)}</h3>
                    <hr></hr>
                    <label>Grand Total</label>
                    <h1>₱{numberWithCommas(values.total)}</h1>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label>Date of Delivery</label>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DateTimePicker
                        label=""
                        inputVariant="outlined"
                        value={selectedDate}
                        onChange={handleDateChange}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <Button className="mt-4" variant="primary" type="submit">
                    Save Order
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrdersForm;
