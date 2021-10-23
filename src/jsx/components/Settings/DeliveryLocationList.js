import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from "../../../firebase";
import swal from "sweetalert";
import { Row, Col, Card, Table, Badge } from "react-bootstrap";

import { Link } from "react-router-dom";
import DeliveryLocationForm from "./DeliveryLocationForm";

const DeliveryLocationList = () => {
  var [deliveryLocationObjects, setDeliveryLocationObjects] = useState({});
  var [currentId, setCurrentId] = useState("");

  useEffect(() => {
    firebaseDb.ref("deliveryLocations/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setDeliveryLocationObjects({
          ...snapshot.val(),
        });
      else setDeliveryLocationObjects({});
    });
  }, []);

  const addOrEdit = (obj) => {
    console.log("inside addOrEdit");
    if (currentId === "") {
      swal("Nice!", "A new delivery location is added!", "success");
      firebaseDb.ref("deliveryLocations/").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
        console.log("added succesfully");
      });
    } else {
      swal("Nice!", "This delivery location is updated!", "success");
      firebaseDb.ref(`deliveryLocations/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  const onDelete = (key) => {
    if (window.confirm("Are you sure to delete this record?")) {
      firebaseDb.ref(`deliveryLocations/${key}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <h2 className="text-black font-w600 mb-1">
            Supported Delivery Location Settings
          </h2>
          <div className="mt-4">
            <DeliveryLocationForm
              {...{ addOrEdit, currentId, deliveryLocationObjects }}
            />
          </div>

          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Delivery Locations</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>
                          <strong></strong>
                        </th>
                        <th>
                          <strong>REGION</strong>
                        </th>
                        <th>
                          <strong>PROVINCE</strong>
                        </th>
                        <th>
                          <strong>CITY</strong>
                        </th>
                        <th>
                          <strong>BARANGAY</strong>
                        </th>
                        <th>
                          <strong>STATUS</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(deliveryLocationObjects).map((id) => {
                        return (
                          <tr key={id}>
                            <td>
                              <div className="d-flex">
                                <Link
                                  to="/settings"
                                  onClick={() => {
                                    setCurrentId(id);
                                    window.scrollTo(0, 0);
                                  }}
                                  className="btn btn-primary shadow btn-xs sharp mr-1"
                                >
                                  <i className="fa fa-pencil"></i>
                                </Link>
                                <Link
                                  to="/settings"
                                  onClick={() => {
                                    onDelete(id);
                                  }}
                                  className="btn btn-danger shadow btn-xs sharp"
                                >
                                  <i className="fa fa-trash"></i>
                                </Link>
                              </div>
                            </td>
                            <td>{deliveryLocationObjects[id].region}</td>
                            <td>{deliveryLocationObjects[id].province}</td>
                            <td>{deliveryLocationObjects[id].city}</td>
                            <td>{deliveryLocationObjects[id].barangay}</td>
                            <td>
                              {deliveryLocationObjects[id].isActive ===
                              "false" ? (
                                <Badge variant="danger light"> INACTIVE </Badge>
                              ) : (
                                <Badge variant="success light"> ACTIVE </Badge>
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

export default DeliveryLocationList;
