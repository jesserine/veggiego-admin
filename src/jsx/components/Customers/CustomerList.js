import React, { Fragment, useState, useEffect } from "react";
import PageTitle from "../../layouts/PageTitle";
import firebaseDb from '../../../firebase'
import { storage } from '../../../firebase'
import { v4 as uuid } from 'uuid'
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
import CustomerForm from "./CustomerForm";

const CustomerList = () => {
   var [contactObjects, setContactObjects] = useState({})
   var [currentId, setCurrentId] = useState('')

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

   useEffect(() => {
     firebaseDb.ref('customer/').on('value', (snapshot) => {
       if (snapshot.val() != null)
         setContactObjects({
           ...snapshot.val(),
         })
       else setContactObjects({})
     })
   }, [])
 
   const addOrEdit = (obj) => {
      console.log("inside addOrEdit")
     if (currentId == '')
       firebaseDb.ref('customer/').push(obj, (err) => {
         if (err) console.log(err)
         else setCurrentId('')
       })
     else
       firebaseDb.ref(`customer/${currentId}`).set(obj, (err) => {
         if (err) console.log(err)
         else setCurrentId('')
       })
   }
 
   const onDelete = (key) => {
     if (window.confirm('Are you sure to delete this record?')) {
       firebaseDb.ref(`customer/${key}`).remove((err) => {
         if (err) console.log(err)
         else setCurrentId('')
       })
     }
   }

   return (
      <Fragment>
         {/* <PageTitle activeMenu="Table" motherMenu="Bootstrap" /> */}
         <CustomerForm {...{ addOrEdit, currentId, contactObjects }}/>
         <Row>
            <Col lg={12}>
               <Card>
                  <Card.Header>
                     <Card.Title>My Customers</Card.Title>
                     <div className="search_bar dropdown show">
                        <div className="dropdown-menushow">
                           <form onSubmit={(e) => e.preventDefault()}>
                              <input
                                 className="form-control"
                                 type="search"
                                 placeholder="Search Here"
                                 aria-label="Search"
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
                  </Card.Header>
                  <Card.Body>
                     <Table responsive>
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
                           {Object.keys(contactObjects).map((id) => {
                              return (
                                 <tr key={id}>
                                    <td>{contactObjects[id].name}</td>
                                    <td>{contactObjects[id].contactNumber}</td>
                                    <td>{contactObjects[id].address}</td>
                                    <td>{contactObjects[id].landmark}</td>
                                    <td>{contactObjects[id].dateJoined}</td>
                                    <td>{contactObjects[id].isActive=== '0'
                                       ? <Badge variant="danger light"> Inactive </Badge>
                                       : <Badge variant="success light"> Active </Badge>}</td>
                                    <td>
                                       <Dropdown>
                                          <Dropdown.Toggle
                                             className="light sharp icon-false"
                                          >
                                             {svg1}
                                          </Dropdown.Toggle>
                                          <Dropdown.Menu>
                                             <Dropdown.Item onClick={() => { setCurrentId(id) }}>
                                                Edit</Dropdown.Item>
                                             <Dropdown.Item onClick={() => { onDelete(id) }}>
                                                Delete</Dropdown.Item>
                                          </Dropdown.Menu>
                                       </Dropdown>
                                    </td>
                                    <td>
                                       <div className="d-flex">
                                          <Link
                                             to="/customers"
                                             onClick={() => { setCurrentId(id); window.scrollTo(0, 0); }}
                                             className="btn btn-primary shadow btn-xs sharp mr-1"
                                          >
                                             <i className="fa fa-pencil"></i>
                                          </Link>
                                          <Link
                                             to="/customers"
                                             onClick={() => { onDelete(id) }}
                                             className="btn btn-danger shadow btn-xs sharp"
                                          >
                                             <i className="fa fa-trash"></i>
                                          </Link>
                                       </div>
                                    </td>
                                 </tr>
                              )
                           })}
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
