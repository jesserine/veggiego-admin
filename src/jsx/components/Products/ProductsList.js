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
      if (currentId == ''){
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
      else{
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
               <ProductsForm {...{ addOrEdit, currentId, productObjects }}/>
            </div>
            <div className="col-xl-8 col-lg-8">
               <Row>
                  <Col lg={12}>
                     <Card>
                        <Card.Header>
                           <Card.Title>My Products</Card.Title>
                        </Card.Header>
                        <Card.Body>
                           <Table responsive>
                              <thead>
                                 <tr>
                                    {/* <th>
                                       <strong></strong>
                                    </th> */}
                                    <th>
                                       <strong>NAME</strong>
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
                                    <th>
                                       <strong>IMAGE</strong>
                                    </th>
                                    {/* <th>
                                       <strong>DATE UPDATED</strong>
                                    </th>
                                    <th>
                                       <strong>STATUS</strong>
                                    </th> */}
                                 </tr>
                              </thead>
                              <tbody>
                              {Object.keys(productObjects).map((id) => {
                                    return (
                                       <tr key={id} onClick={() => { setCurrentId(id) }}>
                                          {/* <td>
                                             <div className="d-flex">
                                                <Link
                                                   to="/products"
                                                   onClick={() => { setCurrentId(id); window.scrollTo(0, 0); }}
                                                   className="btn btn-primary shadow btn-xs sharp mr-1"
                                                >
                                                   <i className="fa fa-pencil"></i>
                                                </Link>
                                                <Link
                                                   to="/products"
                                                   onClick={() => { onDelete(id) }}
                                                   className="btn btn-danger shadow btn-xs sharp"
                                                >
                                                   <i className="fa fa-trash"></i>
                                                </Link>
                                             </div>
                                          </td> */}
                                          <td>{productObjects[id].productName}</td>
                                          <td>{productObjects[id].category}</td>
                                          <td>{productObjects[id].unit}</td>
                                          <td>{productObjects[id].price}</td>
                                          <td>{productObjects[id].productImage}</td>
                                          {/* <td>{productObjects[id].dateUpdated}</td>
                                          <td>{productObjects[id].isActive=== 'false'
                                             ? <Badge variant="danger light"> Inactive </Badge>
                                             : <Badge variant="success light"> Active </Badge>}
                                          </td> */}
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
