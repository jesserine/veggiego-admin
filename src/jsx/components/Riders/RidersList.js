import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from '../../../firebase'
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
import RidersForm from "./RidersForm";

const RidersList = () => {
   var [riderObjects, setRiderObjects] = useState({})
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
      firebaseDb.ref('riders/').on('value', (snapshot) => {
        if (snapshot.val() != null)
        setRiderObjects({
            ...snapshot.val(),
          })
        else setRiderObjects({})
      })
    }, [])
  
    const addOrEdit = (obj) => {
       console.log("inside addOrEdit")
      if (currentId == '')
        firebaseDb.ref('riders/').push(obj, (err) => {
          if (err) console.log(err)
          else setCurrentId('')
        })
      else
        firebaseDb.ref(`riders/${currentId}`).set(obj, (err) => {
          if (err) console.log(err)
          else setCurrentId('')
        })
    }
  
    const onDelete = (key) => {
      if (window.confirm('Are you sure to delete this record?')) {
        firebaseDb.ref(`riders/${key}`).remove((err) => {
          if (err) console.log(err)
          else setCurrentId('')
        })
      }
    }

   return (
      <Fragment>
         <Row>
         <div className="row">
            <div className="col-xl-4 col-lg-4">
               <RidersForm {...{ addOrEdit, currentId, riderObjects }}/>
            </div>
            <div className="col-xl-8 col-lg-8">
            <Col lg={12}>
               <Card>
                  <Card.Header>
                     <Card.Title>My Riders</Card.Title>
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
                                 <strong>USERNAME</strong>
                              </th>
                              <th>
                                 <strong>PASSWORD</strong>
                              </th>
                              <th>
                                 <strong>CONTACT #</strong>
                              </th>
                              <th>
                                 <strong>ADDRESS</strong>
                              </th>
                              <th>
                                 <strong>VEHICLE TYPE</strong>
                              </th>
                              <th>
                                 <strong>VEHICLE PLATE #</strong>
                              </th>
                              <th>
                                 <strong>IMAGE</strong>
                              </th>
                              <th>
                                 <strong>DATE ADDED</strong>
                              </th>
                              <th>
                                 <strong>STATUS</strong>
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {Object.keys(riderObjects).map((id) => {
                                    return (
                                       <tr key={id}>
                                          <td>
                                             <div className="d-flex">
                                                <Link
                                                   to="/riders"
                                                   onClick={() => { setCurrentId(id); window.scrollTo(0, 0); }}
                                                   className="btn btn-primary shadow btn-xs sharp mr-1"
                                                >
                                                   <i className="fa fa-pencil"></i>
                                                </Link>
                                                <Link
                                                   to="/riders"
                                                   onClick={() => { onDelete(id) }}
                                                   className="btn btn-danger shadow btn-xs sharp"
                                                >
                                                   <i className="fa fa-trash"></i>
                                                </Link>
                                             </div>
                                          </td>
                                          <td>{riderObjects[id].riderName}</td>
                                          <td>{riderObjects[id].username}</td>
                                          <td>{riderObjects[id].password}</td>
                                          <td>{riderObjects[id].riderContactNum}</td>
                                          <td>{riderObjects[id].riderAddress}</td>
                                          <td>{riderObjects[id].vehicleType}</td>
                                          <td>{riderObjects[id].vehiclePlateNum}</td>
                                          <td>{riderObjects[id].riderImage}</td>
                                          <td>{riderObjects[id].dateAdded}</td>
                                          <td>{riderObjects[id].isActive=== 'false'
                                             ? <Badge variant="danger light"> Inactive </Badge>
                                             : <Badge variant="success light"> Active </Badge>}
                                          </td>
                                       </tr>
                                    )
                                 })}
                        </tbody>
                     </Table>
                  </Card.Body>
               </Card>
            </Col>
            </div>
            </div>
         </Row>
      </Fragment>
   );
};

export default RidersList;
