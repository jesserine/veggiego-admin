import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"


export default function AuthRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return !currentUser ? 
          <div
            id={`${""}`}
            className={`${"mh100vh"}
                }`}
          >
            <div className={`  ${""}`}>
              <div className={`${""}`}>
                <Component {...props} /> 
              </div>
            </div>
          </div>
          : 
          <Redirect to="/dashboard" />
      }}
    ></Route>
  )
}