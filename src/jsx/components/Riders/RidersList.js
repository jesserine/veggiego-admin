import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from "../../../firebase";
import { useDataContext } from "../../../contexts/DataContext";
import swal from "sweetalert";
import swalMessage from "@sweetalert/with-react";
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

import RidersForm from "./RidersForm";

const RidersList = () => {
  /// Get rider list from context provider
  const { riderList } = useDataContext();
  const [riders, setRiders] = useState(riderList);

  var [currentId, setCurrentId] = useState("");
  var [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.length > 0) {
      firebaseDb.ref("riders/").on("value", (snapshot) => {
        if (snapshot.val() != null) {
          const ridersDb = snapshot.val();
          setRiders([]);
          let searchQuery = searchTerm.toLowerCase();
          for (let id in ridersDb) {
            let rider = ridersDb[id].riderName.toLowerCase();
            if (
              rider.slice(0, searchQuery.length).indexOf(searchQuery) !== -1
            ) {
              setRiders((prevResult) => {
                return [...prevResult, ridersDb[id]];
              });
            }
          }
        } else {
          setRiders([]);
        }
      });
    } else {
      firebaseDb.ref("riders/").on("value", (snapshot) => {
        if (snapshot.val() != null)
          setRiders({
            ...snapshot.val(),
          });
        else setRiders({});
      });
    }
  }, [searchTerm]);

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
          <RidersForm {...{ addOrEdit, currentId, riders }} />
        </div>
        <div className="col-xl-8 col-lg-8">
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>My Riders</Card.Title>
                  <span className="float-right">
                    <Button
                      className="btn-sm btn-primary btn-block"
                      onClick={() => {
                        setCurrentId("");
                      }}
                    >
                      Add new rider
                    </Button>
                  </span>
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
                      {Object.keys(riders).map((id) => {
                        return (
                          <tr
                            key={id}
                            onClick={() => {
                              setCurrentId(id);
                            }}
                          >
                            <td>
                              <img
                                src={riders[id].riderImage}
                                className="rounded-lg mr-2"
                                width="24"
                                alt=""
                              />
                              <span>{riders[id].riderName}</span>
                            </td>
                            <td>{riders[id].riderContactNum}</td>
                            <td>{riders[id].riderAddress}</td>
                            <td>{riders[id].vehicleType}</td>
                            <td>{riders[id].vehiclePlateNum}</td>
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

export default RidersList;
