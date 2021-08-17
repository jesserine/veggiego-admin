import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
//** Import Image */
import profile01 from "../../../images/profile/1.jpg";
import profile02 from "../../../images/profile/2.jpg";
import profile03 from "../../../images/profile/3.jpg";
import profile04 from "../../../images/profile/4.jpg";
import profile05 from "../../../images/profile/5.jpg";
import profile06 from "../../../images/profile/6.jpg";
import profile07 from "../../../images/profile/7.jpg";
import profile08 from "../../../images/profile/8.jpg";
import profile09 from "../../../images/profile/9.jpg";
import profile from "../../../images/profile/kmb.jpeg";
import { Dropdown, Button, Modal } from "react-bootstrap";

import PageTitle from "../../layouts/PageTitle";

import { SRLWrapper } from "simple-react-lightbox";

const Profile = () => {
   const [activeToggle, setActiveToggle] = useState("posts");
   const [sendMessage, setSendMessage] = useState(false);

   const [replay, setReplay] = useState(false);

   const options = {
      settings: {
         overlayColor: "#000000",
      },
   };
   return (
      <Fragment>

         <div className="row">
            <div className="col-lg-12">
               <div className="profile card card-body px-3 pt-3 pb-0">
                  <div className="profile-head">
                     <div className="photo-content">
                        <div className="cover-photo"></div>
                     </div>
                     <div className="profile-info">
                        <div className="profile-photo">
                           <img
                              src={profile}
                              className="img-fluid rounded-circle"
                              alt="profile"
                           />
                        </div>
                        <div className="profile-details">
                           <div className="profile-name px-3 pt-2">
                              <h4 className="text-primary mb-0">
                                 Kent Michael Baguion
                              </h4>
                              <p>Super Admin</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         
         </div>
         <div className="row">
            
            <div className="col-xl-12">
               <div className="card">
                  <div className="card-body">
                     <h4 className="text-primary">
                        Settings
                     </h4>
                     <div className="profile-tab">
                        <div className="custom-tab-1">
                           <ul className="nav nav-tabs">
                              <li
                                 className="nav-item"
                                 onClick={() => setActiveToggle("posts")}
                              >
                                 <Link
                                    to="#my-posts"
                                    data-toggle="tab"
                                    className={`nav-link ${
                                       activeToggle === "posts"
                                          ? "active show"
                                          : ""
                                    }`}
                                 >
                                    Posts
                                 </Link>
                              </li>
                              <li
                                 className="nav-item"
                                 onClick={() => setActiveToggle("aboutMe")}
                              >
                                 <Link
                                    to="#about-me"
                                    data-toggle="tab"
                                    className={`nav-link ${
                                       activeToggle === "aboutMe"
                                          ? "active show"
                                          : ""
                                    }`}
                                 >
                                    Product
                                 </Link>
                              </li>
                              <li className="nav-item">
                                 <Link
                                    to="#profile-settings"
                                    data-toggle="tab"
                                    onClick={() => setActiveToggle("setting")}
                                    className={`nav-link ${
                                       activeToggle === "setting"
                                          ? "active show"
                                          : ""
                                    }`}
                                 >
                                    Profile
                                 </Link>
                              </li>
                              
                           </ul>
                           <div className="tab-content">
                              <div
                                 id="my-posts"
                                 className={`tab-pane fade ${
                                    activeToggle === "posts"
                                       ? "active show"
                                       : ""
                                 }`}
                              >
                                 <div className="my-post-content pt-3">
                                    <div className="post-input">
                                       <textarea
                                          name="textarea"
                                          id="textarea"
                                          cols="30"
                                          rows="5"
                                          className="form-control bg-transparent"
                                          defaultValue="Please type what you want...."
                                       />
                                       <Link
                                          to="/app-profile"
                                          className="btn btn-primary light px-3"
                                       >
                                          <i className="fa fa-link" />
                                       </Link>
                                       <Link
                                          to="/app-profile"
                                          className="btn btn-primary light mr-1 px-3 ml-1"
                                       >
                                          <i className="fa fa-camera" />
                                       </Link>
                                       <Link
                                          to="/app-profile"
                                          className="btn btn-primary"
                                       >
                                          Post
                                       </Link>
                                    </div>
                                    <div className="profile-uoloaded-post border-bottom-1 pb-5">
                                       <img
                                          src={profile08}
                                          alt=""
                                          className="img-fluid"
                                       />
                                       <Link
                                          className="post-title"
                                          to="/post-details"
                                       >
                                          <h4>
                                             Collection of textile samples lay
                                             spread
                                          </h4>
                                       </Link>
                                       <p>
                                          A wonderful serenity has take
                                          possession of my entire soul like
                                          these sweet morning of spare which
                                          enjoy whole heart.A wonderful serenity
                                          has take possession of my entire soul
                                          like these sweet morning of spare
                                          which enjoy whole heart.
                                       </p>
                                       <button className="btn btn-primary mr-2">
                                          <span className="mr-2">
                                             <i className="fa fa-heart" />
                                          </span>
                                          Like
                                       </button>
                                       <button
                                          className="btn btn-secondary"
                                          onClick={() => setReplay(true)}
                                       >
                                          <span className="mr-2">
                                             <i className="fa fa-reply" />
                                          </span>
                                          Reply
                                       </button>
                                    </div>
                                    <div className="profile-uoloaded-post border-bottom-1 pb-5">
                                       <img
                                          src={profile09}
                                          alt=""
                                          className="img-fluid"
                                       />
                                       <Link
                                          className="post-title"
                                          to="/post-details"
                                       >
                                          <h4>
                                             Collection of textile samples lay
                                             spread
                                          </h4>
                                       </Link>
                                       <p>
                                          A wonderful serenity has take
                                          possession of my entire soul like
                                          these sweet morning of spare which
                                          enjoy whole heart.A wonderful serenity
                                          has take possession of my entire soul
                                          like these sweet morning of spare
                                          which enjoy whole heart.
                                       </p>
                                       <button className="btn btn-primary mr-2">
                                          <span className="mr-2">
                                             <i className="fa fa-heart" />
                                          </span>
                                          Like
                                       </button>
                                       <button
                                          className="btn btn-secondary"
                                          onClick={() => setReplay(true)}
                                       >
                                          <span className="mr-2">
                                             <i className="fa fa-reply" />
                                          </span>
                                          Reply
                                       </button>
                                    </div>
                                    <div className="profile-uoloaded-post pb-3">
                                       <img
                                          src={profile08}
                                          alt=""
                                          className="img-fluid"
                                       />
                                       <Link
                                          className="post-title"
                                          to="/post-details"
                                       >
                                          <h4>
                                             Collection of textile samples lay
                                             spread
                                          </h4>
                                       </Link>
                                       <p>
                                          A wonderful serenity has take
                                          possession of my entire soul like
                                          these sweet morning of spare which
                                          enjoy whole heart.A wonderful serenity
                                          has take possession of my entire soul
                                          like these sweet morning of spare
                                          which enjoy whole heart.
                                       </p>
                                       <button className="btn btn-primary mr-2">
                                          <span className="mr-2">
                                             <i className="fa fa-heart" />
                                          </span>
                                          Like
                                       </button>
                                       <button
                                          className="btn btn-secondary"
                                          onClick={() => setReplay(true)}
                                       >
                                          <span className="mr-2">
                                             <i className="fa fa-reply" />
                                          </span>
                                          Reply
                                       </button>
                                    </div>
                                    
                                 </div>
                              </div>
                              <div
                                 id="about-me"
                                 className={`tab-pane fade ${
                                    activeToggle === "aboutMe"
                                       ? "active show"
                                       : ""
                                 }`}
                              >
                                 <div className="profile-about-me">
                                    <div className="pt-4 border-bottom-1 pb-3">
                                       
                                       <p className="mb-2">
                                          A wonderful serenity has taken
                                          possession of my entire soul, like
                                          these sweet mornings of spring which I
                                          enjoy with my whole heart. I am alone,
                                          and feel the charm of existence was
                                          created for the bliss of souls like
                                          mine.I am so happy, my dear friend, so
                                          absorbed in the exquisite sense of
                                          mere tranquil existence, that I
                                          neglect my talents.
                                       </p>
                                       <p>
                                          A collection of textile samples lay
                                          spread out on the table - Samsa was a
                                          travelling salesman - and above it
                                          there hung a picture that he had
                                          recently cut out of an illustrated
                                          magazine and housed in a nice, gilded
                                          frame.
                                       </p>
                                    </div>
                                 </div>
                                 <div className="profile-skills mb-5">
                                    <h4 className="text-primary mb-2">
                                       Skills
                                    </h4>
                                    <Link
                                       to="/app-profile"
                                       className="btn btn-primary light btn-xs mb-1 mr-1"
                                    >
                                       Admin
                                    </Link>
                                    <Link
                                       to="/app-profile"
                                       className="btn btn-primary light btn-xs mb-1 mr-1"
                                    >
                                       Dashboard
                                    </Link>
                                    <Link
                                       to="/app-profile"
                                       className="btn btn-primary light btn-xs mb-1 mr-1"
                                    >
                                       Photoshop
                                    </Link>
                                    <Link
                                       to="/app-profile"
                                       className="btn btn-primary light btn-xs mb-1 mr-1"
                                    >
                                       Bootstrap
                                    </Link>
                                    <Link
                                       to="/app-profile"
                                       className="btn btn-primary light btn-xs mb-1 mr-1"
                                    >
                                       Responsive
                                    </Link>
                                    <Link
                                       to="/app-profile"
                                       className="btn btn-primary light btn-xs mb-1 mr-1"
                                    >
                                       Crypto
                                    </Link>
                                 </div>
                                 <div className="profile-lang  mb-5">
                                    <h4 className="text-primary mb-2">
                                       Language
                                    </h4>
                                    <Link
                                       to="/app-profile"
                                       className="text-muted pr-3 f-s-16"
                                    >
                                       <i className="flag-icon flag-icon-us" />
                                       English
                                    </Link>
                                    <Link
                                       to="/app-profile"
                                       className="text-muted pr-3 f-s-16"
                                    >
                                       <i className="flag-icon flag-icon-fr" />
                                       French
                                    </Link>
                                    <Link
                                       to="/app-profile"
                                       className="text-muted pr-3 f-s-16"
                                    >
                                       <i className="flag-icon flag-icon-bd" />
                                       Bangla
                                    </Link>
                                 </div>
                                 <div className="profile-personal-info">
                                    <h4 className="text-primary mb-4">
                                       Personal Information
                                    </h4>
                                    <div className="row mb-2">
                                       <div className="col-sm-3 col-5">
                                          <h5 className="f-w-500">
                                             Name
                                             <span className="pull-right">
                                                :
                                             </span>
                                          </h5>
                                       </div>
                                       <div className="col-sm-9 col-7">
                                          <span>Mitchell C.Shay</span>
                                       </div>
                                    </div>
                                    <div className="row mb-2">
                                       <div className="col-sm-3 col-5">
                                          <h5 className="f-w-500">
                                             Email
                                             <span className="pull-right">
                                                :
                                             </span>
                                          </h5>
                                       </div>
                                       <div className="col-sm-9 col-7">
                                          <span>example@examplel.com</span>
                                       </div>
                                    </div>
                                    <div className="row mb-2">
                                       <div className="col-sm-3 col-5">
                                          <h5 className="f-w-500">
                                             Availability
                                             <span className="pull-right">
                                                :
                                             </span>
                                          </h5>
                                       </div>
                                       <div className="col-sm-9 col-7">
                                          <span>Full Time (Free Lancer)</span>
                                       </div>
                                    </div>
                                    <div className="row mb-2">
                                       <div className="col-sm-3 col-5">
                                          <h5 className="f-w-500">
                                             Age
                                             <span className="pull-right">
                                                :
                                             </span>
                                          </h5>
                                       </div>
                                       <div className="col-sm-9 col-7">
                                          <span>27</span>
                                       </div>
                                    </div>
                                    <div className="row mb-2">
                                       <div className="col-sm-3 col-5">
                                          <h5 className="f-w-500">
                                             Location
                                             <span className="pull-right">
                                                :
                                             </span>
                                          </h5>
                                       </div>
                                       <div className="col-sm-9 col-7">
                                          <span>
                                             Rosemont Avenue Melbourne, Florida
                                          </span>
                                       </div>
                                    </div>
                                    <div className="row mb-2">
                                       <div className="col-sm-3 col-5">
                                          <h5 className="f-w-500">
                                             Year Experience
                                             <span className="pull-right">
                                                :
                                             </span>
                                          </h5>
                                       </div>
                                       <div className="col-sm-9 col-7">
                                          <span>07 Year Experiences</span>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div
                                 id="profile-settings"
                                 className={`tab-pane fade ${
                                    activeToggle === "setting"
                                       ? "active show"
                                       : ""
                                 }`}
                              >
                                 <div className="pt-3">
                                    <div className="settings-form">
                                       {/* <h4 className="text-primary">
                                          Account Settings
                                       </h4> */}
                                       <form
                                          onSubmit={(e) => e.preventDefault()}
                                       >
                                          <div className="form-row">
                                             <div className="form-group col-md-6">
                                                <label>Email</label>
                                                <input
                                                   type="email"
                                                   placeholder="Email"
                                                   className="form-control"
                                                />
                                             </div>
                                             <div className="form-group col-md-6">
                                                <label>Password</label>
                                                <input
                                                   type="password"
                                                   placeholder="Password"
                                                   className="form-control"
                                                />
                                             </div>
                                          </div>
                                          <div className="form-group">
                                             <label>Address</label>
                                             <input
                                                type="text"
                                                placeholder="1234 Main St"
                                                className="form-control"
                                             />
                                          </div>
                                          <div className="form-group">
                                             <label>Address 2</label>
                                             <input
                                                type="text"
                                                placeholder="Apartment, studio, or floor"
                                                className="form-control"
                                             />
                                          </div>
                                          <div className="form-row">
                                             <div className="form-group col-md-6">
                                                <label>City</label>
                                                <input
                                                   type="text"
                                                   className="form-control"
                                                />
                                             </div>
                                             <div className="form-group col-md-4">
                                                <label>State</label>
                                                <select
                                                   className="form-control"
                                                   id="inputState"
                                                   defaultValue="option-1"
                                                >
                                                   <option value="option-1">
                                                      Choose...
                                                   </option>
                                                   <option value="option-2">
                                                      Option 1
                                                   </option>
                                                   <option value="option-3">
                                                      Option 2
                                                   </option>
                                                   <option value="option-4">
                                                      Option 3
                                                   </option>
                                                </select>
                                             </div>
                                             <div className="form-group col-md-2">
                                                <label>Zip</label>
                                                <input
                                                   type="text"
                                                   className="form-control"
                                                />
                                             </div>
                                          </div>
                                          <div className="form-group">
                                             <div className="custom-control custom-checkbox">
                                                <input
                                                   type="checkbox"
                                                   className="custom-control-input"
                                                   id="gridCheck"
                                                />
                                                <label
                                                   className="custom-control-label"
                                                   htmlFor="gridCheck"
                                                >
                                                   Check me out
                                                </label>
                                             </div>
                                          </div>
                                          <button
                                             className="btn btn-primary"
                                             type="submit"
                                          >
                                             Sign in
                                          </button>
                                       </form>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default Profile;
