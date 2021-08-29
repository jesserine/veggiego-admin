import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDb from "../../../firebase";
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import swalMessage from "@sweetalert/with-react";
import PerfectScrollbar from "react-perfect-scrollbar";

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



const Settings = () => {

  return (
    <Fragment>
      <div className="form-row col-md-12" >
        <div className="form-group col-md-3 mt-4 mt-6">
          <Link
            to={{
              pathname: "/products-category",
            }}
            className="btn btn-secondary btn-block"
          >
            Category
          </Link>
        </div>
        <div className="form-group col-md-3 mt-4 mt-6">
          <Link
            to={{
              pathname: "/products-unit",
            }}
            className="btn btn-info btn-block"
          >
            Unit
          </Link>
        </div>
        <div className="form-group col-md-3 mt-4 mt-6">
          <Link
            to={{
              pathname: "/orders-deliveryfee",
            }}
            className="btn btn-warning btn-block"
          >
            Delivery Fee
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Settings;
