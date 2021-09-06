import React, { Component } from "react";

/// Link
import { Link } from "react-router-dom";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Menu
import MetisMenu from "metismenujs";

///
// import drump from "../../../images/card/drump.png";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new MetisMenu(this.$el);
  }
  componentWillUnmount() {
    // this.mm("dispose");
    // console.log(this.mm);
  }
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

class SideBar extends Component {
  /// Open menu
  componentDidMount() {
    // sidebar open/close
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");

    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);

    //sidebar icon Heart blast
    var handleheartBlast = document.querySelector(".heart");

    function heartBlast() {
      return handleheartBlast.classList.toggle("heart-blast");
    }

    handleheartBlast.addEventListener("click", heartBlast);
  }

  render() {
    /// Path
    var path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];

    /// Active menu
    let dashboard = ["", "dashboard"];
    let customers = ["customers", "customer-form"];
    let riders = ["riders"];
    let products = ["products"];
    let orders = ["orders, customer-order"];
    let settings = ["settings"];

    return (
      <div className="deznav">
        <PerfectScrollbar className="deznav-scroll">
          <MM className="metismenu" id="menu">
            <li className={`${dashboard.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon" to="/dashboard">
                <i className="flaticon-381-networking"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li className={`${customers.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon" to="/customers">
                <i className="flaticon-381-user-9"></i>
                <span className="nav-text">Customers</span>
              </Link>
            </li>

            <li className={`${riders.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon" to="/riders">
                <i className="las la-biking scale5"></i>
                <span className="nav-text">Riders</span>
              </Link>
            </li>

            <li className={`${products.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon" to="/products">
                <i className="las la-carrot scale5"></i>
                <span className="nav-text">Products</span>
              </Link>
            </li>

            <li className={`${orders.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon" to="/orders">
                <i className="la la-shopping-cart scale5"></i>
                <span className="nav-text">Orders</span>
              </Link>
            </li>

            <li className={`${settings.includes(path) ? "mm-active" : ""}`}>
              <Link className="has-arrow ai-icon" to="/settings">
                <i className="las la-cog scale5"></i>
                <span className="nav-text">Settings</span>
              </Link>
            </li>
          </MM>
          <div className="copyright">
            <p className="fs-14 font-w200">
              <strong className="font-w400">VeggieGo Dashboard</strong> © 2021
              All Rights Reserved
            </p>
            <p>
              Made with <span className="heart"></span> by Astradevlabs
            </p>
          </div>
        </PerfectScrollbar>
      </div>
    );
  }
}

export default SideBar;
