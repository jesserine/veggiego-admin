import React, { Fragment, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Select from "react-select";
import { useDataContext } from "../../../contexts/DataContext";

const DeliveryFeeForm = (props) => {
  const { deliveryLocationList } = useDataContext();
  const [deliveryLocation, setDeliveryLocation] = useState();
  const initialFieldValues = {
    location: "",
    deliveryFee: "",
    dateAdded: new Date().toLocaleString(),
    isActive: "true",
  };

  var [values, setValues] = useState(initialFieldValues);

  useEffect(() => {
    if (props.currentId === "")
      setValues({
        ...initialFieldValues,
      });
    else
      setValues({
        ...props.deliveryFeeObjects[props.currentId],
      });
  }, [props.currentId, props.deliveryFeeObjects]);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.addOrEdit(values);
  };

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

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      location: deliveryLocation && deliveryLocation.value,
    }));
  }, [deliveryLocation]);

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

  const enabled = values.location != null && values.deliveryFee >= 0;
  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                {props.currentId === "" ? "Add" : "Update"} Delivery Fee
              </h4>
              {props.currentId !== "" && (
                <Button
                  onClick={() => {
                    props.setCurrentId("");
                  }}
                  className="btn btn-primary light btn-xs  mr-1"
                >
                  Add new Delivery Fee
                </Button>
              )}
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleFormSubmit}>
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
                      <label>Delivery Fee</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        name="deliveryFee"
                        value={values.deliveryFee}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        name="isActive"
                        type="checkbox"
                        defaultChecked={values.isActive}
                        checked={values.isActive}
                        onChange={handleInputChange}
                        className="custom-control-input"
                        id="isActiveChkBox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="isActiveChkBox"
                      >
                        Is Active?
                      </label>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12 mt-4">
                      <input
                        type="submit"
                        value={
                          props.currentId === ""
                            ? "Add Delivery Fee"
                            : "Update Delivery Fee"
                        }
                        className="btn btn-primary"
                        disabled={!enabled}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DeliveryFeeForm;
