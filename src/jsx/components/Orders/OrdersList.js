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
import { Link } from "react-router-dom";
import OrdersForm from "./OrdersForm";

const OrdersList = () => {
   var [orderObjects, setOrderObjects] = useState({});
   var [currentId, setCurrentId] = useState("");
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
      firebaseDb.ref("customer/").on("value", (snapshot) => {
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
         <div className="row">
            <div className="col-xl-4 col-lg-4">
               <OrdersForm {...{ addOrEdit, currentId, orderObjects }} />
            </div>
            <div className="col-xl-8 col-lg-8">
               <Row>


               </Row>
            </div>
         </div>
      </Fragment>
   );
};

export default OrdersList;