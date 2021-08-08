import React, { Fragment, useState, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import firebaseDb from "../../../firebase";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import swal from "sweetalert";
import swalMessage from "@sweetalert/with-react";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
} from "react-bootstrap";

/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import { Link } from "react-router-dom";
import CustomerForm from "./CustomerForm";

const CustomerList = () => {
  var [contactObjects, setContactObjects] = useState({});
  var [currentId, setCurrentId] = useState("");

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
    firebaseDb.ref("customer/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setContactObjects({
          ...snapshot.val(),
        });
      else setContactObjects({});
    });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId === "") {
      swal("Nice!", "A new customer profile is added!", "success");
      firebaseDb.ref("customer/").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    } else {
      swal("Nice!", "This customer profile is updated!", "success");
      firebaseDb.ref(`customer/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  const onDelete = (key) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this customer!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        firebaseDb.ref(`customer/${key}`).remove((err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
        swal("Poof! This customer profile has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your customer profile is safe!");
      }
    });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-4 col-lg-4">
          <CustomerForm {...{ addOrEdit, currentId, contactObjects }} />
        </div>
        <div className="col-xl-8 col-lg-8">
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>My Customers</Card.Title>
                  <div className="row">
                    <div className="search_bar dropdown show">
                      <div className="dropdown-menushow">
                        <form onSubmit={(e) => e.preventDefault()}>
                          <input
                            className="form-control"
                            type="search"
                            placeholder="Search Here"
                            aria-label="Search"
                          />
                        </form>
                      </div>
                      {/* <span
                        className="search_icon p-3 c-pointer"
                        data-toggle="dropdown"
                     >
                        <svg
                           width={20}
                           height={20}
                           viewBox="0 0 24 24"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              d="M23.7871 22.7761L17.9548 16.9437C19.5193 15.145 20.4665 12.7982 20.4665 10.2333C20.4665 4.58714 15.8741 0 10.2333 0C4.58714 0 0 4.59246 0 10.2333C0 15.8741 4.59246 20.4665 10.2333 20.4665C12.7982 20.4665 15.145 19.5193 16.9437 17.9548L22.7761 23.7871C22.9144 23.9255 23.1007 24 23.2816 24C23.4625 24 23.6488 23.9308 23.7871 23.7871C24.0639 23.5104 24.0639 23.0528 23.7871 22.7761ZM1.43149 10.2333C1.43149 5.38004 5.38004 1.43681 10.2279 1.43681C15.0812 1.43681 19.0244 5.38537 19.0244 10.2333C19.0244 15.0812 15.0812 19.035 10.2279 19.035C5.38004 19.035 1.43149 15.0865 1.43149 10.2333Z"
                              fill="#A4A4A4"
                           />
                        </svg>
                     </span> */}
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>
                          <strong>NAME</strong>
                        </th>
                        <th>
                          <strong>CONTACT NUMBER</strong>
                        </th>
                        <th>
                          <strong>ADDRESS</strong>
                        </th>
                        <th>
                          <strong>LANDMARK</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(contactObjects).map((id) => {
                        return (
                          <tr
                            key={id}
                            onClick={() => {
                              setCurrentId(id);
                            }}
                          >
                            <td>{contactObjects[id].name}</td>
                            <td>{contactObjects[id].contactNumber}</td>
                            <td>{contactObjects[id].address}</td>
                            <td>{contactObjects[id].landmark}</td>
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

export default CustomerList;
