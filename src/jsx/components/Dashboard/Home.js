import React, { Fragment, useState, useEffect } from "react";
import { useDataContext } from "../../../contexts/DataContext";

import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
  Nav,
  Tab,
} from "react-bootstrap";

const Home = () => {
  const { orderList, productList } = useDataContext();

  const [todaysOrder, setTodaysOrder] = useState([]);
  const [preorderProducts, setPreorderProducts] = useState([]);

  // counts active, processing, in transit, and delivered orders
  const countByStatus = (orderList, status) => {
    return Object.keys(orderList).filter(
      (orderId) => orderList[orderId].status === status
    ).length;
  };

  //Sets the values for today's orders
  const dateToday = new Date().toLocaleDateString();
  // console.log("date today", dateToday);
  useEffect(() => {
    if (orderList) {
      Object.keys(orderList).map((id) => {
        if (
          new Date(dateToday).toLocaleDateString() ===
          new Date(orderList[id].dateOfDelivery).toLocaleDateString()
        ) {
          console.log(
            "orderValues - delivery date, ",
            new Date(orderList[id].dateOfDelivery).toLocaleDateString()
          );
          setTodaysOrder((prev) => [...prev, orderList[id]]);
          // setTodaysOrder((prev) => [...prev, orderValues[id]]);
          console.log("todays orders: ", todaysOrder);
        }
      });
    }
  }, [orderList]);

  //Sets the values for pre-ordered products
  var current = new Date();
  const dateTomorrow = new Date(current.getTime() + 86400000);
  dateTomorrow.toLocaleDateString();
  // console.log("Date Tomorrow", dateTomorrow.toLocaleDateString());
  useEffect(() => {
    if (orderList) {
      Object.keys(orderList).map((id) => {
        if (
          new Date(dateTomorrow).toLocaleDateString() ===
          new Date(orderList[id].dateOfDelivery).toLocaleDateString()
        ) {
          console.log("orderValues - preorder, ", orderList);
          orderList[id].products.map((value, index) => {
            setPreorderProducts((prev) => [...prev, value]);
            console.log("orderValues - product ", preorderProducts);
          });
        }
      });
    }
  }, [orderList]);

  //Sets the status Badge
  const statusBadge = (status) => {
    switch (status) {
      case "PREORDER":
        return <Badge variant="info light">{status.toUpperCase()}</Badge>;
      case "ACTIVE":
        return <Badge variant="info light">{status.toUpperCase()}</Badge>;
      case "PROCESSING":
        return <Badge variant="secondary light">{status.toUpperCase()}</Badge>;
      case "FOR DELIVERY":
        return <Badge variant="warning light">{status.toUpperCase()}</Badge>;
      case "IN TRANSIT":
        return <Badge variant="success light">{status.toUpperCase()}</Badge>;
      case "DELIVERED":
        return <Badge variant="primary light">{status.toUpperCase()}</Badge>;
      case "CANCELLED":
        return <Badge variant="danger light">{status.toUpperCase()}</Badge>;
      default:
        return <Badge variant="dark light">{status.toUpperCase()}</Badge>;
    }
  };

  if (orderList !== null) {
    return (
      <>
        <div className="form-head d-flex mb-0 mb-lg-4 align-items-start">
          <div className="mr-auto d-none d-lg-block">
            <h2 className="text-black font-w600 mb-1">Dashboard</h2>
            <p className="mb-0">Welcome to Veggie Go Admin Dashboard</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xxl-12">
            <div className="row">
              <div className="col-lg-3 col-sm-12 col-md-6 ">
                <div className="card widget-stat ">
                  <div className="card-body p-4">
                    <div className="media align-items-center">
                      <div className="media-body">
                        <p className="fs-18 mb-2 wspace-no">Active Orders</p>
                        <h1 className="fs-36 font-w600 text-black mb-0">
                          {countByStatus(orderList, "ACTIVE")}
                        </h1>
                      </div>
                      <span className="ml-3 bg-primary text-white">
                        <i className="flaticon-381-promotion" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-12 col-md-6 ">
                <div className="card widget-stat">
                  <div className="card-body p-4">
                    <div className="media align-items-center">
                      <div className="media-body">
                        <p className="fs-18 mb-2 wspace-no">Processing</p>
                        <h1 className="fs-36 font-w600 d-flex align-items-center text-black mb-0">
                          {countByStatus(orderList, "PROCESSING")}
                        </h1>
                      </div>
                      <span className="ml-3 bg-warning text-white">
                        <i className="las la-sync scale4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-12 col-md-6 ">
                <div className="card widget-stat">
                  <div className="card-body p-4">
                    <div className="media align-items-center">
                      <div className="media-body">
                        <p className="fs-18 mb-2 wspace-no">In Transit</p>
                        <h1 className="fs-36 font-w600 d-flex align-items-center text-black mb-0">
                          {countByStatus(orderList, "IN TRANSIT")}
                        </h1>
                      </div>
                      <span className="ml-3 bg-warning text-white">
                        <i className="las la-biking scale4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-12 col-md-6 ">
                <div className="card widget-stat">
                  <div className="card-body p-4">
                    <div className="media align-items-center">
                      <div className="media-body">
                        <p className="fs-18 mb-2 wspace-no">Delivered</p>
                        <h1 className="fs-36 font-w600 d-flex align-items-center text-black mb-0">
                          {countByStatus(orderList, "DELIVERED")}
                        </h1>
                      </div>
                      <span className="ml-3 bg-primary text-white">
                        <i className="las la-box scale4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Col lg={12}>
                <Card>
                  <Card.Header>
                    <Card.Title>Today's Orders</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Table
                      responsive
                      hover
                      className="header-border verticle-middle"
                    >
                      <thead>
                        <tr>
                          <th scope="col">CUSTOMER NAME</th>
                          <th scope="col">TOTAL PRICE</th>
                          <th scope="col">TIME OF DELIVERY</th>
                          <th scope="col">ASSIGNED RIDER</th>
                          <th scope="col">STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(todaysOrder).map((orderId) => {
                          return (
                            <tr key={orderId}>
                              <td>{todaysOrder[orderId].customer.name}</td>
                              <td>{todaysOrder[orderId].grandTotal}</td>
                              <td>{todaysOrder[orderId].dateOfDelivery}</td>
                              <td>
                                {todaysOrder[orderId].rider
                                  ? todaysOrder[orderId].rider.riderName
                                  : "Not Assigned"}
                              </td>
                              <td>
                                {statusBadge(todaysOrder[orderId].status)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          </div>

          {/* My Sales PART */}
          {/* <div className="col-lg-6 col-xxl-6">
          <div className="card" id="user-activity">
            <Tab.Container defaultActiveKey="monthly">
              <div className="card-header pb-0 d-block d-sm-flex border-0">
                <h3 className="fs-20 text-black mb-0">My Sales</h3>
                <div className="card-action card-tabs mt-3 mt-sm-0">
                  <Nav as="ul" className="nav nav-tabs" role="tablist">
                    <Nav.Item as="li" className="nav-item">
                      <Nav.Link
                        className="nav-link"
                        eventKey="monthly"
                        role="tab"
                      >
                        Monthly
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="nav-item">
                      <Nav.Link
                        className="nav-link"
                        eventKey="weekly"
                        role="tab"
                      >
                        Weekly
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>
              </div>
              <div className="card-body">
                <Tab.Content className="tab-content" id="myTabContent">
                  <Tab.Pane eventKey="monthly">
                    <div style={{ height: "300px" }}>
                      <LineChart7 data={0} height="300" />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="weekly">
                    <div style={{ height: "300px" }}>
                      <LineChart7 data={1} height="300" />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="today">
                    <div style={{ height: "300px" }}>
                      <LineChart7 data={2} height="300" />
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Tab.Container>
          </div>
        </div> */}
          <div className="col-lg-6 col-xxl-12">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-header border-0  pb-0">
                    <h3 className="fs-20 text-black mb-0">Preorder Summary</h3>
                    <Dropdown className="dropdown ml-auto">
                      <Dropdown.Toggle
                        variant=""
                        className="btn-link icon-false p-0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          version="1.1"
                        >
                          <g
                            stroke="none"
                            strokeWidth={1}
                            fill="none"
                            fillRule="evenodd"
                          >
                            <rect x={0} y={0} width={24} height={24} />
                            <circle fill="#000000" cx={12} cy={5} r={2} />
                            <circle fill="#000000" cx={12} cy={12} r={2} />
                            <circle fill="#000000" cx={12} cy={19} r={2} />
                          </g>
                        </svg>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-right">
                        {/* {Object.keys(productValues && productValues).map((id) => {
                        return (
                          <Dropdown.Item className="text-black" to="/">
                            {productValues[id].productName}
                          </Dropdown.Item>
                        );
                      })} */}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="d-flex align-items-center pb-3 mb-3 border-bottom">
                        <i className="las la-carrot gs-icon bgl-primary text-primary mr-3" />
                        <span className="text-black fs-15 font-w400">
                          Prepare the following products tomorrow (
                          {dateTomorrow.toLocaleDateString()})
                        </span>
                      </div>
                      <div className="fs-14 mb-4">
                        {Object.keys(preorderProducts).map((value, index) => {
                          <ul
                            className="d-flex justify-content-between pb-2"
                            key={index}
                          >
                            <li className="font-w500 text-dark">
                              {value.productName}
                            </li>
                            <li>{value.productQty}</li>
                            <li>{value.productUnit}</li>
                          </ul>;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="card-footer pt-0 border-0 text-center">
                    <Link
                      to="/social-network-campaign"
                      className="text-primary"
                    >
                      See all Next Day Orders
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <h1>Loading...</h1>;
  }
};

export default Home;
