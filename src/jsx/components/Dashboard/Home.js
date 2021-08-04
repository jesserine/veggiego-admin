import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Nav, Tab } from "react-bootstrap";

import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
const ApexNagetivePosative3 = loadable(() =>
   pMinDelay(import("../charts/apexcharts/NagetivePositive3"), 500)
);
const ApexRedialBar2 = loadable(() =>
   pMinDelay(import("../charts/apexcharts/RadialBar2"), 500)
);
const LineChart7 = loadable(() =>
   pMinDelay(import("../charts/Chartjs/line7"), 0)
);

function Home() {
   return (
      <>
         <div className="form-head d-flex mb-0 mb-lg-4 align-items-start">
            <div className="mr-auto d-none d-lg-block">
               <h2 className="text-black font-w600 mb-1">Dashboard</h2>
               <p className="mb-0">Welcome to Veggie Go Admin Dashboard</p>
            </div>
            <div className="d-none d-lg-flex align-items-center">
               <div className="text-right">
                  <h3 className="fs-20 text-black mb-0">04:00 PM</h3>
                  <span className="fs-14">Wednesday, 4 August 2021</span>
               </div>
               <Link
                  className="ml-4 text-black p-3 rounded border text-center width60"
                  to="/"
               >
                  <i className="las la-cog scale5" />
               </Link> 
            </div>
         </div>
         <div className="row">
            <div className="col-lg-8 col-xxl-12">
               <div className="row">
                  <div className="col-lg-6 col-sm-6">
                     <div className="card widget-stat ">
                        <div className="card-body p-4">
                           <div className="media align-items-center">
                              <div className="media-body">
                                 <p className="fs-18 mb-2 wspace-no">
                                    Active Orders
                                 </p>
                                 <h1 className="fs-36 font-w600 text-black mb-0">
                                    5
                                 </h1>
                              </div>
                              <span className="ml-3 bg-primary text-white">
                                 <i className="flaticon-381-promotion" />
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                     <div className="card widget-stat">
                        <div className="card-body p-4">
                           <div className="media align-items-center">
                              <div className="media-body">
                                 <p className="fs-18 mb-2 wspace-no">
                                    Next Day Orders
                                 </p>
                                 <h1 className="fs-36 font-w600 d-flex align-items-center text-black mb-0">
                                    412,531
                                 </h1>
                              </div>
                              <span className="ml-3 bg-warning text-white">
                                 <i className="flaticon-381-user-7" />
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-12">
                     <div className="card">
                        <div className="card-body d-flex flex-wrap p-0">
                           <div className="col-lg-6 col-sm-6  media spending-bx">
                              <div className="spending-icon mr-4">
                                 <i
                                    className="fa fa-caret-up"
                                    aria-hidden="true"
                                 />
                                 <span className="fs-14">+5%</span>
                              </div>
                              <div className="media-body">
                                 <p className="fs-18 mb-2">Sales Today</p>
                                 <span className="fs-34 font-w600">₱5,245</span>
                              </div>
                           </div>
                           <div className="col-lg-6 col-sm-6 media spending-bx pl-2">
                              <div className="media-body text-right">
                                 <p className="fs-18 mb-2">Sales Yesterday</p>
                                 <span className="fs-34 font-w600">₱4,567</span>
                              </div>
                              <div className="spending-icon ml-4">
                                 <i
                                    className="fa fa-caret-down"
                                    aria-hidden="true"
                                 />
                                 <span className="fs-14">-2%</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-12">
                     <div className="card" id="user-activity">
                        <Tab.Container defaultActiveKey="monthly">
                           <div className="card-header pb-0 d-block d-sm-flex border-0">
                              <h3 className="fs-20 text-black mb-0">
                                 My Sales
                              </h3>
                              <div className="card-action card-tabs mt-3 mt-sm-0">
                                 <Nav
                                    as="ul"
                                    className="nav nav-tabs"
                                    role="tablist"
                                 >
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
                              <Tab.Content
                                 className="tab-content"
                                 id="myTabContent"
                              >
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
                  
               </div>
            </div>
            <div className="col-lg-4 col-xxl-12">
               <div className="row">
                  <div className="col-lg-12 col-md-12">
                     <div className="card">
                        <div className="card-header border-0  pb-0">
                           <h3 className="fs-20 text-black mb-0">
                              Preorder Summary
                           </h3>
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
                                       <rect
                                          x={0}
                                          y={0}
                                          width={24}
                                          height={24}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={5}
                                          r={2}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={12}
                                          r={2}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={19}
                                          r={2}
                                       />
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
                                 <i className="lab la-instagram gs-icon bgl-secondary text-secondary mr-3" />
                                 <span className="text-black fs-16 font-w600">
                                    Instagram
                                 </span>
                              </div>
                              <div className="fs-14 mb-4">
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Ad Campaign
                                    </li>
                                    <li>6,788/8,000</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Comments
                                    </li>
                                    <li>452/800</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Likes
                                    </li>
                                    <li>8,325/10,000</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Bookmarked
                                    </li>
                                    <li>5,622/5,000</li>
                                 </ul>
                              </div>
                           </div>
                           <div>
                              <div className="d-flex align-items-center pb-3 mb-3 border-bottom">
                                 <i className="lab la-facebook-f gs-icon bgl-info text-info mr-3" />
                                 <span className="text-black fs-16 font-w600">
                                    Facebook
                                 </span>
                              </div>
                              <div className="fs-14 mb-4">
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Ad Campaign
                                    </li>
                                    <li>6,788/8,000</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Comments
                                    </li>
                                    <li>452/800</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Likes
                                    </li>
                                    <li>8,325/10,000</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Bookmarked
                                    </li>
                                    <li>5,622/5,000</li>
                                 </ul>
                              </div>
                           </div>
                           <div>
                              <div className="d-flex align-items-center pb-3 mb-3 border-bottom">
                                 <i className="lab la-twitter gs-icon bgl-success text-success mr-3" />
                                 <span className="text-black fs-16 font-w600">
                                    Twitter
                                 </span>
                              </div>
                              <div className="fs-14">
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Ad Campaign
                                    </li>
                                    <li>6,788/8,000</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Comments
                                    </li>
                                    <li>452/800</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Likes
                                    </li>
                                    <li>8,325/10,000</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Bookmarked
                                    </li>
                                    <li>5,622/5,000</li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                        <div className="card-footer pt-0 border-0 text-center">
                           <Link
                              to="/social-network-campaign"
                              className="text-primary"
                           >
                              See More Reviews
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* </div>
        </div>
      </div> */}
      </>
   );
}

export default Home;
