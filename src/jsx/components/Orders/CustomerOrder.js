import React, { Fragment, useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import firebaseDb from "../../../firebase";
import swal from "sweetalert";
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
import { Link, useLocation } from "react-router-dom";
import OrdersForm from "./OrdersForm";

const CustomerOrder = () => {
   var [orderObjects, setOrderObjects] = useState({});
   var [currentId, setCurrentId] = useState("");
   const location = useLocation();
   const { user, userId } = location.state;
   var [userOrder, setUserOrder] = useState({});

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
      firebaseDb.ref("orders/").on("value", (snapshot) => {
         if (snapshot.val() != null)
            setOrderObjects({
               ...snapshot.val(),
            });
         else setOrderObjects({});
      });
   }, []);

   const addOrEdit = (obj) => {
      if (currentId === "") {
         swal("Nice!", "A new customer profile is added!", "success");
         firebaseDb.ref("customer/").push(obj, (err) => {
            if (err) console.log(err);
            else setCurrentId("");
         });
      } else {
         swal("Nice!", "This customer profile is updated!", "success");
         firebaseDb.ref(`customer/${currentId}`).set(obj, (err) => {
            if (err) console.log(err);
            else setCurrentId("");
         });
      }
   };

   return (
      <Fragment>
         {/* <p>{JSON.stringify(user)}</p>
         <p>{JSON.stringify(userId)}</p> */}
         <div className="row">
            <div className="col-xl-12 col-lg-12">
               <div className="card">
                  <div className="card-header">
                     <h4 className="card-title">Customer Info</h4>
                  </div>
                  <div className="card-body">
                     <div className="basic-form">
                        <div className="row">
                           <div className="col-lg-3 mb-1">
                              <div className="form-group">
                                 <h4 className="col-sm-12 col-form-label">
                                    Name
                                 </h4>
                                 <div className="col-sm-12">
                                    <input
                                       type="text"
                                       readOnly
                                       className="form-control-plaintext"
                                       value={user.name}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className="col-lg-3 mb-1">
                              <div className="form-group">
                                 <h4 className="col-sm-12 col-form-label">
                                    Contact Number
                                 </h4>
                                 <div className="col-sm-12">
                                    <input
                                       type="text"
                                       readOnly
                                       className="form-control-plaintext"
                                       value={user.contactNumber}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className="col-lg-3 mb-1">
                              <div className="form-group">
                                 <h4 className="col-sm-12 col-form-label">
                                    Address
                                 </h4>
                                 <div className="col-sm-12">
                                    <input
                                       type="text"
                                       readOnly
                                       className="form-control-plaintext"
                                       value={user.address}
                                    />
                                 </div>
                              </div>
                           </div>
                           <div className="col-lg-3 mb-1">
                              <div className="form-group">
                                 <h4 className="col-sm-12 col-form-label">
                                    Landmark
                                 </h4>
                                 <div className="col-sm-12">
                                    <input
                                       type="text"
                                       readOnly
                                       className="form-control-plaintext"
                                       value={user.currentId}
                                    />
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-lg-6 mb-1">
                              <div className="form-group">
                                 <h4 className="col-sm-3 col-form-label">
                                    House Picture
                                 </h4>
                                 <div className="col-sm-6">
                                    <img
                                       src={[user.housePicture]}
                                       className="rounded-lg mr-2"
                                       width="250"
                                       alt=""
                                    />
                                 </div>
                              </div>
                           </div></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12">
               <OrdersForm {...{ addOrEdit, currentId, orderObjects, user, userId }} />
            </div>
            {/* <div className="col-xl-8 col-lg-8">
               <Row>

               </Row>
            </div> */}
         </div>
      </Fragment>
   );
};

export default CustomerOrder;