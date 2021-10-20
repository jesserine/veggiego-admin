import React, { Fragment, useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import CategoryList from "../Products/CategoryList";
import UnitList from "../Products/UnitList";
import DeliveryFeeList from "../Orders/DeliveryFeeList";

const Settings = () => {
  const [selectedCategorySettings, setSelectedCategorySettings] =
    useState(true);
  const [selectedUnitSettings, setSelectedUnitSettings] = useState(false);
  const [selectedDeliveryLocationSettings, setDeliveryLocationSettings] =
    useState(false);

  const SettingsArea = () => {
    if (selectedCategorySettings) {
      return <CategoryList />;
    } else if (selectedUnitSettings) {
      return <UnitList />;
    } else if (selectedDeliveryLocationSettings) {
      return <DeliveryFeeList />;
    }
  };

  const toggleAllButtons = (toggle) => {
    setSelectedCategorySettings(toggle);
    setSelectedUnitSettings(toggle);
    setDeliveryLocationSettings(toggle);
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-3 col-lg-3">
          <Button
            onClick={() => {
              toggleAllButtons();
              setSelectedCategorySettings(true);
            }}
            className="btn btn-primary light btn-block"
          >
            Product Category
          </Button>
          <Button
            onClick={() => {
              toggleAllButtons();
              setSelectedUnitSettings(true);
            }}
            className="btn btn-primary light btn-block"
          >
            Product Unit
          </Button>
          <Button
            onClick={() => {
              toggleAllButtons();
              setDeliveryLocationSettings(true);
            }}
            className="btn btn-primary light btn-block"
          >
            Delivery Fee
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
