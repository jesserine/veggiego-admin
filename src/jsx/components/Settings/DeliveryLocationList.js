import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from "../../../firebase";
import swal from "sweetalert";
import { Row, Col, Card, Table, Badge, Button } from "react-bootstrap";

import DeliveryLocationForm from "./DeliveryLocationForm";
import { useDataContext } from "../../../contexts/DataContext";

const DeliveryLocationList = () => {
  var [deliveryLocationObjects, setDeliveryLocationObjects] = useState({});
  var [currentId, setCurrentId] = useState("");
  var [searchTerm, setSearchTerm] = useState("");
  const { deliveryLocationList, setDeliveryLocationList } = useDataContext();

  // useEffect(() => {
  //   firebaseDb.ref("deliveryLocations/").on("value", (snapshot) => {
  //     if (snapshot.val() != null)
  //       setDeliveryLocationObjects({
  //         ...snapshot.val(),
  //       });
  //     else setDeliveryLocationObjects({});
  //   });
  // }, []);

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

  const filteredDeliveryLocations = (deliveryLocationList, searchTerm) => {
    if (!searchTerm) {
      return deliveryLocationList;
    }
    return Object.keys(deliveryLocationList)
      .filter((id) =>
        deliveryLocationList[id].completeLocation
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .reduce((res, key) => ((res[key] = deliveryLocationList[key]), res), {});
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
                deliveryLocationList,
              }}
            />
          </div>

          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Supported Delivery Locations</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="search_bar dropdown show mb-3">
                    <div className="dropdown-menushow">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Search Delivery Location"
                          aria-label="Search"
                          onChange={(event) =>
                            setSearchTerm(event.target.value)
                          }
                        />
                      </form>
                    </div>
                  </div>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>
                          <strong></strong>
                        </th>
                        {/* <th>
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
                        </th> */}
                        <th>
                          <strong>LOCATION</strong>
                        </th>
                        <th>
                          <strong>LATITUDE</strong>
                        </th>
                        <th>
                          <strong>LONGITUDE</strong>
                        </th>
                        <th>
                          <strong>STATUS</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(
                        filteredDeliveryLocations(
                          deliveryLocationList,
                          searchTerm
                        )
                      ).map((id) => {
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

                            {/* <td>{deliveryLocationObjects[id].region}</td>
                            <td>{deliveryLocationObjects[id].province}</td>
                            <td>{deliveryLocationObjects[id].city}</td>
                            <td>{deliveryLocationObjects[id].barangay}</td> */}
                            <td>{deliveryLocationList[id].completeLocation}</td>
                            <td>{deliveryLocationList[id].latitude}</td>
                            <td>{deliveryLocationList[id].longitude}</td>
                            <td>
                              {!deliveryLocationList[id].isActive ? (
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
