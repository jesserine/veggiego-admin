import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDb from '../../../firebase'
import { storage } from '../../../firebase'
import { v4 as uuid } from 'uuid'

import PageTitle from "../../layouts/PageTitle";
import { SplitButton, ButtonGroup, Dropdown, Button } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const RidersForm = (props) => {
   const initialFieldValues = {
      riderName: '',
      vehicleType: '',
      vehiclePlateNum: '',
      riderImage: '',
      riderContactNum: '',
      riderAddress: '',
      username: '',
      password: '',
      dateAdded: new Date().toLocaleString(),
      isActive: 'true'
   }

   var [values, setValues] = useState(initialFieldValues)
   var [riderObjects, setRiderObjects] = useState({})

   useEffect(() => {
      firebaseDb.ref('riders/').on('value', (snapshot) => {
        if (snapshot.val() != null)
        setRiderObjects({
            ...snapshot.val(),
          })
        else setRiderObjects({})
      })
    }, [])


  useEffect(() => {
   if (props.currentId == '')
     setValues({
       ...initialFieldValues,
     })
   else
     setValues({
       ...props.riderObjects[props.currentId],
     })
 }, [props.currentId, props.riderObjects])

 const handleInputChange = (e) => {
   var { name, value } = e.target
   setValues({
     ...values,
     [name]: value,
   })
 }

 const [viewMode, setViewMode] = useState(false);

 const [imageUrl, setImageUrl] = useState()
 const readImages = async (e) => {
   const file = e.target.files[0]
   const id = uuid()
   const imagesRef = storage.ref('images').child(id)

   await imagesRef.put(file)
   imagesRef.getDownloadURL().then((url) => {
     setImageUrl(url)
   })
 }

 if (typeof imageUrl !== 'undefined' && imageUrl != null) {
   values.riderImage = imageUrl
 } 

 const handleFormSubmit = (e) => {
    console.log("inside handleFormSubmit")
   e.preventDefault()
   props.addOrEdit(values)
   window.location.reload(false)
 }

 const enabled = values.username!=null
   return (
      <Fragment>
         <div className="row">
            <div className="col-xl-12 col-lg-12">
               <div className="card">
                  <div className="card-header">
                     <h4 className="card-title">
                     {props.currentId === "" ? "Add " : viewMode ? "View " : "Edit " }
                     Rider
                  </h4>
                     {
                        props.currentId !== "" ? 
                           <Button variant='primary btn-rounded' onClick={()=>{ setViewMode(!viewMode) }}>
                              <span className='btn-icon-left text-primary'>
                                 
                                 { viewMode ? <i className='fa fa-pencil' /> : <i className='fa fa-eye' /> }
                              </span>
                              { viewMode ? "Edit " : "View " }
                           </Button>
                        :
                        null
                     }
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
                                    name='riderName'
                                    value={values.riderName}
                                    onChange={handleInputChange}
                                    required
                                    disabled={viewMode}
                                 />
                              </div>
                              <div className="form-group col-md-12">
                                 <label>Contact Number</label>
                                 <input type="text" 
                                 className="form-control" 
                                 placeholder="09-xxx-xxx-xxx"
                                 name='riderContactNum'
                                 value = {values.riderContactNum}
                                 onChange={handleInputChange}
                                 required
                                 />
                              </div>
                           </div>
                            <div className="form-row">
                                 <div className="form-group col-md-12">
                                 <label>Vehicle Type</label>
                                 <select
                                    defaultValue='Select Vehicle'
                                    id="inputState"
                                    className="form-control"
                                    name='vehicleType'
                                    value={values.vehicleType}
                                    onChange={handleInputChange}
                                    required
                                    disabled={viewMode}
                                 >
                                    <option value='Vehicle'>Choose Vehicle..</option>
                                    <option value='Motorcycle'>Motorcycle</option>
                                    <option value='Car'>Car</option>
                                    <option value='Van'>Van</option>
                                    <option value='Truck'>Truck</option>
                                 </select>
                                 </div>
                               <div className="form-group col-md-12">
                                 <label>Vehicle Plate Number</label>
                                 <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Vehicle Plate Number"
                                    name='vehiclePlateNum'
                                    value={values.vehiclePlateNum}
                                    onChange={handleInputChange}
                                    required
                                    disabled={viewMode}
                                 />
                              </div>
                              <div className="form-group col-md-12">
                                 <label>Address</label>
                                 <input type="text" 
                                 className="form-control" 
                                 name='riderAddress'
                                 value = {values.riderAddress}
                                 onChange={handleInputChange}
                                 required
                                 disabled={viewMode}
                                 />
                              </div>
                            </div>
                           <div className="form-row">
                              <div className="form-group col-md-12">
                                 <label>Rider Image</label>
                                 <div className="input-group">
                                    <input
                                    type="file"
                                    accept="image/*"
                                    onChange={readImages}
                                    disabled={viewMode}
                                    />
                                    <input
                                    className="form-control"
                                    name="housePicture"
                                    value={values.housePicture}
                                    onChange={handleInputChange}
                                    disabled={viewMode}
                                    />
                                    {/* <div className="custom-file">
                                       <input
                                          type="file"
                                          className="custom-file-input"
                                       />
                                       <label className="custom-file-label">
                                          Choose file
                                       </label>
                                    </div> */}
                                 </div>
                              </div>
                           </div>
                           <div className="form-row">
                              <div className="form-group col-md-12">
                                 <label>Username</label>
                                 <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    name='username'
                                    value={values.username}
                                    onChange={handleInputChange}
                                    required
                                    disabled={viewMode}
                                 />
                              </div>
                              <div className="form-group col-md-12">
                                 <label>Password</label>
                                 <input type="text" 
                                 className="form-control" 
                                 placeholder="Password"
                                 name='password'
                                 value = {values.password}
                                 onChange={handleInputChange}
                                 required
                                 disabled={viewMode}
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
                                          value={values.isActive}
                                          onChange={handleInputChange}
                                          defaultChecked
                                          disabled={viewMode}
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
                                          value={values.isActive}
                                          onChange={handleInputChange}
                                          disabled={viewMode}
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

export default RidersForm;
