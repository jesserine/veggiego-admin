import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from "../../../firebase";
import swal from "sweetalert";
import { Row, Col, Card, Table, Badge, Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import UnitForm from "./UnitForm";
import { useDataContext } from "../../../contexts/DataContext";

const UnitList = () => {
  var [unitObjects, setUnitObjects] = useState({});
  var [currentId, setCurrentId] = useState("");
  var [searchTerm, setSearchTerm] = useState("");
  const { unitList, setUnitList } = useDataContext();

  // useEffect(() => {
  //   firebaseDb.ref("unit/").on("value", (snapshot) => {
  //     if (snapshot.val() != null)
  //       setUnitObjects({
  //         ...snapshot.val(),
  //       });
  //     else setUnitObjects({});
  //   });
  // }, []);

  const addOrEdit = (obj) => {
    console.log("inside addOrEdit");
    if (currentId == "") {
      swal("Nice!", "A new unit is added!", "success");
      firebaseDb.ref("unit/").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    } else {
      swal("Nice!", "This unit is updated!", "success");
      firebaseDb.ref(`unit/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  const onDelete = (key) => {
    if (window.confirm("Are you sure to delete this record?")) {
      firebaseDb.ref(`unit/${key}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  const filteredUnit = (unitList, searchTerm) => {
    if (!searchTerm) {
      return unitList;
    }
    return Object.keys(unitList)
      .filter((id) =>
        unitList[id].unitName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .reduce((res, key) => ((res[key] = unitList[key]), res), {});
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <h2 className="text-black font-w600 mb-1">Product Unit Settings</h2>
          <div className="mt-4">
            <UnitForm {...{ addOrEdit, currentId, setCurrentId, unitList }} />
          </div>
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Product Unit</Card.Title>
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
                          <strong>NAME</strong>
                        </th>
                        <th>
                          <strong>ABBREVIATION</strong>
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
                      {Object.keys(filteredUnit(unitList, searchTerm)).map(
                        (id) => {
                          return (
                            <tr key={id}>
                              <td>
                                <div className="d-flex">
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
                                </div>
                              </td>
                              <td>{unitList[id].unitName}</td>
                              <td>{unitList[id].abbreviation}</td>
                              <td>{unitList[id].dateAdded}</td>
                              <td>
                                {!unitList[id].isActive ? (
                                  <Badge variant="danger light">
                                    {" "}
                                    INACTIVE{" "}
                                  </Badge>
                                ) : (
                                  <Badge variant="primary light">
                                    {" "}
                                    ACTIVE{" "}
                                  </Badge>
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
                        }
                      )}
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

export default UnitList;
