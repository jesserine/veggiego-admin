import React, { Fragment, useState, useEffect } from "react";
import { useDataContext } from "../../../contexts/DataContext";
import { Link } from "react-router-dom";
import firebaseDb from "../../../firebase";
import { storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import bg5 from "../../../images/big/customer-header.jpg";
import { SplitButton, Row, Modal, Button } from "react-bootstrap";
import Select from "react-select";

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

  const { riderList } = useDataContext();

  var [values, setValues] = useState(initialOrderFieldValues);
  var [orderValues, setOrderValues] = useState({});
  var [currentId, setCurrentId] = useState("");
  var [riderValues, setRiderValues] = useState(riderList);

  const [showUpdateButton, setShowUpdateButton] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const selectedId = props.currentId;

  // prepares rider data for combobox
  const [selectedRiderOption, setSelectedRiderOption] = useState(null);
  const riderOptions = [];
  Object.keys(riderValues).map((id) => {
    return riderOptions.push({
      value: riderValues[id].riderName,
      label: (
        <div>
          <img
            src={riderValues[id].riderImage}
            height="30px"
            width="30px"
            alt={riderValues[id].riderName}
          />{" "}
          {riderValues[id].riderName}
        </div>
      ),
      rider: riderValues[id],
    });
  });

  // updates rider info on the order
  useEffect(() => {
    if (selectedRiderOption !== null) {
      setValues((prev) => ({
        ...prev,
        rider: selectedRiderOption.rider,
      }));
    }
  }, [selectedRiderOption]);

  // styles for combobox
  const customStyles = {
    option: (provided, state) => ({
      color: state.isSelected ? "green" : "",
      padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 250,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  useEffect(() => {
    if (props.currentId === "") {
      setViewMode(false);
      setShowUpdateButton(false);
      setValues({
        ...initialOrderFieldValues,
      });
    } else {
      setViewMode(true);
      setShowUpdateButton(true);
      setValues({
        ...props.orderValues[props.currentId],
      });
    }
  }, [props.currentId, props.orderValues]);

  useEffect(() => {
    setValues({
      ...props.orderValues[
        Object.keys(props.orderValues)[
          Object.keys(props.orderValues).length - 1
        ]
      ],
    });
  }, []);

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
                <strong>Delivery Receipt</strong>{" "}
                {props.currentId.substr(props.currentId.length - 5)}{" "}
              </h4>
              {/* {JSON.stringify(values)} */}
              <span className="float-right">
                {showUpdateButton && (
                  <Link
                    to={{
                      pathname: "/customer-order",
                      state: {
                        order: values,
                        user: values.customer,
                        userId: values.customerId,
                      },
                    }}
                    className="btn-sm btn-warning btn-block"
                  >
                    Update Order
                  </Link>
                )}
              </span>
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
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
                      <strong>{values.dateOfDelivery}</strong>{" "}
                    </div>
                    <br />
                    <h5>Status:</h5>
                    <div>{props.statusBadge(values.status)}</div>
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
                              {product.productName}
                            </td>
                            <td className="left">{product.productQty}</td>
                            <td className="left">{product.productUnit}</td>
                            <td className="right">₱{product.productPrice}</td>
                            <td className="center">{product.discount} %</td>
                            <td className="right">
                              ₱{product.subtotal && product.subtotal}
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
                          <td className="right">₱{values.total}</td>
                        </tr>
                        <tr>
                          <td className="left">
                            <strong>Delivery Fee</strong>
                          </td>
                          <td className="right">₱{values.deliveryFee}</td>
                        </tr>
                        <tr>
                          <td className="left">
                            <strong>Grand Total</strong>
                          </td>
                          <td className="right">
                            <strong>₱{values.grandTotal}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <br />
                <div className="col-xl-12 col-sm-6 mb-4">
                  <h5>Notes:</h5>
                  <div>{values.notes}</div>
                </div>
                <br />
                <div className="row">
                  <div className="col-xl-7 col-sm-6 mb-4">
                    <h5>Rider:</h5>
                    <Select
                      className={"form-control"}
                      defaultValue={selectedRiderOption}
                      onChange={setSelectedRiderOption}
                      options={riderOptions}
                      styles={customStyles}
                      components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                      }}
                    />
                  </div>
                  <div className="col-xl-5 col-sm-6 mb-4">
                    <Button className="mt-4" variant="primary" type="submit">
                      Assign Rider to Order
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddRiderToOrderForm;
