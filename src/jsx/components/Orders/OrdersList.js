import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import firebaseDb from "../../../firebase";
import swal from "sweetalert";
import { Row, Col, Card, Table, Badge } from "react-bootstrap";

import OrdersForm from "./OrdersForm";
import AddRiderToOrderForm from "./AddRiderToOrderForm";
import { Link } from "react-router-dom";

const OrdersList = () => {
  const initialOrderFieldValues = {
    products: [],
    notes: "",
    total: 0,
    rider: "",
    deliveryLocation: "",
    deliveryFee: 0,
    dateOfDelivery: new Date().toLocaleString(),
    customer: [],
    customerId: "",
    dateAdded: new Date().toLocaleString(),
  };

  var [orderValues, setOrderValues] = useState([]);
  var [currentId, setCurrentId] = useState("");
  useEffect(() => {
    firebaseDb.ref("orders/").on("value", (snapshot) => {
      setOrderValues(snapshot.val());
    });
  }, []);

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
      default:
        return <Badge variant="dark light">{status.toUpperCase()}</Badge>;
    }
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <AddRiderToOrderForm {...{ addOrEdit, currentId, orderValues }} />
        </div>
        <div className="col-xl-6 col-lg-6">
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Customer Orders</Card.Title>
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
                        <th>
                          <strong>RIDER NAME</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(orderValues).map((orderId) => {
                        return (
                          <tr
                            key={orderId}
                            onClick={() => {
                              setCurrentId(orderId);
                            }}
                          >
                            <td>{statusBadge(orderValues[orderId].status)}</td>
                            <td>{orderValues[orderId].customer.name}</td>
                            <td>
                              {orderValues[orderId].customer.contactNumber}
                            </td>
                            <td>₱{orderValues[orderId].grandTotal}</td>
                            <td>{orderValues[orderId].dateOfDelivery}</td>
                            <td>
                              {orderValues[orderId].rider
                                ? orderValues[orderId].rider.riderName
                                : "Not Assigned"}
                            </td>
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
    </Fragment>
  );
};

export default OrdersList;
