import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDb from '../../../firebase'
import { storage } from '../../../firebase'
import { v4 as uuid } from 'uuid'

import PageTitle from "../../layouts/PageTitle";
import { SplitButton, ButtonGroup, Dropdown } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const UnitForm = (props) => {
   const initialFieldValues = {
      unitName: '',
      abbreviation: '',
      dateAdded: new Date().toLocaleString(),
      isActive: 'true'
   }

   var [values, setValues] = useState(initialFieldValues)
   var [unitObjects, setUnitObjects] = useState({})

   useEffect(() => {
      firebaseDb.ref('unit/').on('value', (snapshot) => {
        if (snapshot.val() != null)
        setUnitObjects({
            ...snapshot.val(),
          })
        else setUnitObjects({})
      })
    }, [])


  useEffect(() => {
   if (props.currentId == '')
     setValues({
       ...initialFieldValues,
     })
   else
     setValues({
       ...props.unitObjects[props.currentId],
     })
 }, [props.currentId, props.unitObjects])

 const handleInputChange = (e) => {
   var { name, value } = e.target
   setValues({
     ...values,
     [name]: value,
   })
 }

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
   values.productImage = imageUrl
 } 

 const handleFormSubmit = (e) => {
    console.log("inside handleFormSubmit")
   e.preventDefault()
   props.addOrEdit(values)
   window.location.reload(false)
 }

 const enabled = values.unitName!=null
   return (
      <Fragment>
         <div className="row">
            <div className="col-xl-12 col-lg-12">
               <div className="card">
                  <div className="card-header">
                     <h4 className="card-title">{props.currentId === '' ? 'Add' : 'Update'} Unit</h4>
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
                                    name='unitName'
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
                                    name='abbreviation'
                                    value={values.abbreviation}
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

export default UnitForm;
