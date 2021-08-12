import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../../contexts/AuthContext'

const Register = ({ history }) => {
   const [registrationData, setRegistrationData] = useState({});

   /// Authentication
   const emailRef = useRef()
   const passwordRef = useRef()
   const passwordConfirmRef = useRef()
   const { signUp } = useAuth()
   const [error, setError] = useState('')
   const [loading, setLoading] = useState(false)

   const handleBlur = (e) => {
      const newRegistrationData = { ...registrationData };
      newRegistrationData[e.target.name] = e.target.value;
      setRegistrationData(newRegistrationData);
   };
   const submitHandler = async(e) => {
      e.preventDefault();

      if(passwordRef.current.value !== passwordConfirmRef.current.value) {
         return setError('Passwords do not match')
      }
      
      try{
         setError('')
         setLoading(true)
         await signUp(emailRef.current.value, passwordRef.current.value)
      } catch {
         setError('Failed to create an account')
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
                                 Sign up your account
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
                                       placeholder="hello@example.com"
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
                                       defaultValue="Password"
                                       name="password"
                                       onChange={handleBlur}
                                       ref={passwordRef}
                                    />
                                 </div>
                                 <div className="form-group">
                                    <label className="mb-1">
                                       <strong>Confirm Password</strong>
                                    </label>
                                    <input
                                       type="password"
                                       className="form-control"
                                       defaultValue="Password"
                                       name="password"
                                       onChange={handleBlur}
                                       ref={passwordConfirmRef}
                                    />
                                 </div>
                                 <div className="text-center mt-4">
                                    <input
                                       type="submit"
                                       value=" Sign me up"
                                       className="btn btn-primary btn-block"
                                       disabled={loading}
                                    />
                                 </div>
                              </form>
                              <div className="new-account mt-3">
                                 <p>
                                    Already have an account?{" "}
                                    <Link
                                       className="text-primary"
                                       to="/page-login"
                                    >
                                       Sign in
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

export default Register;
