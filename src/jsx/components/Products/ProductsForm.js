import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebaseDb from '../../../firebase'
import { storage } from '../../../firebase'
import { v4 as uuid } from 'uuid'

import PageTitle from "../../layouts/PageTitle";
import { SplitButton, ButtonGroup, Dropdown } from "react-bootstrap";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

const ProductsForm = (props) => {
   const initialFieldValues = {
      productName: '',
      category: '',
      productImage: '',
      price: '',
      unit: '',
      dateUpdated: new Date().toLocaleString(),
      isActive: 'true'
   }

   var [values, setValues] = useState(initialFieldValues)
   var [productObjects, setProductObjects] = useState({})
   var [categoryObjects, setCategoryObjects] = useState({})
   var [unitObjects, setUnitObjects] = useState({})

   useEffect(() => {
      firebaseDb.ref('category/').on('value', (snapshot) => {
        if (snapshot.val() != null)
        setCategoryObjects({
            ...snapshot.val(),
          })
        else setCategoryObjects({})
      })
    }, [])

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
      firebaseDb.ref('products/').on('value', (snapshot) => {
        if (snapshot.val() != null)
        setProductObjects({
            ...snapshot.val(),
          })
        else setProductObjects({})
      })
    }, [])


  useEffect(() => {
   if (props.currentId == '')
     setValues({
       ...initialFieldValues,
     })
   else
     setValues({
       ...props.productObjects[props.currentId],
     })
 }, [props.currentId, props.productObjects])

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

 const enabled = values.productName!=null
   return (
      <Fragment>
         <div className="row">
            <div className="col-xl-12 col-lg-12">
               <div className="card">
                  <div className="card-header">
                     <h4 className="card-title">{props.currentId === '' ? 'Add' : 'Update'} Product</h4>
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
                                    name='productName'
                                    value={values.productName}
                                    onChange={handleInputChange}
                                    required
                                 />
                              </div>
                              <div className="form-group col-md-12">
                                 <label>Category</label>
                                 <select
                                    defaultValue='Select Category'
                                    id="inputState"
                                    className="form-control"
                                    name='category'
                                    value={values.category}
                                    onChange={handleInputChange}
                                    required
                                 >
                                    <option value=''>Choose Category..</option>
                                    {Object.keys(categoryObjects).map((id) => {
                                       return (
                                       <React.Fragment key={id}>
                                          {categoryObjects[id].isActive == 'true' ? (
                                             <option value={categoryObjects[id].categoryName}>
                                             {categoryObjects[id].categoryName
                                             }
                                             </option>
                                          ) : (
                                             ''
                                          )}
                                       </React.Fragment>
                                       )
                                    })}
                                 </select>
                              </div>
                            </div>
                            <div className="form-row"><div className="form-group col-md-12">
                                 <label>Unit</label>
                                 <select
                                    defaultValue='Select Unit'
                                    id="inputState"
                                    className="form-control"
                                    name='unit'
                                    value={values.unit}
                                    onChange={handleInputChange}
                                    required
                                 >
                                    <option value='Unit'>Choose Unit..</option>
                                    {Object.keys(unitObjects).map((id) => {
                                       return (
                                       <React.Fragment key={id}>
                                          {unitObjects[id].isActive == 'true' ? (
                                             <option value={unitObjects[id].unitName}>
                                             {unitObjects[id].unitName
                                             }
                                             </option>
                                          ) : (
                                             ''
                                          )}
                                       </React.Fragment>
                                       )
                                    })}
                                 </select>
                              </div>
                              <div className="form-group col-md-12">
                                 <label>Price</label>
                                 <input type="text" 
                                 className="form-control" 
                                 name='price'
                                 value = {values.price}
                                 onChange={handleInputChange}
                                 required
                                 />
                              </div>
                            </div>
                           <div className="form-row">
                              <div className="form-group col-md-12">
                                 <label>Product Image</label>
                                 <div className="input-group">
                                    <div className="custom-file">
                                       <input
                                          type="file"
                                          className="custom-file-input"
                                       />
                                       <label className="custom-file-label">
                                          Choose file
                                       </label>
                                    </div>
                                 </div>
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

export default ProductsForm;
