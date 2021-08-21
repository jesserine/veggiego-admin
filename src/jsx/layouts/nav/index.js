import React, { Fragment, useState } from "react";
import SideBar from "./SideBar";
import NavHeader from "./NavHeader";
import Header from "./Header";

const JobieNav = ({ title, showProfileSideBar, showProfile }) => {
   const [toggle, setToggle] = useState("");
   const onClick = (name) => setToggle(toggle === name ? "" : name);
   return (
      <Fragment>
         <NavHeader />
         <SideBar />
         <Header
            onNote={() => onClick("chatbox")}
            onNotification={() => onClick("notification")}
            onProfile={() => onClick("profile")}
            toggle={toggle}   
            title={title}
            onBox={() => onClick("box")}
            showProfileSideBar={showProfileSideBar}
            showProfile={showProfile}
         />
      </Fragment>
   );
};

export default JobieNav;
