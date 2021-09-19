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

import ProductsForm from "./ProductsForm";

const ProductsList = () => {
  /// Get product list from context provider
  const { productList } = useDataContext();

  var [currentId, setCurrentId] = useState("");
  var [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.length > 0) {
      //rewrite search function
    }
  }, [searchTerm]);

  const addOrEdit = (obj) => {
    console.log("inside addOrEdit");
    if (currentId === "") {
      swal("Nice!", "A product is added!", "success");
      firebaseDb.ref("products/").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    } else {
      swal("Nice!", "This product is updated!", "success");
      firebaseDb.ref(`products/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  const onDelete = (key) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        firebaseDb.ref(`products/${key}`).remove((err) => {
          if (err) console.log(err);
          else setCurrentId("");
        });
        swal("Poof! This product has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your product is safe!");
      }
    });
  };

  return (
    <Fragment>
      {productList && (
        <div className="row">
          <div className="col-xl-4 col-lg-4">
            <ProductsForm {...{ addOrEdit, currentId, productList }} />
          </div>
          <div className="col-xl-8 col-lg-8">
            <Row>
              <Col lg={12}>
                <Card>
                  <Card.Header>
                    <Card.Title>My Products</Card.Title>
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
                            placeholder="Search Product name"
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
                            <strong>PRODUCT NAME</strong>
                          </th>
                          <th>
                            <strong>CATEGORY</strong>
                          </th>
                          <th>
                            <strong>UNIT</strong>
                          </th>
                          <th>
                            <strong>PRICE</strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(productList).map((id) => {
                          return (
                            <tr
                              key={id}
                              onClick={() => {
                                setCurrentId(id);
                              }}
                            >
                              <td>
                                <img
                                  src={productList[id].productImage}
                                  className="rounded-lg mr-2"
                                  width="24"
                                  alt=""
                                />
                                <span>{productList[id].productName}</span>
                              </td>
                              <td>{productList[id].category}</td>
                              <td>{productList[id].unit}</td>
                              <td>{productList[id].price}</td>
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
      )}
    </Fragment>
  );
};

export default ProductsList;
