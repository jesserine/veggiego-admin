import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDb from "../../../firebase";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";


const AddRiderToOrderForm = (props) => {
    const initialOrderFieldValues = {
        products: "",
        notes: "",
        total: 0,
        rider: "",
        deliveryLocation: "",
        deliveryFee: 0,
        dateOfDelivery: new Date().toLocaleString(),
        customer: props.user,
        customerId: props.userId,
        dateAdded: new Date().toLocaleString(),
      };

    var [orderValues, setOrderValues] = useState(initialOrderFieldValues);
};

export default AddRiderToOrderForm;
