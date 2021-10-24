import React, { Fragment, useState, useEffect } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import { useHistory } from "react-router-dom";
import firebaseDb from "../../../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { createMuiTheme } from "@material-ui/core";
import { toast } from "react-toastify";

import { Button, Table } from "react-bootstrap";
import Select from "react-select";

const OrdersForm = (props) => {
  const history = useHistory();

  var initialFieldValues = {
    products: [],
    notes: "",
    total: 0,
    grandTotal: 0,
    rider: "",
    deliveryLocation: "",
    deliveryFee: 0,
    dateOfDelivery: "",
    customer: props.currentCustomer,
    customerId: props.currentCustomerId,
    dateAdded: new Date().toLocaleString(),
    status: "ACTIVE",
    paymentStatus: "NOT PAID",
  };

  const initialProductValues = {
    productName: "",
    productQty: 1,
    productUnit: "",
    productPrice: 0,
    discount: 0,
    subtotal: 0,
    productImage: "",
  };

  const { productList, unitList, deliveryFeeList } = useDataContext();

  var [values, setValues] = useState(initialFieldValues);
  var [productValues, setProductValues] = useState(initialProductValues);
  var [result, setResult] = useState([]);
  var [currentProductId, setCurrentProductId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEditingProduct, setIsEditingProduct] = useState(false);

  /*********************************
  --- DATA MANIPULATION FUNCTIONS ---
  ***********************************/

  // Prepare data for edit
  useEffect(() => {
    if (props.order) {
      setValues({
        products: props.order.products,
        notes: props.order.notes,
        total: props.order.total,
        grandTotal: props.order.grandTotal,
        rider: props.order.rider,
        deliveryLocation: props.order.deliveryLocation,
        deliveryFee: props.order.deliveryFee,
        dateOfDelivery: props.order.dateOfDelivery,
        customer: props.order.customer,
        customerId: props.userId,
        dateAdded: props.order.dateAdded,
        status: props.order.status,
        paymentStatus: props.order.paymentStatus,
      });
    }
  }, []);

  //initialize values state
  useEffect(() => {
    if (props.currentId)
      setValues({
        ...props.unitList[props.currentId],
      });
  }, [props.currentId, props.unitList]);

  // prepares products data for combobox
  const [selectedOption, setSelectedOption] = useState();
  const options = [];
  if (productList) {
    Object.keys(productList).map((id) => {
      return options.push({
        value: productList[id].productName,
        label: (
          <div>
            <img
              src={productList[id].productImage}
              height="30px"
              width="30px"
              alt={productList[id].productName}
            />{" "}
            {productList[id].productName}
          </div>
        ),
        product: productList[id],
      });
    });
  }

  // sets values of quantity, price and unit once a product is selected
  useEffect(() => {
    if (selectedOption) {
      setProductValues((prev) => ({
        ...prev,
        productQty: selectedOption.product.quantity
          ? selectedOption.product.quantity
          : 1,
        productPrice: selectedOption.product.price,
        productUnit: selectedOption.product.unit,
        productName: selectedOption.product.productName,
        discount: selectedOption.product.discount
          ? selectedOption.product.discount
          : 0,
        productImage: selectedOption.product.productImage,
      }));
    }
  }, [selectedOption]);

  // calculates subtotal and updates productValues state
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

  // calculates grand total and updates productValues state
  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      grandTotal: Number(values.total) + Number(values.deliveryFee),
    }));
  }, [values.total]);

  // prepares delivery data for combobox
  const deliveryOptions = [];
  if (deliveryFeeList) {
    Object.keys(deliveryFeeList).map((id) => {
      return deliveryOptions.push({
        value: deliveryFeeList[id].location,
        label: deliveryFeeList[id].location,
        delivery: deliveryFeeList[id],
      });
    });
  }

  // updates delivery data on combobox selection
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState({
    value: "Free Delivery",
    label: "Free Delivery",
    delivery: { deliveryFee: Number(0), location: "Free Delivery" },
  });
  useEffect(() => {
    if (selectedDeliveryOption !== null) {
      values.deliveryFee = selectedDeliveryOption.delivery.deliveryFee;
      setValues((prev) => ({
        ...prev,
        deliveryLocation: selectedDeliveryOption.delivery.location,
        deliveryFee: selectedDeliveryOption.delivery.deliveryFee,
        grandTotal: Number(values.total) + Number(values.deliveryFee),
      }));
    }
  }, [selectedDeliveryOption]);

  // add product to cart - this should update values state!
  const addToCart = () => {
    if (selectedOption) {
      setValues((prev) => ({
        ...prev,
        deliveryFee:
          selectedDeliveryOption.value === "Custom"
            ? values.deliveryFee
            : selectedDeliveryOption.delivery.deliveryFee,
        deliveryLocation: selectedDeliveryOption.delivery.location,
        total: Number(values.total) + Number(productValues.subtotal),
        grandTotal: Number(values.total) + Number(values.deliveryFee),
        products: [...values.products, productValues],
      }));

      toast.success(selectedOption.value + " added to cart!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      clearProductValues(false);
    } else {
      toast.error("Select a product first!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(async () => {}, 3000);
    }
  };

  // reset product values form
  const clearProductValues = (showToast) => {
    setSelectedOption("");
    setIsEditingProduct(false);

    setProductValues({
      productName: "",
      productQty: 1,
      productUnit: "",
      productPrice: 0,
      discount: 0,
      subtotal: 0,
    });

    if (showToast) {
      toast.success("Product form cleared", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // update values on added product
  const updateCart = () => {
    //do update state logic
    const index = selectedOption.index;
    const updatedProductList = values.products.slice();

    updatedProductList[index] = {
      discount: productValues.discount,
      productName: productValues.productName,
      productQty: productValues.productQty,
      productPrice: productValues.productPrice,
      productUnit: productValues.productUnit,
      subtotal: productValues.subtotal,
      productImage: updatedProductList[index].productImage,
    };

    const newTotal = updatedProductList.reduce(
      (a, b) => a + (b["subtotal"] || 0),
      0
    );

    setValues((prev) => ({
      ...prev,
      deliveryFee:
        selectedDeliveryOption.value === "Custom"
          ? values.deliveryFee
          : selectedDeliveryOption.delivery.deliveryFee,
      deliveryLocation: selectedDeliveryOption.delivery.location,
      total: newTotal,
      grandTotal: Number(values.total) + Number(values.deliveryFee),
      products: updatedProductList,
    }));

    //toast
    toast.success("Product updated!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setIsEditingProduct(false);
    clearProductValues(false);
  };

  // remove product from cart
  const removeFromCart = (product) => {
    const filteredArr = values.products.filter((item) => item !== product);
    const newTotal = filteredArr.reduce((a, b) => a + (b["subtotal"] || 0), 0);
    setValues((prev) => ({
      ...prev,
      products: filteredArr,
      total: newTotal,
      grandTotal: Number(values.total) + Number(values.deliveryFee),
    }));
  };

  // check for delivery date change
  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      dateOfDelivery: new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));
  }, [selectedDate]);

  // edit product from cart
  const editProductFromCart = (product, index) => {
    setIsEditingProduct(true);

    setSelectedOption({
      value: product.productName,
      label: product.productName,
      product: {
        price: product.productPrice,
        unit: product.productUnit,
        productName: product.productName,
        quantity: product.productQty,
        discount: product.discount,
      },
      index: index,
    });
  };

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

  const handleCustomDeliveryFee = (e) => {
    var { value } = e.target;
    setValues((prev) => ({
      ...prev,
      deliveryFee: value,
      grandTotal: Number(values.total) + Number(value),
    }));
  };

  const handlePreorder = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    setSelectedDate(tomorrow.setDate(tomorrow.getDate() + 1));
    setValues((prev) => ({
      ...prev,
      status: "PREORDER",
    }));
    toast.success("Order status set as PREORDER", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleActiveOrder = () => {
    const today = new Date();

    setSelectedDate(today);
    setValues((prev) => ({
      ...prev,
      status: "ACTIVE",
    }));
    toast.success("Order status set as ACTIVE", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    /// form validations...
    var isValidForm = true;
    if (!values.customer) {
      toast.error("Please select a customer", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      isValidForm = false;
    }

    if (!values.products || !productValues) {
      toast.error("Please add a product", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      isValidForm = false;
    }

    if (isValidForm) {
      if (props.orderId) {
        firebaseDb
          .ref(`orders/${props.orderId}`)
          .update({
            products: values.products,
            notes: values.notes,
            total: values.total,
            grandTotal: values.grandTotal,
            rider: values.rider,
            deliveryLocation: values.deliveryLocation,
            deliveryFee: values.deliveryFee,
            dateOfDelivery: values.dateOfDelivery,
            customer: values.customer,
            customerId: props.userId,
            dateAdded: values.dateAdded,
            status: values.status,
            paymentStatus: values.paymentStatus,
          })
          .then(() => {
            history.push({
              pathname: "/orders",
              state: {
                isAdded: false,
                isUpdated: true,
              },
            });
          })
          .catch((error) => {
            toast.error("An error has occured: " + error, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      } else {
        firebaseDb
          .ref("orders/")
          .push({
            products: values.products,
            notes: values.notes,
            total: values.total,
            grandTotal: values.grandTotal,
            rider: values.rider,
            deliveryLocation: values.deliveryLocation,
            deliveryFee: values.deliveryFee,
            dateOfDelivery: values.dateOfDelivery,
            customer: values.customer,
            customerId: props.userId,
            dateAdded: values.dateAdded,
            status: values.status,
            paymentStatus: values.paymentStatus,
          })
          .then(() => {
            history.push({
              pathname: "/orders",
              state: {
                isAdded: true,
                isUpdated: false,
              },
            });
          })
          .catch((error) => {
            toast.error("An error has occured: " + error, {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      }
    }
  };

  /// update customer data on select to values state
  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      customer: props.currentCustomer,
      customerId: props.currentCustomerId,
    }));
  }, [props.currentCustomer, props.currentCustomerId]);

  /*********************************
  --- STYLING ---
  ***********************************/

  // styles for combobox
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

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (!productList) {
    return <p>Loading...</p>;
  }

  if (!unitList) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <form onSubmit={handleFormSubmit}>
              <div className="card-header">
                <div className="basic-form">
                  <div className="form-row">
                    <div className="form-group col-md-6">
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
                    </div>
                    <div className="form-group col-md-2">
                      <label>Delivery Fee</label>
                      {selectedDeliveryOption.value !== "Custom" ? (
                        <input
                          type="number"
                          min={0}
                          className="form-control"
                          placeholder="0"
                          value={values.deliveryFee}
                          onChange={handleOrderInputChange}
                          disabled
                        />
                      ) : (
                        <input
                          type="number"
                          min={0}
                          className="form-control"
                          onFocus={(event) => event.target.select()}
                          value={values.deliveryFee}
                          onChange={handleCustomDeliveryFee}
                        />
                      )}
                    </div>
                    <div className="form-group col-md-4">
                      <label>Date of Delivery</label>
                      {/* <DatePicker onChange={setSelectedDate} /> */}
                      <DatePicker
                        className="form-control"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={new Date()}
                      />
                      <span className="pull-right">
                        <Button
                          className="btn-xs mt-2 ml-1"
                          variant="primary light btn-square"
                          onClick={handleActiveOrder}
                        >
                          Deliver Today
                        </Button>
                        <Button
                          className="btn-xs mt-2 ml-1"
                          variant="primary light btn-square"
                          onClick={handlePreorder}
                        >
                          Deliver Tomorrow
                        </Button>
                      </span>
                    </div>
                  </div>
                  <div className="form-row ">
                    <div className="form-group col-md-3">
                      <label>Product</label>
                      <Select
                        className={"form-control"}
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        value={selectedOption}
                        options={options}
                        styles={customStyles}
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }}
                        isDisabled={isEditingProduct}
                      />
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
                        min={0}
                        onFocus={(event) => event.target.select()}
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
                        {selectedOption && (
                          <option value="Unit">
                            {selectedOption.product.unit}
                          </option>
                        )}

                        {Object.keys(unitList).map((id) => {
                          return (
                            <React.Fragment key={id}>
                              {unitList[id].isActive === "true" ? (
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
                    <div className="form-group col mt-2 mt-sm-0">
                      <label>Price</label>
                      <input
                        type="number"
                        min={0}
                        onFocus={(event) => event.target.select()}
                        className="form-control"
                        placeholder="0"
                        name="productPrice"
                        value={productValues.productPrice}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="form-group col mt-2 mt-sm-0">
                      <label>Discount %</label>
                      <input
                        type="number"
                        min={0}
                        onFocus={(event) => event.target.select()}
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
                    <div className="form-group mt-sm-0">
                      {isEditingProduct && (
                        <Button
                          className="btn-sm mt-5 ml-1"
                          variant="primary btn-square"
                          onClick={updateCart}
                        >
                          {/* <i className="fa fa-check" /> */}
                          Update
                        </Button>
                      )}
                      {!isEditingProduct && (
                        <Button
                          className="btn-sm mt-5 ml-1"
                          variant="primary light btn-square"
                          onClick={addToCart}
                        >
                          {/* <i className="fa fa-plus" /> */}
                          Add
                        </Button>
                      )}
                      {selectedOption && (
                        <Button
                          className="btn-sm mt-5 ml-1"
                          variant="warning light btn-square"
                          onClick={clearProductValues}
                        >
                          {/* <i className="fa fa-times" /> */}
                          Clear
                        </Button>
                      )}
                    </div>
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
                    {values.products &&
                      values.products.map((product, index) => {
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
                                  editProductFromCart(product, index);
                                }}
                                className="btn btn-primary btn-xs  mr-1"
                              >
                                {/* <i className="fa fa-pencil"></i> */}
                                Edit
                              </Button>
                            </td>
                            <td>
                              <img
                                src={product.productImage}
                                className="rounded-lg mr-2"
                                width="24"
                                alt=""
                              />
                              {product.productName}
                            </td>
                            <td>{`x${product.productQty}`}</td>
                            <td>{product.productUnit}</td>
                            <td>{`₱${product.productPrice}`}</td>
                            <td>{`${product.discount}%`}</td>
                            <td>{`₱${numberWithCommas(product.subtotal)}`}</td>
                            <td>
                              <Button
                                onClick={() => removeFromCart(product)}
                                className="btn btn-danger btn-xs"
                              >
                                {/* <i className="fa fa-trash"></i> */}
                                Remove
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
                    <h3>₱{numberWithCommas(values.deliveryFee)}</h3>
                    <hr></hr>
                    <label>Grand Total</label>
                    <h1>₱{numberWithCommas(Number(values.grandTotal))}</h1>
                  </div>
                </div>

                <div className="form-row"></div>
                <div className="form-group col-md-4">
                  <Button className="mt-4" variant="primary" type="submit">
                    {props.order ? "Update " : "Save "}Order
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
