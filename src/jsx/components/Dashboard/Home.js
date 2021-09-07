import React, { Fragment, useState, useEffect } from "react";
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
import firebaseDb from "../../../firebase";

import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

const Home = () => {
  const ApexNagetivePosative3 = loadable(() =>
    pMinDelay(import("../charts/apexcharts/NagetivePositive3"), 500)
  );
  const ApexRedialBar2 = loadable(() =>
    pMinDelay(import("../charts/apexcharts/RadialBar2"), 500)
  );
  const LineChart7 = loadable(() =>
    pMinDelay(import("../charts/Chartjs/line7"), 0)
  );

  const initialOrderValues = {
    products: "",
    notes: "",
    total: 0,
    grandTotal: 0,
    rider: "",
    deliveryLocation: "",
    deliveryFee: 0,
    dateOfDelivery: new Date().toLocaleString(),
    customer: "",
    customerId: "",
    dateAdded: new Date().toLocaleString(),
    status: "ACTIVE",
  };

  const [orderValues, setOrderValues] = useState(initialOrderValues);
  const [todaysOrder, setTodaysOrder] = useState([]);
  // retrieves all orders in firebase
  useEffect(() => {
    firebaseDb.ref("orders/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setOrderValues({
          ...snapshot.val(),
        });
      else setOrderValues({});
    });
  }, []);

  // Sets the count of active, processing, in transit, and delivered orders
  const [activeOrder, setActiveOrder] = useState(0);
  const [processingOrder, setProcessingOrder] = useState(0);
  const [inTransitOrder, setInTransitOrder] = useState(0);
  const [deliveredOrder, setDeliveredOrder] = useState(0);
  useEffect(() => {
    // console.log("orderValues, ", orderValues);
    if (orderValues) {
      Object.keys(orderValues).map((id) => {
        if (orderValues[id] && orderValues[id].status) {
          // console.log("orderValues with ID, ", orderValues[id]);
          switch (orderValues[id].status.toUpperCase()) {
            case "ACTIVE":
              console.log("active!");
              setActiveOrder(Number(activeOrder) + 1);
              break;
            case "IN ACTIVE":
              console.log("inactive!");
              break;
            case "PROCESSING":
              console.log("processing!");
              setProcessingOrder(Number(processingOrder) + 1);
              break;
            case "IN TRANSIT":
              console.log("in transit!");
              setInTransitOrder(Number(inTransitOrder) + 1);
              break;
            case "DELIVERED":
              console.log("delivered!");
              setDeliveredOrder(Number(deliveredOrder) + 1);
              break;
          }
        }
      });
    }
  }, []);

  //sets the values for today's orders
  const dateToday = new Date().toLocaleDateString();
  console.log("date today", dateToday);
  useEffect(() => {
    if (orderValues) {
      Object.keys(orderValues).map((id) => {
        if (
          orderValues[id].dateOfDelivery &&
          dateToday ===
            new Date(orderValues[id].dateOfDelivery).toLocaleDateString()
        ) {
          console.log(
            "orderValues - delivery date, ",
            new Date(orderValues[id].dateOfDelivery).toLocaleDateString()
          );
          setTodaysOrder((prev) => [...prev, orderValues[id]]);
          // setTodaysOrder((prev) => [...prev, orderValues[id]]);
          console.log("todays orders: ", todaysOrder);
        }
      });
    }
  }, []);

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
                        {activeOrder}
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
                        {processingOrder}
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
                        {inTransitOrder}
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
                        {deliveredOrder}
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
                        <th scope="col">ORDER NUMBER</th>
                        <th scope="col">CUSTOMER NAME</th>
                        <th scope="col">TOTAL PRICE</th>
                        <th scope="col">TIME OF DELIVERY</th>
                        <th scope="col">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>1</th>
                        <td>Jesserine Lopez</td>
                        <td>₱100</td>
                        <td>1:00</td>
                        <td>
                          <Badge variant="primary light">ACTIVE</Badge>
                        </td>
                      </tr>
                      <tr>
                        <th>2</th>
                        <td>Nicolas Chiong</td>
                        <td>₱100</td>
                        <td>1:00</td>
                        <td>
                          <Badge variant="success light">PROCESSING</Badge>
                        </td>
                      </tr>
                      <tr>
                        <th>3</th>
                        <td>Manny Pacquiao</td>
                        <td>₱100</td>
                        <td>1:00</td>
                        <td>
                          <Badge variant="success light">PROCESSING</Badge>
                        </td>
                      </tr>
                      <tr>
                        <th>4</th>
                        <td>Leni Duterte</td>
                        <td>₱100</td>
                        <td>1:00</td>
                        <td>
                          <Badge variant="warning light">FOR DELIVERY</Badge>
                        </td>
                      </tr>
                      <tr>
                        <th>5</th>
                        <td>Olivia Robredo</td>
                        <td>₱100</td>
                        <td>1:00</td>
                        <td>
                          <Badge variant="info light">IN TRANSIT</Badge>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </div>
        </div>
        <div className="col-lg-6 col-xxl-12">
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
        </div>
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
                      <Dropdown.Item className="text-black" to="/">
                        Info
                      </Dropdown.Item>
                      <Dropdown.Item className="text-black" to="/">
                        Details
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="card-body">
                  <div>
                    <div className="d-flex align-items-center pb-3 mb-3 border-bottom">
                      <i className="las la-carrot gs-icon bgl-primary text-primary mr-3" />
                      <span className="text-black fs-15 font-w400">
                        Prepare the following products tomorrow
                      </span>
                    </div>
                    <div className="fs-14 mb-4">
                      <ul className="d-flex justify-content-between pb-2">
                        <li className="font-w500 text-dark">Carrots</li>
                        <li>3 kg</li>
                      </ul>
                      <ul className="d-flex justify-content-between pb-2">
                        <li className="font-w500 text-dark">Brocolli</li>
                        <li>5 kg</li>
                      </ul>
                      <ul className="d-flex justify-content-between pb-2">
                        <li className="font-w500 text-dark">Garlic</li>
                        <li>2 kg</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-footer pt-0 border-0 text-center">
                  <Link to="/social-network-campaign" className="text-primary">
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
};

export default Home;
