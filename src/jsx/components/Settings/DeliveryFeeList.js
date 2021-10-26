import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from "../../../firebase";
import swal from "sweetalert";
import { Row, Col, Card, Table, Badge, Button } from "react-bootstrap";

import DeliveryFeeForm from "./DeliveryFeeForm";
import { useDataContext } from "../../../contexts/DataContext";

const DeliveryFeeList = () => {
  var [deliveryFeeObjects, setDeliveryFeeObjects] = useState({});
  var [currentId, setCurrentId] = useState("");
  const { deliveryFeeList, setDeliveryFeeList } = useDataContext();
  var [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   firebaseDb.ref("delivery/").on("value", (snapshot) => {
  //     if (snapshot.val() != null)
  //       setDeliveryFeeObjects({
  //         ...snapshot.val(),
  //       });
  //     else setDeliveryFeeObjects({});
  //   });
  // }, []);

  const addOrEdit = (obj) => {
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

  const filteredDeliveryFee = (deliveryFeeList, searchTerm) => {
    if (!searchTerm) {
      return deliveryFeeList;
    }
    return Object.keys(deliveryFeeList)
      .filter((id) =>
        deliveryFeeList[id].location
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .reduce((res, key) => ((res[key] = deliveryFeeList[key]), res), {});
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <h2 className="text-black font-w600 mb-1">Delivery Fee Settings</h2>
          <div className="mt-4">
            <DeliveryFeeForm
              {...{ addOrEdit, currentId, setCurrentId, deliveryFeeList }}
            />
          </div>

          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Delivery Fee</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="search_bar dropdown show mb-3">
                    <div className="dropdown-menushow">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Search Unit"
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
                        <th>
                          <strong>LOCATION</strong>
                        </th>
                        <th>
                          <strong>DELIVERY FEE</strong>
                        </th>
                        {/* <th>
                          <strong>DATE ADDDED</strong>
                        </th> */}
                        <th>
                          <strong>STATUS</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(
                        filteredDeliveryFee(deliveryFeeList, searchTerm)
                      ).map((id) => {
                        return (
                          <tr key={id}>
                            <td>
                              {!["Free Delivery", "Custom"].includes(
                                deliveryFeeList[id].location
                              ) && (
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
                              )}
                            </td>
                            <td>{deliveryFeeList[id].location}</td>
                            <td>₱ {deliveryFeeList[id].deliveryFee}</td>
                            {/* <td>{deliveryFeeObjects[id].dateAdded}</td> */}
                            <td>
                              {!deliveryFeeList[id].isActive ? (
                                <Badge variant="danger light"> INACTIVE </Badge>
                              ) : (
                                <Badge variant="primary light"> ACTIVE </Badge>
                              )}
                            </td>
                            <td>
                              {!["Free Delivery", "Custom"].includes(
                                deliveryFeeList[id].location
                              ) && (
                                <Button
                                  onClick={() => {
                                    onDelete(id);
                                  }}
                                  className="btn btn-danger btn-xs  mr-1"
                                >
                                  Delete
                                </Button>
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
