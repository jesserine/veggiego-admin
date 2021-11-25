import React, { Fragment, useState, useEffect } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import { Link } from "react-router-dom";
import firebaseDb from "../../../firebase";
import { Dropdown, Button } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";

const OrderReceipt = (props) => {
  const { riderList } = useDataContext();

  // prepares rider data for combobox
  const [selectedRiderOption, setSelectedRiderOption] = useState({
    label: "Not Assigned",
    value: "Not Assigned",
    rider: "Not Assigned",
  });

  const riderOptions = [];
  if (riderList) {
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
  }

  // Order and Payment Status edit mode handler
  const [editOrderStatusMode, setEditOrderStatusMode] = useState(false);
  const orderStatusChangeHandler = (selectedOrderStatus) => {
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
  const paymentStatusChangeHandler = (selectedPaymentStatus) => {
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
    orderStatusChangeHandler(status);
  };

  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState();
  const handlePaymentStatus = (status) => {
    setSelectedPaymentStatus(status);
    paymentStatusChangeHandler(status);
  };

  const assignRiderToOrder = async () => {
    if (props.currentId !== null) {
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
    } else {
      toast.error("Something went wrong", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

  if (!riderList) {
    return <h1>Loading...</h1>;
  }

  console.log("currentOrder", props.currentOrder);

  return (
    <Fragment>
      {props.currentOrder ? (
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  <strong>Delivery Receipt</strong>
                  {" VG-"}
                  {props.currentOrder.orderNumber}
                </h4>
                <div className="pull-right">
                  <Link
                    to={{
                      pathname: "/customer-order",
                      state: {
                        order: props.currentOrder,
                        user: props.currentOrder.customer,
                        customerId: props.currentOrder.customerId,
                        orderId: props.currentId,
                        deliveryAddress: props.currentOrder.deliveryAddress,
                      },
                    }}
                    className="btn btn-warning btn-xs ml-1 pull-right"
                  >
                    Update Order
                  </Link>
                </div>
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
                        <strong>
                          {props.currentOrder.deliveryAddress.street &&
                            props.currentOrder.deliveryAddress.street}{" "}
                          {", " +
                            props.currentOrder.deliveryAddress.location
                              .completeLocation}
                        </strong>
                      </h5>
                      <h5>
                        Landmark:{" "}
                        <strong>
                          {props.currentOrder.deliveryAddress.landmark}
                        </strong>
                      </h5>
                    </div>
                    <div className="col-xl-6 col-sm-6 mb-4">
                      <h5>
                        Phone:{" "}
                        <strong>
                          {props.currentOrder.deliveryAddress.contactNumber}
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
                              <Dropdown.Menu show>
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
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        ) : (
                          <div
                            onClick={orderStatusChangeHandler}
                            style={{
                              marginTop: 20,
                              marginLeft: 20,
                              cursor: "pointer",
                            }}
                          >
                            {props.statusBadge(props.currentOrder.status)}
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
                              <Dropdown.Menu show>
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
                            </Dropdown>
                          </div>
                        ) : (
                          <div
                            onClick={paymentStatusChangeHandler}
                            style={{
                              marginTop: 20,
                              marginLeft: 20,
                              cursor: "pointer",
                            }}
                          >
                            {props.statusBadge(
                              props.currentOrder.paymentStatus
                            )}
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
                            <tr key={index}>
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
