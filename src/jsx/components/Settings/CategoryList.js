import React, { Fragment, useState, useEffect } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import firebaseDb from "../../../firebase";
import swal from "sweetalert";
import { Row, Col, Card, Table, Badge, Button } from "react-bootstrap";

import CategoryForm from "./CategoryForm";

const CategoryList = () => {
  const { categoryList, setCategoryList } = useDataContext();
  // var [categoryObjects, setCategoryObjects] = useState({});
  var [currentId, setCurrentId] = useState("");
  var [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   firebaseDb.ref("category/").on("value", (snapshot) => {
  //     if (snapshot.val() != null)
  //       setCategoryObjects({
  //         ...snapshot.val(),
  //       });
  //     else setCategoryObjects({});
  //   });
  // }, []);

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

  const filteredCategory = (categoryList, searchTerm) => {
    if (!searchTerm) {
      return categoryList;
    }
    return Object.keys(categoryList)
      .filter((id) =>
        categoryList[id].categoryName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .reduce((res, key) => ((res[key] = categoryList[key]), res), {});
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
              {...{ addOrEdit, currentId, setCurrentId, categoryList }}
            />
          </div>

          <Row>
            <Col lg={12}>
              <Card>
                <Card.Header>
                  <Card.Title>Product Categories</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="search_bar dropdown show mb-3">
                    <div className="dropdown-menushow">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Search Category"
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
                      {Object.keys(
                        filteredCategory(categoryList, searchTerm)
                      ).map((id) => {
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
                            <td>{categoryList[id].categoryName}</td>
                            <td>
                              {!categoryList[id].isActive ? (
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
