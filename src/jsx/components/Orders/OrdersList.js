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
  const [filterStatus, setFilterStatus] = useState("ACTIVE");

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { isAdded } = location.state;
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
        }
      }, 500);
    }
  }, []);

  /// filter order list based on status
  useEffect(() => {
    if (orderList) {
      var filteredOrders = Object.keys(orderList)
        .filter((orderId) => orderList[orderId].status === filterStatus)
        .reduce((res, key) => ((res[key] = orderList[key]), res), {});
      setOrderValues(filteredOrders);
    }
  }, [filterStatus]);

  const addOrEdit = (obj) => {
    if (currentId === "") {
      swal("Nice!", "A new order is added!", "success");
      firebaseDb.ref("orders/").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    } else {
      swal("Nice!", "This order is updated!", "success");
      firebaseDb.ref(`orders/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  const [currentOrder, setCurrentOrder] = useState();

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
    setCurrentId("");
  };

  const statusBadge = (status) => {
    switch (status) {
      case "PREORDER":
        return <Badge variant="info light">{status.toUpperCase()}</Badge>;
      case "ACTIVE":
        return <Badge variant="info light">{status.toUpperCase()}</Badge>;
      case "PROCESSING":
        return <Badge variant="secondary light">{status.toUpperCase()}</Badge>;
      case "FOR DELIVERY":
        return <Badge variant="warning light">{status.toUpperCase()}</Badge>;
      case "IN TRANSIT":
        return <Badge variant="success light">{status.toUpperCase()}</Badge>;
      case "DELIVERED":
        return <Badge variant="primary light">{status.toUpperCase()}</Badge>;
      case "CANCELLED":
        return <Badge variant="danger light">{status.toUpperCase()}</Badge>;
      case "PAID":
        return <Badge variant="primary light">{status.toUpperCase()}</Badge>;
      case "NOT PAID":
        return <Badge variant="danger light">{status.toUpperCase()}</Badge>;
      default:
        return <Badge variant="dark light">{status.toUpperCase()}</Badge>;
    }
  };

  // Triggers every order status filter change
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
      {orderValues && (
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
                          {statusBadge(filterStatus)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
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
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>
                            <strong>STATUS</strong>
                          </th>
                          <th>
                            <strong>CUSTOMER NAME</strong>
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
                          {/* <th>
                          <strong>RIDER NAME</strong>
                        </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(orderValues).map((orderId) => {
                          return (
                            <tr
                              key={orderId}
                              onClick={() => {
                                setCurrentId(orderId);
                                setCurrentOrder({ ...orderValues[orderId] });
                              }}
                            >
                              <td>
                                {statusBadge(orderValues[orderId].status)}
                              </td>
                              <td>{orderValues[orderId].customer.name}</td>
                              <td>
                                {orderValues[orderId].customer.contactNumber}
                              </td>
                              <td>₱{orderValues[orderId].grandTotal}</td>
                              <td>{orderValues[orderId].dateOfDelivery}</td>
                              {/* <td>
                              {orderValues[orderId].rider
                                ? orderValues[orderId].rider.riderName
                                : "Not Assigned"}
                            </td> */}
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
