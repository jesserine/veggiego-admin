import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/// Layout
import Nav from "../layouts/nav";
import Footer from "../layouts/Footer";
import { ToastContainer } from "react-toastify";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <div id={"main-wrapper"} className={"show"}>
            <Nav
              showProfileSideBar={true}
              showProfile={() => setShowProfile(true)}
            />

            <div className={"content-body"}>
              <div className={"container-fluid"}>
                <Component {...props} />
              </div>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {<Footer />}
          </div>
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
