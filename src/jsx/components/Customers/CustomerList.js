import React, { Fragment, useState, useEffect } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import firebaseDb from "../../../firebase";
import swal from "sweetalert";
import { Row, Col, Card, Table, Button } from "react-bootstrap";

import { toast } from "react-toastify";
import CustomerForm from "./CustomerForm";
import AddressModal from "./AddressModal";

const CustomerList = () => {
  /// Get customer list from context provider
  const { customerList, setCustomerList } = useDataContext();

  var [currentId, setCurrentId] = useState("");
  var [searchTerm, setSearchTerm] = useState("");

  const addOrEdit = (obj) => {
    if (currentId === "") {
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

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-4 col-lg-6">
          <CustomerForm {...{ addOrEdit, currentId, customerList }} />
        </div>
        <div className="col-xl-8 col-lg-6">
          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>My Customers</Card.Title>
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
                      {Object.keys(filteredCustomers(customerList, searchTerm))
                        .slice(0)
                        .reverse()
                        .map((id) => {
                          return (
                            <tr
                              key={id}
                              onClick={() => {
                                setCurrentId(id);
                                toast.success(
                                  "Viewing customer '" +
                                    customerList[id].name +
                                    "'",
                                  {
                                    position: "bottom-left",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                  }
                                );
                              }}
                            >
                              <td>{customerList[id].name}</td>
                              <td>{customerList[id].contactNumber}</td>
                              <td>
                                {JSON.stringify(customerList[id].address)}
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
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerList;
