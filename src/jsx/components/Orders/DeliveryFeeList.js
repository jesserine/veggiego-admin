import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from "../../../firebase";
import swal from "sweetalert";
import { Row, Col, Card, Table, Badge } from "react-bootstrap";

import { Link } from "react-router-dom";
import DeliveryFeeForm from "./DeliveryFeeForm";

const DeliveryFeeList = () => {
  var [deliveryFeeObjects, setDeliveryFeeObjects] = useState({});
  var [currentId, setCurrentId] = useState("");

  useEffect(() => {
    firebaseDb.ref("delivery/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setDeliveryFeeObjects({
          ...snapshot.val(),
        });
      else setDeliveryFeeObjects({});
    });
  }, []);

  const addOrEdit = (obj) => {
    console.log("inside addOrEdit");
    if (currentId === "") {
      swal("Nice!", "A new delivery fee is added!", "success");
      firebaseDb.ref("delivery/").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    } else {
      swal("Nice!", "This delivery fee is updated!", "success");
      firebaseDb.ref(`delivery/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  const onDelete = (key) => {
    if (window.confirm("Are you sure to delete this record?")) {
      firebaseDb.ref(`delivery/${key}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <h2 className="text-black font-w600 mb-1">Delivery Fee Settings</h2>
          <div className="mt-4">
            <DeliveryFeeForm
              {...{ addOrEdit, currentId, deliveryFeeObjects }}
            />
          </div>

          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Delivery Fee</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>
                          <strong></strong>
                        </th>
                        <th>
                          <strong>LOCATION</strong>
                        </th>
                        <th>
                          <strong>DELIVERY FEE</strong>
                        </th>
                        <th>
                          <strong>DATE ADDDED</strong>
                        </th>
                        <th>
                          <strong>STATUS</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(deliveryFeeObjects).map((id) => {
                        return (
                          <tr key={id}>
                            <td>
                              <div className="d-flex">
                                <Link
                                  to="/products-unit"
                                  onClick={() => {
                                    setCurrentId(id);
                                    window.scrollTo(0, 0);
                                  }}
                                  className="btn btn-primary shadow btn-xs sharp mr-1"
                                >
                                  <i className="fa fa-pencil"></i>
                                </Link>
                                <Link
                                  to="/products-unit"
                                  onClick={() => {
                                    onDelete(id);
                                  }}
                                  className="btn btn-danger shadow btn-xs sharp"
                                >
                                  <i className="fa fa-trash"></i>
                                </Link>
                              </div>
                            </td>
                            <td>{deliveryFeeObjects[id].location}</td>
                            <td>{deliveryFeeObjects[id].deliveryFee}</td>
                            <td>{deliveryFeeObjects[id].dateAdded}</td>
                            <td>
                              {deliveryFeeObjects[id].isActive === "false" ? (
                                <Badge variant="danger light"> Inactive </Badge>
                              ) : (
                                <Badge variant="success light"> Active </Badge>
                              )}
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

export default DeliveryFeeList;
