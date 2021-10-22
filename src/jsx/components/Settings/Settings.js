import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "react-bootstrap";
import CategoryList from "./CategoryList";
import UnitList from "./UnitList";
import DeliveryFeeList from "./DeliveryFeeList";
import DeliveryLocationList from "./DeliveryLocationList";

const Settings = () => {
  const [selectedCategorySettings, setSelectedCategorySettings] =
    useState(true);
  const [selectedUnitSettings, setSelectedUnitSettings] = useState(false);
  const [selectedDeliveryLocationSettings, setDeliveryLocationSettings] =
    useState(false);
  const [
    selectedSupportedDeliveryLocations,
    setSelectedSupportedDeliveryLocations,
  ] = useState(false);

  const SettingsArea = () => {
    if (selectedCategorySettings) {
      return <CategoryList />;
    } else if (selectedUnitSettings) {
      return <UnitList />;
    } else if (selectedDeliveryLocationSettings) {
      return <DeliveryFeeList />;
    } else if (selectedSupportedDeliveryLocations) {
      return <DeliveryLocationList />;
    }
  };

  const toggleAllButtons = (toggle) => {
    setSelectedCategorySettings(toggle);
    setSelectedUnitSettings(toggle);
    setDeliveryLocationSettings(toggle);
    setSelectedSupportedDeliveryLocations(toggle);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Veggie Go | Settings </title>
      </Helmet>
      <div className="row">
        <div className="col-xl-3 col-lg-3">
          <Button
            onClick={() => {
              toggleAllButtons(false);
              setSelectedCategorySettings(true);
            }}
            className="btn btn-primary light btn-block"
          >
            Product Category
          </Button>
          <Button
            onClick={() => {
              toggleAllButtons(false);
              setSelectedUnitSettings(true);
            }}
            className="btn btn-primary light btn-block"
          >
            Product Unit
          </Button>
          <Button
            onClick={() => {
              toggleAllButtons(false);
              setDeliveryLocationSettings(true);
            }}
            className="btn btn-primary light btn-block"
          >
            Delivery Fee
          </Button>
          <Button
            onClick={() => {
              toggleAllButtons(false);
              setSelectedSupportedDeliveryLocations(true);
            }}
            className="btn btn-primary light btn-block"
          >
            Supported Delivery Locations
          </Button>
        </div>
        <div className="col-xl-9 col-lg-9">
          <SettingsArea />
        </div>
      </div>
    </Fragment>
  );
};

export default Settings;
