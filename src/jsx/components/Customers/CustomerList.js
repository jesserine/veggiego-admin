import React, { Fragment } from "react";
import PageTitle from "../../layouts/PageTitle";
import {
   Row,
   Col,
   Card,
   Table,
   Badge,
   Dropdown,
   ProgressBar,
} from "react-bootstrap";

/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import { Link } from "react-router-dom";

const CustomerList = () => {
   const svg1 = (
      <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
         <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect x="0" y="0" width="24" height="24"></rect>
            <circle fill="#000000" cx="5" cy="12" r="2"></circle>
            <circle fill="#000000" cx="12" cy="12" r="2"></circle>
            <circle fill="#000000" cx="19" cy="12" r="2"></circle>
         </g>
      </svg>
   );

   return (
      <Fragment>
         {/* <PageTitle activeMenu="Table" motherMenu="Bootstrap" /> */}
         <Row>
            <Col lg={12}>
               <Card>
                  <Card.Header>
                     <Card.Title>My Customers</Card.Title>
                  </Card.Header>
                  <Card.Body>
                     <Table responsive>
                        <thead>
                           <tr>
                              <th className="width80">
                                 <strong>CUSTOMER NUMBER</strong>
                              </th>
                              <th>
                                 <strong>NAME</strong>
                              </th>
                              <th>
                                 <strong>CONTACT NUMBER</strong>
                              </th>
                              <th>
                                 <strong>CUSTOMER SINCE</strong>
                              </th>
                              <th>
                                 <strong>STATUS</strong>
                              </th>
                              <th></th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td>
                                 <strong>01</strong>
                              </td>
                              <td>Mr. Bobby</td>
                              <td>Dr. Jackson</td>
                              <td>01 August 2020</td>
                              <td>
                                 <Badge variant="success light">
                                    Successful
                                 </Badge>
                              </td>
                              <td>
                                 <Dropdown>
                                    <Dropdown.Toggle
                                       variant="success"
                                       className="light sharp icon-false"
                                    >
                                       {svg1}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                       <Dropdown.Item>Edit</Dropdown.Item>
                                       <Dropdown.Item>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                 </Dropdown>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <strong>02</strong>
                              </td>
                              <td>Mr. Bobby</td>
                              <td>Dr. Jackson</td>
                              <td>01 August 2020</td>
                              <td>
                                 <Badge variant="danger light">Canceled</Badge>
                              </td>
                              <td>
                                 <Dropdown>
                                    <Dropdown.Toggle
                                       variant="danger"
                                       className="light sharp icon-false"
                                    >
                                       {svg1}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                       <Dropdown.Item>Edit</Dropdown.Item>
                                       <Dropdown.Item>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                 </Dropdown>
                              </td>
                           </tr>
                           <tr>
                              <td>
                                 <strong>03</strong>
                              </td>
                              <td>Mr. Bobby</td>
                              <td>Dr. Jackson</td>
                              <td>01 August 2020</td>
                              <td>
                                 <Badge variant="warning light">Pending</Badge>
                              </td>
                              <td>
                                 <Dropdown>
                                    <Dropdown.Toggle
                                       variant="warning"
                                       className="light sharp icon-false"
                                    >
                                       {svg1}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                       <Dropdown.Item>Edit</Dropdown.Item>
                                       <Dropdown.Item>Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                 </Dropdown>
                              </td>
                           </tr>
                        </tbody>
                     </Table>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Fragment>
   );
};

export default CustomerList;
