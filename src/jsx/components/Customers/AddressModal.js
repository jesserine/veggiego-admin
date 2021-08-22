import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";

const AddressModal = (props) => {
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
    <div className="bootstrap-modal">
      {" "}
      <Modal
        className="fade modal-container bd-example-modal-lg"
        show={props.isOpen}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>Add Address</Modal.Title>
          <Button
            variant=""
            className="close"
            onClick={() => props.toggleModal(false)}
          >
            <span>&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="basic-form">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="1234 Main St"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>City</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label>State</label>
                  <select
                    defaultValue={"option"}
                    id="inputState"
                    className="form-control"
                  >
                    <option value="option" disabled>
                      Choose...
                    </option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
                <div className="form-group col-md-2">
                  <label>Zip</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </form>
          </div>
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger light"
            onClick={() => props.toggleModal(false)}
          >
            Close
          </Button>
          <Button variant="" type="button" className="btn btn-primary">
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddressModal;
