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
  const [streetAddr, setStreetAddr] = useState("");

  const region = () => {
    regions().then((response) => {
      console.log("response", response);
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

  const saveAddress = () => {
    props.handleMultipleCustomerAddress({
      region: regionAddr,
      province: provinceAddr,
      city: cityAddr,
      barangay: barangayAddr,
      street: streetAddr,
    });
  };

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
                  <label>Region</label>
                  <select
                    defaultValue={"option"}
                    id="inputState"
                    className="form-control"
                    onChange={province}
                    onSelect={region}
                  >
                    {regionData[8] && (
                      <option
                        value={regionData[8].region_code}
                        key={regionData[8].region_code}
                      >
                        {regionData[8].region_name}
                      </option>
                    )}

                    {regionData &&
                      regionData.length > 0 &&
                      regionData.map((item) => (
                        <option key={item.region_code} value={item.region_code}>
                          {item.region_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label>Province</label>
                  <select
                    defaultValue={"option"}
                    id="inputState"
                    className="form-control"
                    onChange={city}
                  >
                    <option value="option" disabled>
                      Select Province...
                    </option>
                    {provinceData &&
                      provinceData.length > 0 &&
                      provinceData.map((item) => (
                        <option
                          key={item.province_code}
                          value={item.province_code}
                        >
                          {item.province_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label>City</label>
                  <select
                    defaultValue={"option"}
                    id="inputState"
                    className="form-control"
                    onChange={barangay}
                  >
                    <option value="option" disabled>
                      Select City...
                    </option>
                    {cityData &&
                      cityData.length > 0 &&
                      cityData.map((item) => (
                        <option key={item.city_code} value={item.city_code}>
                          {item.city_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label>Barangay</label>
                  <select
                    defaultValue={"option"}
                    id="inputState"
                    className="form-control"
                    onChange={brgy}
                  >
                    <option value="option" disabled>
                      Select Barangay...
                    </option>
                    {barangayData &&
                      barangayData.length > 0 &&
                      barangayData.map((item) => (
                        <option key={item.brgy_code} value={item.brgy_code}>
                          {item.brgy_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group col-md-12">
                  <label>Street Name, Building, House No.</label>
                  <input
                    type="text"
                    className="form-control"
                    value={streetAddr}
                    onChange={(event) => setStreetAddr(event.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
          <p>Full Address</p>
          {streetAddr}, {barangayAddr}, {cityAddr}, {provinceAddr}, {regionAddr}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger light"
            onClick={() => props.toggleModal(false)}
          >
            Close
          </Button>
          <Button
            variant=""
            type="button"
            className="btn btn-primary"
            onClick={saveAddress}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddressModal;
