import React, { Fragment } from "react";

import Multistep from "react-multistep";

import StepOne from "./CustomerDetails";
import StepTwo from "./OrderDetails";
import StepThree from "./CheckoutOrder";
import PageTitle from "../../layouts/PageTitle";

const CustomerOrder = () => {
   const steps = [
      { name: "Customer Info", component: <StepOne /> },
      { name: "Order Details", component: <StepTwo /> },
      { name: "Checkout", component: <StepThree /> },
      { name: "Checkout", component: <StepThree /> },
   ];

   const prevStyle = {
      background: "#F7FAFC",
      borderWidth: "0px",
      color: "#333333",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "600",
      padding: "0.55em 2em",
      border: "1px solid #EEEEEE",
      marginRight: "1rem",
   };   
   const nextStyle = {
      background: "#52B141",
      borderWidth: "0px",
      color: "#fff",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "600",
      padding: "0.55em 2em",
   };
   return (
      <Fragment> 
         <div className="row">
            <div className="col-xl-12 col-xxl-12">
               <div className="card">
                  <div className="card-header">
                     <h4 className="card-title">Customer Order</h4>
                  </div>
                  <div className="card-body">
                     <form
                        onSubmit={(e) => e.preventDefault()}
                        id="step-form-horizontal"
                        className="step-form-horizontal"
                     >
                        <Multistep
                           showNavigation={true}
                           steps={steps}
                           prevStyle={prevStyle}
                           nextStyle={nextStyle}
                        />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default CustomerOrder;
