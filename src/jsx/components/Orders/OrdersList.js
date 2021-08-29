import React, { Fragment, useEffect, useState } from "react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
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

const OrdersList = () => {
  var [orderObjects, setOrderObjects] = useState({});
  var [currentId, setCurrentId] = useState("");
  const location = useLocation();
  // const { user } = location.state;

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

  const [regionData, setRegion] = useState([]);
  const [provinceData, setProvince] = useState([]);
  const [cityData, setCity] = useState([]);
  const [barangayData, setBarangay] = useState([]);

  const [regionAddr, setRegionAddr] = useState("");
  const [provinceAddr, setProvinceAddr] = useState("");
  const [cityAddr, setCityAddr] = useState("");
  const [barangayAddr, setBarangayAddr] = useState("");

  const region = () => {
    regions().then((response) => {
      setRegion(response);
    });
  };

  const province = (e) => {
    setRegionAddr(e.target.selectedOptions[0].text);
    provinces(e.target.value).then((response) => {
      setProvince(response);
      setCity([]);
      setBarangay([]);
    });
  };

  const city = (e) => {
    setProvinceAddr(e.target.selectedOptions[0].text);
    cities(e.target.value).then((response) => {
      setCity(response);
    });
  };

  const barangay = (e) => {
    setCityAddr(e.target.selectedOptions[0].text);
    barangays(e.target.value).then((response) => {
      setBarangay(response);
    });
  };

  const brgy = (e) => {
    setBarangayAddr(e.target.selectedOptions[0].text);
  };

  useEffect(() => {
    region();
  }, []);

  return (
    <Fragment>
      {/* <p>{JSON.stringify(user)}</p>
         <Card className="text-white bg-primary">
                  <Card.Header>
                     <Card.Title className="text-white">
                        Primary card title
                     </Card.Title>
                  </Card.Header>
                  <Card.Body className=" mb-0">
                     <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                     </Card.Text>
                  </Card.Body>
               </Card>
         <div className="row">
            <div className="col-xl-4 col-lg-4">
               <OrdersForm {...{ addOrEdit, currentId, orderObjects }} />
            </div>
            <div className="col-xl-8 col-lg-8">
               <Row>


               </Row>
            </div>
         </div> */}
      <div className="App">
        <header className="App-header">
          <h1>REACT JS</h1>
          <h4>select-philippines-address demo</h4>
          <select onChange={province} onSelect={region}>
            <option disabled>Select Region</option>
            {regionData &&
              regionData.length > 0 &&
              regionData.map((item) => (
                <option key={item.region_code} value={item.region_code}>
                  {item.region_name}
                </option>
              ))}
          </select>
          <br />
          <select onChange={city}>
            <option disabled>Select Province</option>
            {provinceData &&
              provinceData.length > 0 &&
              provinceData.map((item) => (
                <option key={item.province_code} value={item.province_code}>
                  {item.province_name}
                </option>
              ))}
          </select>
          <br />
          <select onChange={barangay}>
            <option disabled>Select City</option>
            {cityData &&
              cityData.length > 0 &&
              cityData.map((item) => (
                <option key={item.city_code} value={item.city_code}>
                  {item.city_name}
                </option>
              ))}
          </select>
          <br />
          <select onChange={brgy}>
            <option disabled>Select Barangay</option>
            {barangayData &&
              barangayData.length > 0 &&
              barangayData.map((item) => (
                <option key={item.brgy_code} value={item.brgy_code}>
                  {item.brgy_name}
                </option>
              ))}
          </select>
          <p>Address</p>
          {barangayAddr}, {cityAddr}, {provinceAddr}, {regionAddr}
        </header>
      </div>
    </Fragment>
  );
};

export default OrdersList;
