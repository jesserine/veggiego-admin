import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from "../../../firebase";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import swalMessage from "@sweetalert/with-react";
import PerfectScrollbar from "react-perfect-scrollbar";

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
import { Link } from "react-router-dom";
import RidersForm from "../Riders/RidersForm";

const Settings = () => {
  var [riderObjects, setRiderObjects] = useState({});
  var [currentId, setCurrentId] = useState("");
  var [searchTerm, setSearchTerm] = useState("");

  const svg1 = (
    <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <rect x="0" y="0" width="24" height="24"></rect>
        <circle fill="#000000" cx="5" cy="12" r="2"></circle>
        <circle fill="#000000" cx="12" cy="12" r="2"></circle>
        <circle fill="#000000" cx="19" cy="12" r="2"></circle>
      </g>
    </svg>
  );

  useEffect(() => {
    if (searchTerm.length > 0) {
      firebaseDb.ref("riders/").on("value", (snapshot) => {
        if (snapshot.val() != null) {
          const ridersDb = snapshot.val();
          setRiderObjects([]);
          let searchQuery = searchTerm.toLowerCase();
          for (let id in ridersDb) {
            let rider = ridersDb[id].riderName.toLowerCase();
            if (
              rider.slice(0, searchQuery.length).indexOf(searchQuery) !== -1
            ) {
              setRiderObjects((prevResult) => {
                return [...prevResult, ridersDb[id]];
              });
            }
          }
        } else {
          setRiderObjects([]);
        }
      });
    } else {
      firebaseDb.ref("riders/").on("value", (snapshot) => {
        if (snapshot.val() != null)
          setRiderObjects({
            ...snapshot.val(),
          });
        else setRiderObjects({});
      });
    }
  }, [searchTerm]);

  useEffect(() => {
    firebaseDb.ref("riders/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setRiderObjects({
          ...snapshot.val(),
        });
      else setRiderObjects({});
    });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId === "") {
      swal("Nice!", "A new rider profile is added!", "success");
      firebaseDb.ref("riders/").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    } else {
      swal("Nice!", "This rider profile is updated!", "success");
      firebaseDb.ref(`riders/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  const onDelete = (key) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this rider!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        firebaseDb.ref(`riders/${key}`).remove((err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
        swal("Poof! This rider profile has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your rider profile is safe!");
      }
    });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-4 col-lg-4">
          <PerfectScrollbar>
            <RidersForm {...{ addOrEdit, currentId, riderObjects }} />
            <RidersForm {...{ addOrEdit, currentId, riderObjects }} />
          </PerfectScrollbar>
        </div>
        <div className="col-xl-8 col-lg-8">
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>My Riders</Card.Title>
                  <Button
                    variant="primary btn-rounded"
                    onClick={() => {
                      setCurrentId("");
                    }}
                  >
                    <span className="btn-icon-left text-primary">
                      <i className="fa fa-plus" />
                    </span>
                    Add
                  </Button>
                </Card.Header>
                <Card.Body>
                  <div className="search_bar dropdown show mb-3">
                    <div className="dropdown-menushow">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Search Rider name"
                          aria-label="Search"
                          onChange={(event) =>
                            setSearchTerm(event.target.value)
                          }
                        />
                      </form>
                    </div>
                  </div>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>
                          <strong>NAME</strong>
                        </th>
                        <th>
                          <strong>CONTACT #</strong>
                        </th>
                        <th>
                          <strong>ADDRESS</strong>
                        </th>
                        <th>
                          <strong>VEHICLE TYPE</strong>
                        </th>
                        <th>
                          <strong>VEHICLE PLATE #</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(riderObjects).map((id) => {
                        return (
                          <tr
                            key={id}
                            onClick={() => {
                              setCurrentId(id);
                            }}
                          >
                            <td>
                              <img
                                src={riderObjects[id].riderImage}
                                className="rounded-lg mr-2"
                                width="24"
                                alt=""
                              />
                              <span>{riderObjects[id].riderName}</span>
                            </td>
                            <td>{riderObjects[id].riderContactNum}</td>
                            <td>{riderObjects[id].riderAddress}</td>
                            <td>{riderObjects[id].vehicleType}</td>
                            <td>{riderObjects[id].vehiclePlateNum}</td>
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

      <div className="row">
        <div className="col-xl-4 col-lg-4"></div>
      </div>
    </Fragment>
  );
};

export default Settings;
