import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { useDataContext } from "../../../contexts/DataContext";
import firebaseDb from "../../../firebase";
import swal from "sweetalert";
import { Row, Col, Card, Table, Button } from "react-bootstrap";

import { toast } from "react-toastify";
import CustomerForm from "./CustomerForm";

const CustomerList = () => {
  /// Get customer list from context provider
  const { customerList, setCustomerList } = useDataContext();

  var [currentId, setCurrentId] = useState("");
  var [searchTerm, setSearchTerm] = useState("");

  const addOrEdit = (obj) => {
    if (currentId === "") {
      //new customer profile
      firebaseDb
        .ref("customer/")
        .push(obj)
        .then(
          toast.success("Added a new customer profile", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        )
        .catch((err) => {
          toast.error("An error has occurred " + err, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      // Update context state
      setCustomerList((prev) => ({
        ...prev,
        obj,
      }));
    } else {
      //update customer profile
      firebaseDb.ref(`customer/${currentId}`).set(obj, (err) => {
        if (err) {
          toast.error("An error has occurred " + err, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.success("Customer has been updated", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setCurrentId("");
        }
        // Update context state

        setCustomerList({ ...customerList, [currentId]: obj });
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

  const filteredCustomers = (customerList, searchTerm) => {
    if (!searchTerm) {
      return customerList;
    }
    return Object.keys(customerList)
      .filter((customerId) =>
        customerList[customerId].name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .reduce((res, key) => ((res[key] = customerList[key]), res), {});
  };

  if (!customerList) {
    return <h1>Loading...</h1>;
  }

  const CustomerTable = () => {
    return (
      <Row>
        <Col lg={12}>
          <Card>
            <Card.Header>
              <Card.Title></Card.Title>
              <span className="float-right">
                <Button
                  className="btn-sm btn-primary btn-block"
                  onClick={() => {
                    setCurrentId("");
                  }}
                >
                  Add new customer
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
                      placeholder="Search Customer"
                      aria-label="Search"
                      onChange={(event) => setSearchTerm(event.target.value)}
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
                      <strong>CONTACT NUMBER</strong>
                    </th>
                    <th>
                      <strong>DEFAULT ADDRESS</strong>
                    </th>
                    <th>
                      <strong>LANDMARK</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(filteredCustomers(customerList, searchTerm))
                    .slice(0)
                    .reverse()
                    .map((id) => {
                      return (
                        <tr
                          key={id}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setCurrentId(id);
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                        >
                          <td>{customerList[id].name}</td>
                          <td>{customerList[id].contactNumber}</td>
                          <td>
                            {customerList[id].address &&
                              customerList[id].address.map((address, i) => {
                                return (
                                  address.default && (
                                    <p>
                                      {address.street},{" "}
                                      {address.location.barangay},{" "}
                                      {address.location.city},{" "}
                                      {address.location.province}
                                    </p>
                                  )
                                );
                              })}
                          </td>
                          <td>{customerList[id].landmark}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <Fragment>
      <Helmet>
        <title>Veggie Go | Customers</title>
      </Helmet>
      <div className="form-head d-flex mb-0 mb-lg-4 align-items-start">
        <div className="mr-auto d-none d-lg-block">
          <h2 className="text-black font-w600 mb-1">Customers</h2>
          <p className="mb-0">Keep track of your customers here</p>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-5 col-lg-5">
          <CustomerForm {...{ addOrEdit, currentId, customerList }} />
        </div>
        <div className="col-xl-7 col-lg-7">
          <CustomerTable />
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerList;
