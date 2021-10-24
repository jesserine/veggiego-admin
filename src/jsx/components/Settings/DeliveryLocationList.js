import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from "../../../firebase";
import swal from "sweetalert";
import { Row, Col, Card, Table, Badge, Button } from "react-bootstrap";

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
      console.log(obj);
      firebaseDb.ref(`deliveryLocations/`).push(obj, (err) => {
        if (err) {
          console.log(err);
        } else setCurrentId("");
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
              {...{
                addOrEdit,
                currentId,
                setCurrentId,
                deliveryLocationObjects,
              }}
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
                              <Button
                                onClick={() => {
                                  setCurrentId(id);
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }}
                                className="btn btn-primary btn-xs  mr-1"
                              >
                                Edit
                              </Button>
                            </td>

                            <td>{deliveryLocationObjects[id].region}</td>
                            <td>{deliveryLocationObjects[id].province}</td>
                            <td>{deliveryLocationObjects[id].city}</td>
                            <td>{deliveryLocationObjects[id].barangay}</td>
                            <td>
                              {!deliveryLocationObjects[id].isActive ? (
                                <Badge variant="danger light"> INACTIVE </Badge>
                              ) : (
                                <Badge variant="primary light"> ACTIVE </Badge>
                              )}
                            </td>
                            <td>
                              <Button
                                onClick={() => {
                                  onDelete(id);
                                }}
                                className="btn btn-danger btn-xs  mr-1"
                              >
                                Delete
                              </Button>
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
