import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDb from "../../../firebase";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import bg5 from "../../../images/big/customer-header.jpg";
import { SplitButton, Row, Modal, Button } from "react-bootstrap";

const AddRiderToOrderForm = (props) => {
  const initialOrderFieldValues = {
    products: [],
    notes: "",
    total: 0,
    rider: "",
    deliveryLocation: "",
    deliveryFee: 0,
    dateOfDelivery: new Date().toLocaleString(),
    customer: "",
    customerId: "",
    dateAdded: new Date().toLocaleString(),
    status: "",
    grandTotal: 0,
  };

  var [values, setValues] = useState(initialOrderFieldValues);
  var [orderValues, setOrderValues] = useState({});
  var [currentId, setCurrentId] = useState("");
  var [riderValues, setRiderValues] = useState({});

  const [viewMode, setViewMode] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const selectedId = props.currentId;

  useEffect(() => {
    firebaseDb.ref("riders/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setRiderValues({
          ...snapshot.val(),
        });
      else setRiderValues({});
    });
  }, []);

  useEffect(() => {
    if (props.currentId === "") {
      setViewMode(false);
      setValues({
        ...initialOrderFieldValues,
      });
    } else {
      setViewMode(true);
      setValues({
        ...props.orderValues[props.currentId],
      });
    }
  }, [props.currentId, props.orderValues]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
    window.location.reload(false);
  };

  const readImages = async (e) => {
    const file = e.target.files[0];
    const id = uuid();
    const imagesRef = storage.ref("customer/house").child(id);

    await imagesRef.put(file);
    imagesRef.getDownloadURL().then((url) => {
      setImageUrl(url);
    });
  };

  if (typeof imageUrl !== "undefined" && imageUrl != null) {
    values.housePicture = imageUrl;
  }

  return (
    <Fragment>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              {" "}
              <h4>
                <strong>Invoice</strong> {props.currentId}{" "}
              </h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-6 col-sm-6 mb-4">
                  <h5>Customer:</h5>
                  <div>
                    {" "}
                    <strong>{values.customer.name}</strong>{" "}
                  </div>
                  <div>Phone: {values.customer.contactNumber}</div>
                  <div>Address: {values.customer.address}</div>
                  <div>Landmark: {values.customer.landmark}</div>
                </div>
                <div className="col-xl-6 col-sm-6 mb-4">
                  <h5>Date of Delivery:</h5>
                  <div>
                    {" "}
                    <strong>{values.dateOfDelivery}</strong>{" "}
                  </div>
                  <br />
                  <h5>Status:</h5>
                  <div>
                    {" "}
                    <strong>{values.status}</strong>{" "}
                  </div>
                </div>
              </div>
              <br />
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="center">#</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th className="right">Price</th>
                      <th className="center">Discount</th>
                      <th className="right">SubTotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.products &&
                      values.products.map((product, index) => (
                        <tr>
                          <td className="center">
                            {Number(index) + Number(1)}
                          </td>
                          <td className="left strong">
                            {product.value.productName}
                          </td>
                          <td className="left">{product.value.productQty}</td>
                          <td className="left">{product.value.productUnit}</td>
                          <td className="right">
                            P {product.value.productPrice}
                          </td>
                          <td className="center">{product.value.discount} %</td>
                          <td className="right">
                            P {product.value.subtotal && product.value.subtotal}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-5"> </div>
                <div className="col-lg-4 col-sm-5 ml-auto">
                  <table className="table table-clear">
                    <tbody>
                      <tr>
                        <td className="left">
                          <strong>Total</strong>
                        </td>
                        <td className="right">P{values.total}</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Delivery Fee</strong>
                        </td>
                        <td className="right">P{values.deliveryFee}</td>
                      </tr>
                      <tr>
                        <td className="left">
                          <strong>Grand Total</strong>
                        </td>
                        <td className="right">
                          <strong>P{values.grandTotal}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <br />
              <div className="col-xl-12 col-sm-6 mb-4">
                <h5>Notes:</h5>
                <div>test notes {values.notes}</div>
              </div>
              <div className="col-xl-12 col-sm-6 mb-4">
                <h5>Rider:</h5>
                <div>
                  {" "}
                  <strong>Webz Rider</strong>{" "}
                </div>
                <div>Phone: +91 987 654 3210</div>
                <div>Address: Madalinskiego 8</div>
                <div>
                  Landmark: 71-101 Szczecin, Poland 71-101 Szczecin, Poland
                  71-101 Szczecin, Poland
                </div>
              </div>
              <div className="col-xl-12 col-sm-6 mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddRiderToOrderForm;
