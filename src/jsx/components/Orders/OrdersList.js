import React, { Fragment, useEffect, useState } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import firebaseDb from "../../../firebase";
import swal from "sweetalert";
import { Row, Col, Card, Table, Badge, Dropdown } from "react-bootstrap";

import { toast } from "react-toastify";
import OrderReceipt from "./OrderReceipt";
import { Link, useLocation } from "react-router-dom";

const OrdersList = () => {
  const { orderList } = useDataContext();
  var [orderValues, setOrderValues] = useState(orderList);
  var [currentId, setCurrentId] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  var [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { isAdded, isUpdated } = location.state;
      console.log(location.state);
      setTimeout(async () => {
        if (isAdded) {
          toast.success("Order successfully placed!", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (isUpdated) {
          toast.success("Order successfully updated!", {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }, 500);
    }
  }, []);

  /// filter order list based on status
  useEffect(() => {}, [filterStatus]);

  const addOrEdit = (obj) => {
    if (currentId === "") {
      swal("Nice!", "A new order is added!", "success");
      firebaseDb.ref("orders/").push(obj, (err) => {
        if (err) {
          toast.error("An error has occured!" + err, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else setCurrentId("");
      });
    } else {
      swal("Nice!", "This order is updated!", "success");
      firebaseDb.ref(`orders/${currentId}`).set(obj, (err) => {
        if (err) {
          toast.error("An error has occured!" + err, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else setCurrentId("");
      });
    }
  };

  const [currentOrder, setCurrentOrder] = useState();

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
    setCurrentId("");
  };

  const statusBadge = (status) => {
    if (status) {
      if (status.includes("PREORDER")) {
        return <Badge variant="info light">{status.toUpperCase()}</Badge>;
      } else if (status.includes("ACTIVE")) {
        return <Badge variant="info light">{status.toUpperCase()}</Badge>;
      } else if (status.includes("PROCESSING")) {
        return <Badge variant="secondary light">{status.toUpperCase()}</Badge>;
      } else if (status.includes("FOR DELIVERY")) {
        return <Badge variant="warning light">{status.toUpperCase()}</Badge>;
      } else if (status.includes("IN TRANSIT")) {
        return <Badge variant="success light">{status.toUpperCase()}</Badge>;
      } else if (status.includes("DELIVERED")) {
        return <Badge variant="primary light">{status.toUpperCase()}</Badge>;
      } else if (status.includes("CANCELLED")) {
        return <Badge variant="danger light">{status.toUpperCase()}</Badge>;
      } else if (status.includes("NOT PAID")) {
        return <Badge variant="danger light">{status.toUpperCase()}</Badge>;
      } else if (status.includes("PAID")) {
        return <Badge variant="primary light">{status.toUpperCase()}</Badge>;
      } else {
        return <Badge variant="dark light">{status.toUpperCase()}</Badge>;
      }
    }
  };

  const filteredOrders = (orderList, status) => {
    if (status === "ALL") {
      return Object.keys(orderList)
        .filter((orderId) =>
          orderList[orderId].customer.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .reduce((res, key) => ((res[key] = orderList[key]), res), {});
    } else {
      var filteredOrders = Object.keys(orderList)
        .filter(
          (orderId) =>
            orderList[orderId].status === status &&
            orderList[orderId].customer.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
        .reduce((res, key) => ((res[key] = orderList[key]), res), {});
      return filteredOrders;
    }
  };

  // View delivery receipt - Triggers every order status filter change
  useEffect(() => {
    if (orderValues) {
      if (Object.keys(orderValues).length > 0) {
        setCurrentOrder({
          ...orderValues[
            Object.keys(orderValues)[Object.keys(orderValues).length - 1]
          ],
        });
      } else {
        setCurrentOrder("");
      }
    }
  }, [orderValues]);

  return (
    <Fragment>
      {orderList && (
        <div className="row">
          <div className="col-xl-6 col-lg-6">
            <OrderReceipt
              {...{
                addOrEdit,
                currentId,
                orderValues,
                statusBadge,
                currentOrder,
                setCurrentOrder,
              }}
            />
          </div>
          <div className="col-xl-6 col-lg-6">
            <Row>
              <Col lg={12}>
                <Card>
                  <Card.Header>
                    <Card.Title>
                      Customer Orders
                      <Dropdown>
                        <Dropdown.Toggle variant="" size="m" className="mt-1">
                          {statusBadge(
                            filterStatus +
                              " (" +
                              Object.keys(
                                filteredOrders(orderList, filterStatus)
                              ).length +
                              ")"
                          )}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onSelect={() => handleFilterStatus("ALL")}
                          >
                            {statusBadge("ALL")}
                          </Dropdown.Item>{" "}
                          <Dropdown.Item
                            onSelect={() => handleFilterStatus("ACTIVE")}
                          >
                            {statusBadge("ACTIVE")}
                          </Dropdown.Item>{" "}
                          <Dropdown.Item
                            onSelect={() => handleFilterStatus("PREORDER")}
                          >
                            {statusBadge("PREORDER")}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onSelect={() => handleFilterStatus("PROCESSING")}
                          >
                            {statusBadge("PROCESSING")}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onSelect={() => handleFilterStatus("FOR DELIVERY")}
                          >
                            {statusBadge("FOR DELIVERY")}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onSelect={() => handleFilterStatus("IN TRANSIT")}
                          >
                            {statusBadge("IN TRANSIT")}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onSelect={() => handleFilterStatus("DELIVERED")}
                          >
                            {statusBadge("DELIVERED")}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onSelect={() => handleFilterStatus("CANCELLED")}
                          >
                            {statusBadge("CANCELLED")}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Card.Title>
                    <span className="float-right">
                      <Link
                        to={{
                          pathname: "/customer-order",
                          state: {
                            user: null,
                            userId: null,
                          },
                        }}
                        className="btn-sm btn-primary btn-block"
                      >
                        Add new order
                      </Link>
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input
                        className="form-control"
                        type="search"
                        placeholder="Search Customer Name"
                        aria-label="Search"
                        onChange={(event) => setSearchTerm(event.target.value)}
                      />
                    </form>
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>
                            <strong>ORDER STATUS</strong>
                          </th>
                          <th>
                            <strong>PAYMENT</strong>
                          </th>
                          <th>
                            <strong>CUSTOMER</strong>
                          </th>
                          <th>
                            <strong>CONTACT NUMBER</strong>
                          </th>
                          <th>
                            <strong>GRAND TOTAL</strong>
                          </th>
                          <th>
                            <strong>DATE OF DELIVERY</strong>
                          </th>
                          <th>
                            <strong>RIDER</strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(
                          filteredOrders(orderList, filterStatus)
                        ).map((orderId) => {
                          return (
                            <tr
                              key={orderId}
                              onClick={() => {
                                setCurrentId(orderId);
                                setCurrentOrder({ ...orderList[orderId] });
                              }}
                            >
                              <td>{statusBadge(orderList[orderId].status)}</td>
                              <td>
                                {statusBadge(orderList[orderId].paymentStatus)}
                              </td>
                              <td>{orderList[orderId].customer.name}</td>
                              <td>
                                {orderList[orderId].customer.contactNumber}
                              </td>
                              <td>₱{orderList[orderId].grandTotal}</td>
                              <td>{orderList[orderId].dateOfDelivery}</td>
                              <td>{orderList[orderId].rider.riderName}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default OrdersList;
