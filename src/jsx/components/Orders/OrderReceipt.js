import React, { Fragment, useState, useEffect } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import { Link } from "react-router-dom";
import firebaseDb from "../../../firebase";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import bg5 from "../../../images/big/customer-header.jpg";
import { SplitButton, Row, Dropdown, Button } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";

const OrderReceipt = (props) => {
  const { riderList } = useDataContext();

  const [showUpdateButton, setShowUpdateButton] = useState(false);

  // prepares rider data for combobox
  const [selectedRiderOption, setSelectedRiderOption] = useState({
    label: "Not Assigned",
    value: "Not Assigned",
    rider: "Not Assigned",
  });
  const riderOptions = [];
  Object.keys(riderList).map((id) => {
    return riderOptions.push({
      value: riderList[id].riderName,
      label: (
        <div>
          <img
            src={riderList[id].riderImage}
            height="30px"
            width="30px"
            alt={riderList[id].riderName}
          />
          {riderList[id].riderName}
        </div>
      ),
      rider: riderList[id],
    });
  });

  // Order and Payment Status edit mode handler
  const [editOrderStatusMode, setEditOrderStatusMode] = useState(false);
  const orderStatusChangeHandler = () => {
    setEditOrderStatusMode(!editOrderStatusMode);

    // Save selected order status to firebase
    if (editOrderStatusMode) {
      firebaseDb
        .ref(`orders/${props.currentId}`)
        .update({ status: selectedOrderStatus })
        .then(() => {
          toast.success("Order status updated as " + selectedOrderStatus, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          props.setCurrentOrder((prev) => ({
            ...prev,
            status: selectedOrderStatus,
          }));
        })
        .catch((err) =>
          toast.error("Something went wrong" + err, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
    }
  };
  const [editPaymentStatusMode, setEditPaymentStatusMode] = useState(false);
  const paymentStatusChangeHandler = () => {
    setEditPaymentStatusMode(!editPaymentStatusMode);

    // Save selected payment status to firebase
    if (editPaymentStatusMode) {
      firebaseDb
        .ref(`orders/${props.currentId}`)
        .update({ paymentStatus: selectedPaymentStatus })
        .then(() => {
          toast.success("Payment status updated as " + selectedPaymentStatus, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          props.setCurrentOrder((prev) => ({
            ...prev,
            paymentStatus: selectedPaymentStatus,
          }));
        })
        .catch((err) =>
          toast.error("Something went wrong" + err, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
    }
  };

  const [selectedOrderStatus, setSelectedOrderStatus] = useState();
  const handleOrderStatus = (status) => {
    setSelectedOrderStatus(status);
  };

  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState();
  const handlePaymentStatus = (status) => {
    setSelectedPaymentStatus(status);
  };

  const assignRiderToOrder = async () => {
    if (selectedRiderOption !== null) {
      firebaseDb
        .ref(`orders/${props.currentId}`)
        .update({ rider: selectedRiderOption.rider })
        .then(
          toast.success("A rider has been assigned!", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        )
        .catch((err) =>
          toast.error("Something went wrong" + err, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
    }
  };

  useEffect(() => {
    if (props.currentOrder) {
      setSelectedRiderOption({
        label: (
          <div>
            {props.currentOrder.rider.riderImage && (
              <img
                src={props.currentOrder.rider.riderImage}
                height="30px"
                width="30px"
                marginRight="5px"
                alt={props.currentOrder.rider.riderName}
              />
            )}

            {props.currentOrder.rider.riderName
              ? props.currentOrder.rider.riderName
              : "Not Assigned"}
          </div>
        ),
        value: props.currentOrder.rider.riderName
          ? props.currentOrder.rider.riderName
          : "Not Assigned",
        rider: props.currentOrder.rider
          ? props.currentOrder.rider
          : "Not Assigned",
      });

      // reset status edit mode
      setEditOrderStatusMode(false);
      setEditPaymentStatusMode(false);

      // reset status values
      setSelectedOrderStatus(props.currentOrder.status);
      setSelectedPaymentStatus(props.currentOrder.paymentStatus);
    }
  }, [props.currentOrder]);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    window.location.reload(false);
  };

  const showAssignRiderButton = () => {
    var showButton = true;
    if (selectedRiderOption.value === "Not Assigned") {
      showButton = false;
    } else if (
      selectedRiderOption.value === props.currentOrder.rider.riderName
    ) {
      showButton = false;
    }
    return showButton;
  };

  return (
    <Fragment>
      {props.currentOrder && props.currentOrder !== {} ? (
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
                            order: props.currentOrder,
                            user: props.currentOrder.customer,
                            userId: props.currentOrder.customerId,
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
                        Customer:{" "}
                        <strong>{props.currentOrder.customer.name}</strong>
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-6 col-sm-6 mb-4">
                      <h5>
                        Address:{" "}
                        <strong>{props.currentOrder.customer.address}</strong>
                      </h5>
                      <h5>
                        Landmark:{" "}
                        <strong>{props.currentOrder.customer.landmark}</strong>
                      </h5>
                    </div>
                    <div className="col-xl-6 col-sm-6 mb-4">
                      <h5>
                        Phone:{" "}
                        <strong>
                          {props.currentOrder.customer.contactNumber}
                        </strong>
                      </h5>
                      <h5>
                        Date of Delivery:{" "}
                        <strong>{props.currentOrder.dateOfDelivery}</strong>
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
                      {showAssignRiderButton() && (
                        <span>
                          <Button
                            className="mt-2 pull-right"
                            variant="primary btn-xs"
                            onClick={assignRiderToOrder}
                          >
                            Assign Rider to Order
                          </Button>
                        </span>
                      )}
                    </div>
                    <div className="col-xl-4 col-sm-4">
                      <h6>Order Status:</h6>
                      <span>
                        {editOrderStatusMode ? (
                          <div>
                            <Dropdown>
                              <Dropdown.Toggle variant="" size="s">
                                {props.statusBadge(selectedOrderStatus)}
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
                                  onSelect={() =>
                                    handleOrderStatus("PROCESSING")
                                  }
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
                                  onSelect={() =>
                                    handleOrderStatus("IN TRANSIT")
                                  }
                                >
                                  {props.statusBadge("IN TRANSIT")}
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onSelect={() =>
                                    handleOrderStatus("DELIVERED")
                                  }
                                >
                                  {props.statusBadge("DELIVERED")}
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onSelect={() =>
                                    handleOrderStatus("CANCELLED")
                                  }
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
                            {props.statusBadge(props.currentOrder.status)}
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
                        {editPaymentStatusMode ? (
                          <div>
                            <Dropdown>
                              <Dropdown.Toggle variant="" size="s">
                                {props.statusBadge(selectedPaymentStatus)}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onSelect={() => handlePaymentStatus("PAID")}
                                >
                                  {props.statusBadge("PAID")}
                                </Dropdown.Item>{" "}
                                <Dropdown.Item
                                  onSelect={() =>
                                    handlePaymentStatus("NOT PAID")
                                  }
                                >
                                  {props.statusBadge("NOT PAID")}
                                </Dropdown.Item>
                              </Dropdown.Menu>
                              <span>
                                <Button
                                  onClick={paymentStatusChangeHandler}
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
                            {props.statusBadge(
                              props.currentOrder.paymentStatus
                            )}
                            <span>
                              <Button
                                onClick={paymentStatusChangeHandler}
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
                        {props.currentOrder.products &&
                          props.currentOrder.products.map((product, index) => (
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
                            <td className="right">
                              ₱{props.currentOrder.total}
                            </td>
                          </tr>
                          <tr>
                            <td className="left">
                              <strong>Delivery Fee</strong>
                            </td>
                            <td className="right">
                              ₱{props.currentOrder.deliveryFee}
                            </td>
                          </tr>
                          <tr>
                            <td className="left">
                              <strong>Grand Total</strong>
                            </td>
                            <td className="right">
                              <strong>₱{props.currentOrder.grandTotal}</strong>
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
                      value={props.currentOrder.notes}
                      disabled
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  <strong>Delivery Receipt</strong>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="row">
                    <h2>Please select an order</h2>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OrderReceipt;
