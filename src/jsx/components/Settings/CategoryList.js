import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from "../../../firebase";
import swal from "sweetalert";
import { Row, Col, Card, Table, Badge, Button } from "react-bootstrap";

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
            <CategoryForm
              {...{ addOrEdit, currentId, setCurrentId, categoryObjects }}
            />
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
                        <th></th>
                        <th>
                          <strong>NAME</strong>
                        </th>
                        <th>
                          <strong>STATUS</strong>
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(categoryObjects).map((id) => {
                        return (
                          <tr key={id}>
                            <td>
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
                            </td>
                            <td>{categoryObjects[id].categoryName}</td>
                            <td>
                              {!categoryObjects[id].isActive ? (
                                <Badge variant="danger light"> INACTIVE </Badge>
                              ) : (
                                <Badge variant="primary light"> ACTIVE </Badge>
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
