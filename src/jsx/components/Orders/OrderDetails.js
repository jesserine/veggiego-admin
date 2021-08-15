import React, { Fragment, useState } from "react";
import { Row, Col, Card, Button, Dropdown, ButtonGroup } from 'react-bootstrap'

const OrderDetails = () => {

   const [orderList, setOrderList] = useState([{
      productName: "",
      quantity: "",
      unit: "",
      category: "",
      price: "",
      discount: "",
      subtotal: ""
   }]);

   const handleInputChange = (index, event) => {
      const values = [...orderList];
      values[index][event.target.name] = event.target.value;
      setOrderList(values);
   }

   const handleSubmit = (e) => {
      e.preventDefault();
   }

   const handleAddFields = () => {
      setOrderList([...orderList, {
         productName: "",
         quantity: "",
         unit: "",
         category: "",
         price: "",
         discount: "",
         subtotal: ""
      }])
   }

   const handleRemoveField = (index) => {
      const values = [...orderList];
      values.splice(index, 1);
      setOrderList(values);
   }
   return (
      <section onSubmit={handleSubmit}>
         {orderList.map((order, index) => (
            <div key={index}>
               <div className="row">
                  <div className="col-lg-6 mb-2">
                     <div className="form-group">
                        <label className="text-label">Product Name*</label>
                        <select
                           id="inputState"
                           className="form-control"
                           name='productName'
                           value={order.productName}
                           onChange={event => handleInputChange(index, event)}
                           required
                        >
                           <option value='Unit'>Choose Product...</option>
                           <option value='Address 1'>Address 1</option>
                           <option value='Address 2'>Address 2</option>
                           <option value='Address 3'>Address 3</option>
                        </select>
                     </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                     <div className="form-group">
                        <label className="text-label">Category*</label>
                        <input
                           type="text"
                           name="category"
                           className="form-control"
                           placeholder="Category"
                           value={order.category}
                           onChange={event => handleInputChange(index, event)}
                           disabled
                        />
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-lg-6 mb-2">
                     <div className="form-group">
                        <label className="text-label">Quantity*</label>
                        <input
                           type="text"
                           name="quantity"
                           className="form-control"
                           placeholder="1"
                           value={order.quantity}
                           onChange={event => handleInputChange(index, event)}
                           required
                        />
                     </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                     <div className="form-group">
                        {/* Must be autofilled once a product name is chosen */}
                        <label className="text-label">Product Unit*</label>
                        <input
                           type="text"
                           name="unit"
                           className="form-control"
                           placeholder="Unit"
                           value={order.unit}
                           onChange={event => handleInputChange(index, event)}
                           disabled
                        />
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-lg-6 mb-2">
                     <div className="form-group">
                        {/* Must be autofilled once a product name is chosen, can be editable */}
                        <label className="text-label">Price*</label>
                        <input
                           type="text"
                           name="price"
                           className="form-control"
                           placeholder="0.00"
                           value={order.price}
                           onChange={event => handleInputChange(index, event)}
                           required
                        />
                     </div>
                  </div>
                  <div className="col-lg-6 mb-2">
                     <div className="form-group">
                        <label className="text-label">Input Discount (%)*</label>
                        <input
                           type="text"
                           name="discount"
                           className="form-control"
                           placeholder="0"
                           value={order.discount}
                           onChange={event => handleInputChange(index, event)}
                           required
                        />
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-lg-6 mb-2">
                     <div className="form-group">
                        <label className="text-label">
                           Subtotal
                        </label>
                        <input
                           type="text"
                           name="subtotal"
                           className="form-control"
                           placeholder="0.00"
                           value={order.subtotal}
                           onChange={event => handleInputChange(index, event)}
                           disabled
                        />
                     </div>
                  </div>
                  <div className="col-lg-6 mb-2 mt-4">
                     <div className="form-group" align="right">
                        {orderList.length != 1 && <Button
                           variant='dark'
                           className="mr-1"
                           onClick={() => handleRemoveField(index)}
                        >
                           Remove
                        </Button>
                        }
                        {orderList.length - 1 === index && <Button
                           variant='primary'
                           onClick={() => handleAddFields()}
                        >
                           Add
                        </Button>
                        }
                     </div>
                  </div>
               </div>

               <div className="row">
                  <div className="col-lg-12 mb-2" align="center">
                  </div>
               </div>
            </div>
         ))}
         <Button variant='primary btn-lg' onClick={handleSubmit} >Save Order</Button>
      </section>
   );
};

export default OrderDetails;