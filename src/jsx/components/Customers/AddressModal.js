import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";

import { useDataContext } from "../../../contexts/DataContext";

const AddressModal = (props) => {
  const { deliveryLocationList } = useDataContext();
  const [deliveryLocation, setDeliveryLocation] = useState();
  const [streetAddr, setStreetAddr] = useState();

  // if (props.address) {
  //   setStreetAddr(props.address.street);
  // }

  // prepares delivery locations data for combobox
  const deliveryOptions = [];
  if (deliveryLocationList) {
    Object.keys(deliveryLocationList).map((id) => {
      return deliveryOptions.push({
        value: deliveryLocationList[id].completeLocation,
        label: deliveryLocationList[id].completeLocation,
        location: deliveryLocationList[id],
      });
    });
  }

  // styles for combobox
  const customStyles = {
    option: (provided, state) => ({
      color: state.isSelected ? "green" : "",
      padding: 20,
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 500,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const saveAddress = () => {
    props.handleMultipleCustomerAddress({
      location: deliveryLocation.location,
      street: streetAddr,
      landmark: "Landmark",
      contact: "096127128731237",
      default: false,
    });
    props.toggleModal(false);
  };

  const closeModal = () => {
    props.toggleModal(false);
    setStreetAddr("");
  };

  return (
    <div className="bootstrap-modal">
      <Modal
        className="fade modal-container bd-example-modal-lg"
        show={props.isOpen}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>Add Address </Modal.Title>
          <Button variant="" className="close" onClick={closeModal}>
            <span>&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="basic-form">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label>Location</label>
                  <Select
                    className={"form-control"}
                    name="location"
                    defaultValue={"Choose Location"}
                    onChange={setDeliveryLocation}
                    options={deliveryOptions}
                    styles={customStyles}
                    components={{
                      DropdownIndicator: () => null,
                      IndicatorSeparator: () => null,
                    }}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label>House No., Street Name, Building</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={props.address ? props.address.street : ""}
                    value={streetAddr}
                    onChange={(event) => setStreetAddr(event.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger light" onClick={closeModal}>
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
