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
  const { customerList } = useDataContext();
  const [customers, setCustomers] = useState(customerList);

  const [addressList, setAddressList] = useState([]);
  var [currentId, setCurrentId] = useState("");
  var [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.length > 0) {
      //rewrite search functions
    } else {
      //rewrite search functions
    }
  }, [searchTerm]);

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

  const [addressModal, setAddressModal] = useState(false);

  const handleAddressModalState = (e) => {
    setAddressModal(e);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-4 col-lg-6">
          <CustomerForm
            {...{ addOrEdit, currentId, customers }}
            toggleModal={handleAddressModalState}
          />
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
                          // onChange ={(event) => setSearchTerm(event.target.value)}
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
                        {/* <th>
                          <strong>ID</strong>
                        </th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(customers).map((id) => {
                        return (
                          <tr
                            key={id}
                            onClick={() => {
                              setCurrentId(id);
                              toast.success(
                                "Viewing customer '" + customers[id].name + "'",
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
                            <td>{customers[id].name}</td>
                            <td>{customers[id].contactNumber}</td>
                            <td>{customers[id].address}</td>
                            <td>{customers[id].landmark}</td>
                            {/* <td>{id}</td> */}
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

        <div className="col-xl-12">
          <AddressModal
            isOpen={addressModal}
            toggleModal={handleAddressModalState}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerList;
