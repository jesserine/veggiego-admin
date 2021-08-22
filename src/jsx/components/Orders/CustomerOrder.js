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
import bg5 from "../../../images/big/customer-header.jpg";
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
        <div className="col-xl-4 col-xxl-12 col-lg-12 col-sm-12">
          <div className="card overflow-hidden">
            <div
              className="text-center p-3 overlay-box "
              style={{ backgroundImage: `url(${bg5})` }}
            >
              {/* <div className="profile-photo">
          <img
            src={user.housePicture}
            width={100}
            className="img-fluid rounded-circle"
            alt="profile"
          />
        </div> */}
              <h3 className="mt-3 mb-1 text-white">{user.name}</h3>
              <p className="text-white mb-0">Customer</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between">
                <span className="mb-0">Contact Number</span>{" "}
                <strong className="text-muted"> {user.contactNumber} </strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="mb-0">Address</span>{" "}
                <strong className="text-muted" align="right">
                  {" "}
                  {user.address}{" "}
                </strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span className="mb-0">Landmark</span>{" "}
                <strong className="text-muted">{user.landmark} </strong>
              </li>
            </ul>
            <div className="card-footer border-0 mt-0">
              <button className="btn btn-primary btn-lg btn-block">
                <i className="las la-map-marked" /> Change Delivery Address
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-lg-8">
          <OrdersForm
            {...{ addOrEdit, currentId, orderObjects, user, userId }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerOrder;
