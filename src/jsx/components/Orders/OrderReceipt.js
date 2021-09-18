import React, { Fragment, useState, useEffect } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import { Link } from "react-router-dom";
import firebaseDb from "../../../firebase";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import bg5 from "../../../images/big/customer-header.jpg";
import { SplitButton, Row, Dropdown, Button } from "react-bootstrap";
import Select from "react-select";

const OrderReceipt = (props) => {
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
    status: "",
    grandTotal: 0,
    paymentStatus: "NOT PAID",
  };

  const { riderList } = useDataContext();

  var [values, setValues] = useState(initialOrderFieldValues);
  var [riderValues, setRiderValues] = useState(riderList);

  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const selectedId = props.currentId;

  // prepares rider data for combobox
  const [selectedRiderOption, setSelectedRiderOption] = useState(null);
  const riderOptions = [];
  Object.keys(riderValues).map((id) => {
    return riderOptions.push({
      value: riderValues[id].riderName,
      label: (
        <div>
          <img
            src={riderValues[id].riderImage}
            height="30px"
            width="30px"
            alt={riderValues[id].riderName}
          />
          {riderValues[id].riderName}
        </div>
      ),
      rider: riderValues[id],
    });
  });

  const [editStatusMode, setEditStatusMode] = useState(false);
  const orderStatusChangeHandler = () => {
    setEditStatusMode(!editStatusMode);
  };

  const [orderStatus, setOrderStatus] = useState(
    values.status ? values.status : ""
  );
  const handleOrderStatus = (status) => {
    setOrderStatus(status);
  };

  const [paymentStatus, setPaymentStatus] = useState(
    values.paymentStatus ? values.paymentStatus : ""
  );
  const handlePaymentStatus = (status) => {
    setPaymentStatus(status);
  };

  // updates rider info on the order
  useEffect(() => {
    if (selectedRiderOption !== null) {
      setValues((prev) => ({
        ...prev,
        rider: selectedRiderOption.rider,
      }));
    }
  }, [selectedRiderOption]);

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

  useEffect(() => {
    if (props.currentId === "") {
      setViewMode(false);
      setShowUpdateButton(false);
      setValues({
        ...initialOrderFieldValues,
      });
    } else {
      setViewMode(true);
      setShowUpdateButton(true);
      setValues({
        ...props.orderValues[props.currentId],
      });
      setEditStatusMode(false);
      setSelectedRiderOption(null);
    }
  }, [props.currentId]);

  useEffect(() => {
    if (Object.keys(props.orderValues).length > 0) {
      setValues({
        ...props.orderValues[
          Object.keys(props.orderValues)[
            Object.keys(props.orderValues).length - 1
          ]
        ],
      });
    }
  }, [props.orderValues]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
    window.location.reload(false);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4>
                <strong>Delivery Receipt</strong>
                {props.currentId.substr(props.currentId.length - 5)}
                <span>
                  {showUpdateButton && (
                    <Link
                      to={{
                        pathname: "/customer-order",
                        state: {
                          order: values,
                          user: values.customer,
                          userId: values.customerId,
                        },
                      }}
                      className="btn btn-warning shadow btn-xs sharp ml-1"
                    >
                      <i className="fa fa-pencil"></i>
                    </Link>
                  )}
                </span>
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="col-xl-12">
                    <h4>
                      Customer: <strong>{values.customer.name}</strong>
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6 col-sm-6 mb-4">
                    <h5>
                      Address: <strong>{values.customer.address}</strong>
                    </h5>
                    <h5>
                      Landmark: <strong>{values.customer.landmark}</strong>
                    </h5>
                  </div>
                  <div className="col-xl-6 col-sm-6 mb-4">
                    <h5>
                      Phone: <strong>{values.customer.contactNumber}</strong>
                    </h5>
                    <h5>
                      Date of Delivery: <strong>{values.dateOfDelivery}</strong>
                    </h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-8 col-sm-8">
                    <h6>Rider:</h6>
                    <Select
                      className={"form-control"}
                      value={selectedRiderOption}
                      defaultValue={selectedRiderOption}
                      onChange={setSelectedRiderOption}
                      options={riderOptions}
                      styles={customStyles}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                    />
                    {selectedRiderOption && (
                      <span>
                        <Button
                          className="mt-2 pull-right"
                          variant="primary btn-xs"
                          type="submit"
                        >
                          Assign Rider to Order
                        </Button>
                      </span>
                    )}
                  </div>
                  <div className="col-xl-4 col-sm-4">
                    <h6>Order Status:</h6>
                    <span>
                      {editStatusMode ? (
                        <div>
                          <Dropdown>
                            <Dropdown.Toggle variant="" size="s">
                              {props.statusBadge(orderStatus)}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onSelect={() => handleOrderStatus("ACTIVE")}
                              >
                                {props.statusBadge("ACTIVE")}
                              </Dropdown.Item>{" "}
                              <Dropdown.Item
                                onSelect={() => handleOrderStatus("PREORDER")}
                              >
                                {props.statusBadge("PREORDER")}
                              </Dropdown.Item>
                              <Dropdown.Item
                                onSelect={() => handleOrderStatus("PROCESSING")}
                              >
                                {props.statusBadge("PROCESSING")}
                              </Dropdown.Item>
                              <Dropdown.Item
                                onSelect={() =>
                                  handleOrderStatus("FOR DELIVERY")
                                }
                              >
                                {props.statusBadge("FOR DELIVERY")}
                              </Dropdown.Item>
                              <Dropdown.Item
                                onSelect={() => handleOrderStatus("IN TRANSIT")}
                              >
                                {props.statusBadge("IN TRANSIT")}
                              </Dropdown.Item>
                              <Dropdown.Item
                                onSelect={() => handleOrderStatus("DELIVERED")}
                              >
                                {props.statusBadge("DELIVERED")}
                              </Dropdown.Item>
                              <Dropdown.Item
                                onSelect={() => handleOrderStatus("CANCELLED")}
                              >
                                {props.statusBadge("CANCELLED")}
                              </Dropdown.Item>
                            </Dropdown.Menu>{" "}
                            <span>
                              <Button
                                onClick={orderStatusChangeHandler}
                                className="btn btn-primary shadow btn-xs sharp"
                                style={{ marginLeft: -15 }}
                              >
                                <i className="fa fa-check"></i>
                              </Button>
                            </span>
                          </Dropdown>
                        </div>
                      ) : (
                        <div style={{ marginTop: 20, marginLeft: 20 }}>
                          {props.statusBadge(values.status)}
                          <span>
                            <Button
                              onClick={orderStatusChangeHandler}
                              className="btn btn-warning shadow btn-xs sharp ml-1"
                            >
                              <i className="fa fa-pencil"></i>
                            </Button>
                          </span>
                        </div>
                      )}
                    </span>
                    <h6 className="mt-3">Payment Status:</h6>
                    <span>
                      {editStatusMode ? (
                        <div>
                          <Dropdown>
                            <Dropdown.Toggle variant="" size="s">
                              {props.statusBadge(paymentStatus)}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onSelect={() => handlePaymentStatus("ACTIVE")}
                              >
                                {props.statusBadge("PAID")}
                              </Dropdown.Item>{" "}
                              <Dropdown.Item
                                onSelect={() => handlePaymentStatus("PREORDER")}
                              >
                                {props.statusBadge("NOT PAID")}
                              </Dropdown.Item>
                            </Dropdown.Menu>
                            <span>
                              <Button
                                onClick={orderStatusChangeHandler}
                                className="btn btn-primary shadow btn-xs sharp"
                                style={{ marginLeft: -15 }}
                              >
                                <i className="fa fa-check"></i>
                              </Button>
                            </span>
                          </Dropdown>
                        </div>
                      ) : (
                        <div style={{ marginTop: 20, marginLeft: 20 }}>
                          {props.statusBadge(values.status)}
                          <span>
                            <Button
                              onClick={orderStatusChangeHandler}
                              className="btn btn-warning shadow btn-xs sharp ml-1"
                            >
                              <i className="fa fa-pencil"></i>
                            </Button>
                          </span>
                        </div>
                      )}
                    </span>
                  </div>
                </div>
                <br />
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th className="center">#</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th className="right">Price</th>
                        <th className="center">Discount</th>
                        <th className="right">SubTotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.products &&
                        values.products.map((product, index) => (
                          <tr>
                            <td className="center">
                              {Number(index) + Number(1)}
                            </td>
                            <td className="left strong">
                              {product.productName}
                            </td>
                            <td className="left">{product.productQty}</td>
                            <td className="left">{product.productUnit}</td>
                            <td className="right">₱{product.productPrice}</td>
                            <td className="center">{product.discount} %</td>
                            <td className="right">
                              ₱{product.subtotal && product.subtotal}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-lg-4 col-sm-5"> </div>
                  <div className="col-lg-4 col-sm-5 ml-auto">
                    <table className="table table-clear">
                      <tbody>
                        <tr>
                          <td className="left">
                            <strong>Total</strong>
                          </td>
                          <td className="right">₱{values.total}</td>
                        </tr>
                        <tr>
                          <td className="left">
                            <strong>Delivery Fee</strong>
                          </td>
                          <td className="right">₱{values.deliveryFee}</td>
                        </tr>
                        <tr>
                          <td className="left">
                            <strong>Grand Total</strong>
                          </td>
                          <td className="right">
                            <strong>₱{values.grandTotal}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <br />
                <div className="col-xl-12 col-sm-6 mb-4">
                  <h5>Notes:</h5>
                  <textarea
                    className="form-control"
                    value={values.notes}
                    disabled
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderReceipt;
