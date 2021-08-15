import React, { Fragment, useState, useEffect } from "react";
import firebaseDb from '../../../firebase'
import PageTitle from "../../layouts/PageTitle";
import swal from "sweetalert";
import swalMessage from "@sweetalert/with-react";
import {
   Row,
   Col,
   Card,
   Table,
   Button,
   Badge,
   Dropdown,
   ProgressBar,
} from "react-bootstrap";

/// imge
import avatar1 from "../../../images/avatar/1.jpg";
import avatar2 from "../../../images/avatar/2.jpg";
import avatar3 from "../../../images/avatar/3.jpg";
import { Link } from "react-router-dom";
import ProductsForm from "./ProductsForm";

const ProductsList = () => {
   var [productObjects, setProductObjects] = useState({})
   var [currentId, setCurrentId] = useState('')
   var [searchTerm, setSearchTerm] = useState('')

   const svg1 = (
      <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
         <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <rect x="0" y="0" width="24" height="24"></rect>
            <circle fill="#000000" cx="5" cy="12" r="2"></circle>
            <circle fill="#000000" cx="12" cy="12" r="2"></circle>
            <circle fill="#000000" cx="19" cy="12" r="2"></circle>
         </g>
      </svg> 
   );

   useEffect(() => {
      if (searchTerm.length > 0) {
          firebaseDb.ref('products/').on('value', (snapshot) => {
              if (snapshot.val() != null) {
                  const productsDb = snapshot.val()
                  setProductObjects([])
                  let searchQuery = searchTerm.toLowerCase();
                  for (let id in productsDb) {
                      let product = productsDb[id].productName.toLowerCase();
                      if (product.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
                        setProductObjects(prevResult => {
                              return [...prevResult, productsDb[id]]
                          });
                      }
                  }
              } else {
               setProductObjects([])
              }
          })
      } else {
         firebaseDb.ref('products/').on('value', (snapshot) => {
            if (snapshot.val() != null)
               setProductObjects({
                  ...snapshot.val(),
               })
            else setProductObjects({})
         })
      }
  }, [searchTerm])

   useEffect(() => {
      firebaseDb.ref('products/').on('value', (snapshot) => {
         if (snapshot.val() != null)
            setProductObjects({
               ...snapshot.val(),
            })
         else setProductObjects({})
      })
   }, [])

   const addOrEdit = (obj) => {
      console.log("inside addOrEdit")
      if (currentId == '') {
         swal(
            "Nice!",
            "A product is added!",
            "success"
         )
         firebaseDb.ref('products/').push(obj, (err) => {
            if (err) console.log(err)
            else setCurrentId('')
         })
      }
      else {
         swal(
            "Nice!",
            "This product is updated!",
            "success"
         )
         firebaseDb.ref(`products/${currentId}`).set(obj, (err) => {
            if (err) console.log(err)
            else setCurrentId('')
         })
      }
   }

   const onDelete = (key) => {
      swal({
         title: "Are you sure?",
         text:
            "Once deleted, you will not be able to recover this product!",
         icon: "warning",
         buttons: true,
         dangerMode: true,
      }).then((willDelete) => {
         if (willDelete) {
            firebaseDb.ref(`products/${key}`).remove((err) => {
               if (err) console.log(err)
               else setCurrentId('')
            })
            swal(
               "Poof! This product has been deleted!",
               {
                  icon: "success",
               }
            );
         } else {
            swal("Your product is safe!");
         }
      })
   }

   return (
      <Fragment>
         <div className="row">
            <div className="col-xl-4 col-lg-4">
               <ProductsForm {...{ addOrEdit, currentId, productObjects }} />
            </div>
            <div className="col-xl-8 col-lg-8">
               <Row>
                  <Col lg={12}>
                     <Card>
                        <Card.Header>
                           <Card.Title>My Products</Card.Title>
                           <Button variant='primary btn-rounded' onClick={() => { setCurrentId('') }}>
                              <span className='btn-icon-left text-primary'>

                                 <i className='fa fa-plus' />
                              </span>
                              Add
                           </Button>
                        </Card.Header>
                        <Card.Body>
                           <div className="search_bar dropdown show mb-3">
                              <div className="dropdown-menushow">
                                 <form onSubmit={(e) => e.preventDefault()}>
                                    <input
                                       className="form-control"
                                       type="search"
                                       placeholder="Search Product name"
                                       aria-label="Search"
                                       onChange ={(event) => setSearchTerm(event.target.value)}
                                    />
                                 </form>
                              </div>
                           </div>
                           <Table responsive hover>
                              <thead>
                                 <tr>
                                    <th>
                                       <strong>PRODUCT NAME</strong>
                                    </th>
                                    <th>
                                       <strong>CATEGORY</strong>
                                    </th>
                                    <th>
                                       <strong>UNIT</strong>
                                    </th>
                                    <th>
                                       <strong>PRICE</strong>
                                    </th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {Object.keys(productObjects).map((id) => {
                                    return (
                                       <tr key={id} 
                                          onClick={() => { setCurrentId(id) }}>
                                         
                                          <td>
                                             <img
                                                src={ productObjects[id].productImage}
                                                className="rounded-lg mr-2"
                                                width="24"
                                                alt=""
                                             />
                                             <span>
                                                {productObjects[id].productName}
                                             </span>
                                          </td>
                                          <td>{productObjects[id].category}</td>
                                          <td>{productObjects[id].unit}</td>
                                          <td>{productObjects[id].price}</td>
                                       </tr>
                                    )
                                 })}
                              </tbody>
                           </Table>
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>
            </div>
         </div>
      </Fragment>
   );
};

export default ProductsList;
