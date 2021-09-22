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
  const [filterCategory, setFilterCategory] = useState("ALL");

  const filteredProduct = (productList, searchTerm) => {
    if (!searchTerm) {
      return productList;
    }

    return Object.keys(productList)
      .filter((productId) =>
        productList[productId].productName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .reduce((res, key) => ((res[key] = productList[key]), res), {});
  };

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

  /// filter product list based on category
  useEffect(() => {}, [filterCategory]);

  const handleFilterCategory = (category) => {
    setFilterCategory(category);
    setCurrentId("");
    if (productList) {
      var filteredProduct = Object.keys(productList)
        .filter(
          (productId) =>
            productList[productId].category.toUpperCase() === category
        )
        .reduce((res, key) => ((res[key] = productList[key]), res), {});
    }
  };

  const filteredProductByCategory = (productList, category) => {
    if (category === "ALL") {
      return productList;
    }
    return Object.keys(productList)
      .filter(
        (productId) =>
          productList[productId].category.toUpperCase() === category
      )
      .reduce((res, key) => ((res[key] = productList[key]), res), {});
    console.log("filteredProductByCategory", productList);
  };

  const categoryBadge = (category) => {
    if (category) {
      switch (category) {
        // Product category
        case "BEST SELLER":
          return <Badge variant="info light">{category.toUpperCase()}</Badge>;
        case "FRUITS":
          return (
            <Badge variant="secondary light">{category.toUpperCase()}</Badge>
          );
        case "CONDIMENTS":
          return (
            <Badge variant="warning light">{category.toUpperCase()}</Badge>
          );
        case "ASSORTED":
          return (
            <Badge variant="success light">{category.toUpperCase()}</Badge>
          );
        case "SWEETENER":
          return (
            <Badge variant="primary light">{category.toUpperCase()}</Badge>
          );
        case "VEGETABLES":
          return <Badge variant="danger light">{category.toUpperCase()}</Badge>;
        default:
          return <Badge variant="dark light">{category.toUpperCase()}</Badge>;
      }
    }
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
                    <Card.Title>
                      My Products
                      <Dropdown>
                        <Dropdown.Toggle variant="" size="m" className="mt-1">
                          {categoryBadge(filterCategory)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onSelect={() => handleFilterCategory("ALL")}
                          >
                            {categoryBadge("ALL")}
                          </Dropdown.Item>{" "}
                          <Dropdown.Item
                            onSelect={() => handleFilterCategory("BEST SELLER")}
                          >
                            {categoryBadge("BEST SELLER")}
                          </Dropdown.Item>{" "}
                          <Dropdown.Item
                            onSelect={() => handleFilterCategory("FRUITS")}
                          >
                            {categoryBadge("FRUITS")}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onSelect={() => handleFilterCategory("CONDIMENTS")}
                          >
                            {categoryBadge("CONDIMENTS")}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onSelect={() => handleFilterCategory("ASSORTED")}
                          >
                            {categoryBadge("ASSORTED")}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onSelect={() => handleFilterCategory("SWEETENER")}
                          >
                            {categoryBadge("SWEETENER")}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onSelect={() => handleFilterCategory("VEGETABLES")}
                          >
                            {categoryBadge("VEGETABLES")}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Card.Title>
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
                        {Object.keys(
                          filteredProduct(productList, searchTerm),
                          filteredProductByCategory(productList, filterCategory)
                        ).map((id) => {
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
