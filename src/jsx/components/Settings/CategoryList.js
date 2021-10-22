import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from "../../../firebase";
import swal from "sweetalert";
import { Row, Col, Card, Table, Badge } from "react-bootstrap";

import { Link } from "react-router-dom";
import CategoryForm from "./CategoryForm";

const CategoryList = () => {
  var [categoryObjects, setCategoryObjects] = useState({});
  var [currentId, setCurrentId] = useState("");

  useEffect(() => {
    firebaseDb.ref("category/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setCategoryObjects({
          ...snapshot.val(),
        });
      else setCategoryObjects({});
    });
  }, []);

  const addOrEdit = (obj) => {
    console.log("inside addOrEdit");
    if (currentId === "") {
      swal("Nice!", "A new category is added!", "success");
      firebaseDb.ref("category/").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    } else {
      swal("Nice!", "This category is updated!", "success");
      firebaseDb.ref(`category/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  const onDelete = (key) => {
    if (window.confirm("Are you sure to delete this record?")) {
      firebaseDb.ref(`category/${key}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <h2 className="text-black font-w600 mb-1">
            Product Category Settings
          </h2>
          <div className="mt-4">
            <CategoryForm {...{ addOrEdit, currentId, categoryObjects }} />
          </div>

          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Product Categories</Card.Title>
                </Card.Header>
                <Card.Body>
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
                          <strong>DATE ADDDED</strong>
                        </th>
                        <th>
                          <strong>STATUS</strong>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(categoryObjects).map((id) => {
                        return (
                          <tr key={id}>
                            <td>
                              <div className="d-flex">
                                <Link
                                  to="/products-category"
                                  onClick={() => {
                                    setCurrentId(id);
                                    window.scrollTo(0, 0);
                                  }}
                                  className="btn btn-primary shadow btn-xs sharp mr-1"
                                >
                                  <i className="fa fa-pencil"></i>
                                </Link>
                                <Link
                                  to="/products-category"
                                  onClick={() => {
                                    onDelete(id);
                                  }}
                                  className="btn btn-danger shadow btn-xs sharp"
                                >
                                  <i className="fa fa-trash"></i>
                                </Link>
                              </div>
                            </td>
                            <td>{categoryObjects[id].categoryName}</td>
                            <td>{categoryObjects[id].dateAdded}</td>
                            <td>
                              {categoryObjects[id].isActive === "false" ? (
                                <Badge variant="danger light"> Inactive </Badge>
                              ) : (
                                <Badge variant="success light"> Active </Badge>
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

export default CategoryList;
