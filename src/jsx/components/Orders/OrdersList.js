import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import firebaseDb from "../../../firebase";
import swal from "sweetalert";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  Dropdown,
  ProgressBar,
} from "react-bootstrap";

/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import { Link, useLocation } from "react-router-dom";
import OrdersForm from "./OrdersForm";
import AddRiderToOrderForm from "./AddRiderToOrderForm";

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

  var [orderValues, setOrderValues] = useState(initialOrderFieldValues);
  var [currentId, setCurrentId] = useState("");

  useEffect(() => {
    firebaseDb.ref("orders/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setOrderValues({
          ...snapshot.val(),
        });
      else setOrderValues({});
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

  console.log("orderValues", orderValues);
  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-4 col-lg-6">
          <AddRiderToOrderForm {...{ addOrEdit, currentId, orderValues }} />
        </div>
        <div className="col-xl-8 col-lg-6">
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Customer Orders</Card.Title>
                  {/* <Button
                     variant="primary btn-rounded"
                     onClick={() => {
                       setCurrentId("");
                     }}
                   >
                     <span className="btn-icon-left text-primary">
                       <i className="fa fa-plus" />
                     </span>
                     Add
                   </Button> */}
                </Card.Header>
                <Card.Body>
                  {/* <div className="search_bar dropdown show mb-3">
                     <div className="dropdown-menushow">
                       <form onSubmit={(e) => e.preventDefault()}>
                         <input
                           className="form-control"
                           type="search"
                           placeholder="Search Customer"
                           aria-label="Search"
                           // onChange ={(event) => setSearchTerm(event.target.value)}
                         />
                       </form>
                     </div>
                   </div> */}
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
                          <strong>TOTAL</strong>
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
                      {Object.keys(orderValues).map((id) => {
                        return (
                          <tr
                            key={id}
                            onClick={() => {
                              setCurrentId(id);
                            }}
                          >
                            <td>
                              {orderValues[id].customer &&
                                orderValues[id].customer.name}
                            </td>
                            <td>
                              {orderValues[id].customer &&
                                orderValues[id].customer.contactNumber}
                            </td>
                            <td>{orderValues[id].total}</td>
                            <td>{orderValues[id].dateOfDelivery}</td>
                            <td>{orderValues[id].rider}</td>
                            {/* {console.log(orderValues[id].customer.name)} */}
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
