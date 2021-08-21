import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/// Layout
import Nav from "../layouts/nav";
import Footer from "../layouts/Footer";

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
            {<Footer />}
          </div>
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
