import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext'
import { Alert } from 'react-bootstrap'

const Login = ({ history }) => {
   const [loginData, setLoginData] = useState({});
   const hist = useHistory()

    /// Authentication
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


   const handleBlur = (e) => {
      const newLoginData = { ...loginData };
      newLoginData[e.target.name] = e.target.value;
      setLoginData(newLoginData);
   };

   const submitHandler = async(e) => {
      e.preventDefault();

      try{
         setError('')
         setLoading(true)
         await login(emailRef.current.value, passwordRef.current.value)
         hist.push('/')
      } catch (e){
         setError(e.message)
         console.log(e);
      }
      setLoading(false)
   };

   return (
      <div className="authincation h-100 p-meddle">
         <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
               <div className="col-md-6">
                  <div className="authincation-content">
                     <div className="row no-gutters">
                        <div className="col-xl-12">
                           <div className="auth-form">
                              <h4 className="text-center mb-4">
                                 Log in your account
                              </h4>
                              <form
                                 action=""
                                 onSubmit={(e) => submitHandler(e)}
                              >
                                 <div className="form-group">
                                    <label className="mb-1">
                                       <strong>Email</strong>
                                    </label>
                                    <input
                                       type="email"
                                       className="form-control"
                                       name="Email"
                                       onChange={handleBlur}
                                       ref={emailRef}
                                    />
                                 </div>
                                 <div className="form-group">
                                    <label className="mb-1">
                                       <strong>Password</strong>
                                    </label>
                                    <input
                                       type="password"
                                       className="form-control"
                                       name="password"
                                       onChange={handleBlur}
                                       ref={passwordRef}
                                    />
                                 </div>
                                 <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                    <div className="form-group">
                                       <div className="custom-control custom-checkbox ml-1">
                                          <input
                                             type="checkbox"
                                             className="custom-control-input"
                                             id="basic_checkbox_1"
                                          />
                                          <label
                                             className="custom-control-label"
                                             htmlFor="basic_checkbox_1"
                                          >
                                             Remember my preference
                                          </label>
                                       </div>
                                    </div>
                                    <div className="form-group">
                                       <Link to="/page-forgot-password">
                                          Forgot Password?
                                       </Link>
                                    </div>
                                 </div>
                                 <div className="text-center">
                                    <input
                                       type="submit"
                                       value="Sign Me In"
                                       className="btn btn-primary btn-block"
                                    />
                                 </div>
                              </form>
                              { error && 
                                 <Alert
                                    className="alert-dismissible fade show mt-3"
                                    variant="warning"
                                 >
                                    <strong>{error}</strong>
                                 </Alert>
                              }
                              <div className="new-account mt-3">
                                 <p>
                                    Don't have an account?{" "}
                                    <Link
                                       className="text-primary"
                                       to="register"
                                    >
                                       Register
                                    </Link>
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
