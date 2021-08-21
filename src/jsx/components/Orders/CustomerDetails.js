import React, { Fragment } from "react";
import { DatePicker } from "@y0c/react-datepicker";

const CustomerDetails = () => {

   return (
      <section>
         <div className="row">
            <div className="col-lg-12 mb-2">
               <div className="form-group">
                  <label className="text-label">Customer Name*</label>
                  <input
                     type="text"
                     name="firstName"
                     className="form-control"
                     placeholder="Parsley"
                     disabled
                  />
               </div>
            </div>
         </div>
         <div className="row">
            <div className="col-lg-12 mb-2">
               <div className="form-group" >
                  <label className="text-label">Address Details*</label>
                  <select
                     defaultValue='Select Address'
                     id="inputState"
                     className="form-control"
                     name='unit'
                     required
                  >
                     <option value='Unit'>Choose Unit..</option>
                     <option value='Address 1'>Address 1</option>
                     <option value='Address 2'>Address 2</option>
                     <option value='Address 3'>Address 3</option>
                  </select>
               </div>
            </div>
         </div>
         <div className="row">
            <div className="col-lg-3 mb-2 mt-3" >
               <label className="text-label">Date of Delivery* </label>
            </div>
            <div className="col-lg-6 mb-2" >
               <DatePicker required align="left" />
            </div>
         </div>
      </section>
   );
};

export default CustomerDetails;