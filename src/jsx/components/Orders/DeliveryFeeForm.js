import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDb from '../../../firebase'
import { storage } from '../../../firebase'
import { v4 as uuid } from 'uuid'

import PageTitle from "../../layouts/PageTitle";
import { SplitButton, ButtonGroup, Dropdown } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const DeliveryFeeForm = (props) => {
   const initialFieldValues = {
      location: '',
      deliveryFee: '',
      dateAdded: new Date().toLocaleString(),
      isActive: 'true'
   }

   var [values, setValues] = useState(initialFieldValues)
   var [deliveryFeeObjects, setDeliveryFeeObjects] = useState({})

   useEffect(() => {
      firebaseDb.ref('delivery/').on('value', (snapshot) => {
        if (snapshot.val() != null)
        setDeliveryFeeObjects({
            ...snapshot.val(),
          })
        else setDeliveryFeeObjects({})
      })
    }, [])


  useEffect(() => {
   if (props.currentId == '')
     setValues({
       ...initialFieldValues,
     })
   else
     setValues({
       ...props.deliveryFeeObjects[props.currentId],
     })
 }, [props.currentId, props.deliveryFeeObjects])

 const handleInputChange = (e) => {
   var { name, value } = e.target
   setValues({
     ...values,
     [name]: value,
   })
 }

 const handleFormSubmit = (e) => {
    console.log("inside handleFormSubmit")
   e.preventDefault()
   props.addOrEdit(values)
   window.location.reload(false)
 }

 const enabled = values.location!=null && values.deliveryFee<=0
   return (
      <Fragment>
         <div className="row">
            <div className="col-xl-12 col-lg-12">
               <div className="card">
                  <div className="card-header">
                     <h4 className="card-title">{props.currentId === '' ? 'Add' : 'Update'} Delivery Fee</h4>
                  </div>
                  <div className="card-body">
                     <div className="basic-form">
                        <form onSubmit={handleFormSubmit}>
                           <div className="form-row">
                              <div className="form-group col-md-12">
                                 <label>Location</label>
                                 <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Location"
                                    name='location'
                                    value={values.location}
                                    onChange={handleInputChange}
                                    required
                                 />
                              </div>
                            </div>
                           <div className="form-row">
                              <div className="form-group col-md-12">
                                 <label>Delivery Fee</label>
                                 <input
                                    type="text"
                                    className="form-control"
                                    placeholder="0"
                                    name='deliveryFee'
                                    value={values.deliveryFee}
                                    onChange={handleInputChange}
                                    required
                                 />
                              </div>
                            </div>
                           <div className="form-row">
                                 <label className="col-form-label col-sm-3 pt-0">
                                    Is Active?
                                 </label>
                                 <div className="col-sm-9">
                                    <div className="form-check">
                                       <input
                                          className="form-check-input"
                                          type="radio"
                                          name="isActive"
                                          value="true"
                                          onChange={handleInputChange}
                                          defaultChecked
                                       />
                                       <label className="form-check-label">
                                          Yes
                                       </label>
                                    </div>
                                    <div className="form-check">
                                       <input
                                          className="form-check-input"
                                          type="radio"
                                          name="isActive"
                                          value="false"
                                          onChange={handleInputChange}
                                       />
                                       <label className="form-check-label">
                                          No
                                       </label>
                                    </div>
                                 </div>
                              </div>
                           <div className="form-row">
                              <div className="form-group col-md-12">
                                 <input type="submit" 
                                 value = {props.currentId == '' ? 'Save' : 'Update'}
                                 className="btn btn-primary btn-block"
                                 disabled={!enabled} />
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
