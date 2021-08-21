import React, { Fragment } from "react";

const AdditionalDetails = () => {
    return (
        <section>
            <div className="row">
                <div className="col-lg-6 mb-2">
                    <div className="form-group">
                        <label className="text-label">Delivery Area*</label>
                        <select
                            defaultValue='Select Address'
                            id="inputState"
                            className="form-control"
                            name='location'
                            required
                        >
                            <option value='Unit'>Choose Area..</option>
                            <option value='Address 1'>Address 1</option>
                            <option value='Address 2'>Address 2</option>
                            <option value='Address 3'>Address 3</option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-6 mb-2">
                    <div className="form-group">
                        <label className="text-label">Delivery Fee*</label>
                        <input
                            type="text"
                            name="deliveryFee"
                            className="form-control"
                            placeholder="0.00"
                            disabled
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdditionalDetails;