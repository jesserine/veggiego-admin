import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from "../../../firebase";

const UnitForm = (props) => {
  const initialFieldValues = {
    unitName: "",
    abbreviation: "",
    dateAdded: new Date().toLocaleString(),
    isActive: "true",
  };

  var [values, setValues] = useState(initialFieldValues);
  var [unitObjects, setUnitObjects] = useState({});

  useEffect(() => {
    firebaseDb.ref("unit/").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setUnitObjects({
          ...snapshot.val(),
        });
      else setUnitObjects({});
    });
  }, []);

  useEffect(() => {
    if (props.currentId == "")
      setValues({
        ...initialFieldValues,
      });
    else
      setValues({
        ...props.unitObjects[props.currentId],
      });
  }, [props.currentId, props.unitObjects]);

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

  const enabled = values.unitName != null;
  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">
                {props.currentId === "" ? "Add" : "Update"} Unit
              </h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        name="unitName"
                        value={values.unitName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label>Abbreviation</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Abbreviation"
                        name="abbreviation"
                        value={values.abbreviation}
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
                            ? "Add Product Unit"
                            : "Update Product Unit"
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

export default UnitForm;
