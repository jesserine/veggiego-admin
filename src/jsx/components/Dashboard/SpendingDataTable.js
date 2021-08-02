import React, { useState, useRef, useEffect } from "react";
import { Table, Pagination, Badge, Dropdown } from "react-bootstrap";

import { Link } from "react-router-dom";

const SpendingDataTable = () => {
   const [data, setData] = useState(
      document.querySelectorAll("#spendingTable tbody tr")
   );
   const sort = 5;
   const activePag = useRef(0);
   const [test, settest] = useState(0);

   // Active data
   const chageData = (frist, sec) => {
      for (var i = 0; i < data.length; ++i) {
         if (i >= frist && i < sec) {
            data[i].classList.remove("d-none");
         } else {
            data[i].classList.add("d-none");
         }
      }
   };
   // use effect
   useEffect(() => {
      setData(document.querySelectorAll("#spendingTable tbody tr"));
      chackboxFun();
   }, [test]);

   // Active pagginarion
   activePag.current === 0 && chageData(0, sort);
   // paggination
   let paggination = Array(Math.ceil(data.length / sort))
      .fill()
      .map((_, i) => i + 1);

   // Active paggination & chage data
   const onClick = (i) => {
      activePag.current = i;
      chageData(activePag.current * sort, (activePag.current + 1) * sort);
      settest(i);
   };
   const chackbox = document.querySelectorAll(".all_spending_checkbox input");
   const motherChackBox = document.querySelector(".all_spending_strg input");
   // console.log(document.querySelectorAll(".all_spending_strg input")[0].checked);
   const chackboxFun = (type) => {
      for (let i = 0; i < chackbox.length; i++) {
         const element = chackbox[i];
         if (type === "all") {
            if (motherChackBox.checked) {
               element.checked = true;
            } else {
               element.checked = false;
            }
         } else {
            if (!element.checked) {
               motherChackBox.checked = false;
               break;
            } else {
               motherChackBox.checked = true;
            }
         }
      }
   };

   return (
      <>
         <div className="table-responsive">
            <div className="dataTables_wrapper no-footer">
               <table
                  id="spendingTable"
                  className="display mb-4 dataTablesCard card-table dataTable no-footer"
                  style={{ width: "100%" }}
               >
                  <thead>
                     <tr role="row">
                        <th
                           className="pr-0 no-data-img all_spending_strg"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-sort="ascending"
                           style={{ width: 32 }}
                        >
                           <div className="custom-control custom-checkbox ml-2">
                              <input
                                 type="checkbox"
                                 onClick={() => chackboxFun("all")}
                                 className="custom-control-input"
                                 id="checkAll"
                                 required
                              />
                              <label
                                 className="custom-control-label"
                                 htmlFor="checkAll"
                              />
                           </div>
                        </th>
                        <th
                           className="sorting"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-label="Ads ID: activate to sort column ascending"
                           style={{ width: 87 }}
                        >
                           Ads ID
                        </th>
                        <th
                           className="sorting"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-label="Date Published: activate to sort column ascending"
                           style={{ width: 124 }}
                        >
                           Date Published
                        </th>
                        <th
                           className="sorting"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-label="Yesterday Spending: activate to sort column ascending"
                           style={{ width: 162 }}
                        >
                           Yesterday Spending
                        </th>
                        <th
                           className="sorting"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-label="Today Spending: activate to sort column ascending"
                           style={{ width: 130 }}
                        >
                           Today Spending
                        </th>
                        <th
                           className="sorting"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-label="Total Spending: activate to sort column ascending"
                           style={{ width: 122 }}
                        >
                           Total Spending
                        </th>
                        <th
                           className="sorting"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-label="Remaining: activate to sort column ascending"
                           style={{ width: 87 }}
                        >
                           Remaining
                        </th>
                        <th
                           className="sorting"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-label=": activate to sort column ascending"
                           style={{ width: 46 }}
                        />
                        <th
                           className="sorting"
                           tabIndex={0}
                           aria-controls="example5"
                           rowSpan={1}
                           colSpan={1}
                           aria-label=": activate to sort column ascending"
                           style={{ width: 24 }}
                        />
                     </tr>
                  </thead>
                  <tbody>
                     <tr role="row" className="odd">
                        <td className="pr-0 all_spending_checkbox">
                           <div className="custom-control custom-checkbox ml-2">
                              <input
                                 type="checkbox"
                                 onClick={() => chackboxFun()}
                                 className="custom-control-input"
                                 id="customCheckBox6"
                                 required
                              />
                              <label
                                 className="custom-control-label"
                                 htmlFor="customCheckBox6"
                              />
                           </div>
                        </td>
                        <td>#ADS01231</td>
                        <td>26 March 2020, 12:42 AM</td>
                        <td>
                           <span className="font-w600">$4,521.21</span>
                        </td>
                        <td>
                           <span className="font-w600">$5,415.51</span>
                        </td>
                        <td>
                           <span className="font-w600">$245,173.02</span>
                        </td>
                        <td>
                           <span className="font-w600 text-primary">
                              $67,234.66
                           </span>
                        </td>
                        <td>
                           <span className="p-2 rounded border">
                              <svg
                                 width={28}
                                 height={28}
                                 viewBox="0 0 28 28"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                                    fill="#52B141"
                                 />
                              </svg>
                           </span>
                        </td>
                        <td>
                           <Dropdown className="dropdown ml-auto">
                              <Dropdown.Toggle
                                 variant=""
                                 className="icon-false p-0 btn-link"
                                 data-toggle="dropdown"
                              >
                                 <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                 </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M22 4L12 14.01L9 11.01"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Accept order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M15 9L9 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M9 9L15 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Reject order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 16V12"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 8H12.01"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    View Details
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </td>
                     </tr>
                     <tr role="row" className="even">
                        <td className="pr-0 all_spending_checkbox">
                           <div className="custom-control custom-checkbox ml-2">
                              <input
                                 type="checkbox"
                                 onClick={() => chackboxFun()}
                                 className="custom-control-input"
                                 id="customCheckBox7"
                                 required
                              />
                              <label
                                 className="custom-control-label"
                                 htmlFor="customCheckBox7"
                              />
                           </div>
                        </td>
                        <td>#ADS01232</td>
                        <td>26 March 2020, 12:42 AM</td>
                        <td>
                           <span className="font-w600">$4,521.21</span>
                        </td>
                        <td>
                           <span className="font-w600">$5,415.51</span>
                        </td>
                        <td>
                           <span className="font-w600">$245,173.02</span>
                        </td>
                        <td>
                           <span className="font-w600 text-primary">
                              $67,234.66
                           </span>
                        </td>
                        <td>
                           <span className="p-2 rounded border">
                              <svg
                                 width={28}
                                 height={28}
                                 viewBox="0 0 28 28"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                                    fill="#52B141"
                                 />
                              </svg>
                           </span>
                        </td>
                        <td>
                           <Dropdown className="dropdown ml-auto">
                              <Dropdown.Toggle
                                 variant=""
                                 className="icon-false p-0 btn-link"
                                 data-toggle="dropdown"
                              >
                                 <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                 </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M22 4L12 14.01L9 11.01"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Accept order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M15 9L9 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M9 9L15 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Reject order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 16V12"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 8H12.01"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    View Details
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </td>
                     </tr>
                     <tr role="row" className="odd">
                        <td className="pr-0 all_spending_checkbox">
                           <div className="custom-control custom-checkbox ml-2">
                              <input
                                 type="checkbox"
                                 onClick={() => chackboxFun()}
                                 className="custom-control-input"
                                 id="customCheckBox8"
                                 required
                              />
                              <label
                                 className="custom-control-label"
                                 htmlFor="customCheckBox8"
                              />
                           </div>
                        </td>
                        <td>#ADS01233</td>
                        <td>26 March 2020, 12:42 AM</td>
                        <td>
                           <span className="font-w600">$4,521.21</span>
                        </td>
                        <td>
                           <span className="font-w600">$5,415.51</span>
                        </td>
                        <td>
                           <span className="font-w600">$245,173.02</span>
                        </td>
                        <td>
                           <span className="font-w600 text-primary">
                              $67,234.66
                           </span>
                        </td>
                        <td>
                           <span className="p-2 rounded border">
                              <svg
                                 width={28}
                                 height={28}
                                 viewBox="0 0 28 28"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                                    fill="#52B141"
                                 />
                              </svg>
                           </span>
                        </td>
                        <td>
                           <Dropdown className="dropdown ml-auto">
                              <Dropdown.Toggle
                                 variant=""
                                 className="icon-false p-0 btn-link"
                                 data-toggle="dropdown"
                              >
                                 <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                 </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M22 4L12 14.01L9 11.01"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Accept order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M15 9L9 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M9 9L15 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Reject order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 16V12"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 8H12.01"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    View Details
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </td>
                     </tr>
                     <tr role="row" className="even">
                        <td className="pr-0 all_spending_checkbox">
                           <div className="custom-control custom-checkbox ml-2">
                              <input
                                 type="checkbox"
                                 onClick={() => chackboxFun()}
                                 className="custom-control-input"
                                 id="customCheckBox9"
                                 required
                              />
                              <label
                                 className="custom-control-label"
                                 htmlFor="customCheckBox9"
                              />
                           </div>
                        </td>
                        <td>#ADS01234</td>
                        <td>26 March 2020, 12:42 AM</td>
                        <td>
                           <span className="font-w600">$4,521.21</span>
                        </td>
                        <td>
                           <span className="font-w600">$5,415.51</span>
                        </td>
                        <td>
                           <span className="font-w600">$245,173.02</span>
                        </td>
                        <td>
                           <span className="font-w600 text-primary">
                              $67,234.66
                           </span>
                        </td>
                        <td>
                           <span className="p-2 rounded border">
                              <svg
                                 width={28}
                                 height={28}
                                 viewBox="0 0 28 28"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                                    fill="#52B141"
                                 />
                              </svg>
                           </span>
                        </td>
                        <td>
                           <Dropdown className="dropdown ml-auto">
                              <Dropdown.Toggle
                                 variant=""
                                 className="icon-false p-0 btn-link"
                                 data-toggle="dropdown"
                              >
                                 <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                 </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M22 4L12 14.01L9 11.01"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Accept order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M15 9L9 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M9 9L15 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Reject order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 16V12"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 8H12.01"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    View Details
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </td>
                     </tr>
                     <tr role="row" className="odd">
                        <td className="pr-0 all_spending_checkbox">
                           <div className="custom-control custom-checkbox ml-2">
                              <input
                                 type="checkbox"
                                 onClick={() => chackboxFun()}
                                 className="custom-control-input"
                                 id="customCheckBox71"
                                 required
                              />
                              <label
                                 className="custom-control-label"
                                 htmlFor="customCheckBox71"
                              />
                           </div>
                        </td>
                        <td>#ADS01235</td>
                        <td>26 March 2020, 12:42 AM</td>
                        <td>
                           <span className="font-w600">$4,521.21</span>
                        </td>
                        <td>
                           <span className="font-w600">$5,415.51</span>
                        </td>
                        <td>
                           <span className="font-w600">$245,173.02</span>
                        </td>
                        <td>
                           <span className="font-w600 text-primary">
                              $67,234.66
                           </span>
                        </td>
                        <td>
                           <span className="p-2 rounded border">
                              <svg
                                 width={28}
                                 height={28}
                                 viewBox="0 0 28 28"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                                    fill="#52B141"
                                 />
                              </svg>
                           </span>
                        </td>
                        <td>
                           <Dropdown className="dropdown ml-auto">
                              <Dropdown.Toggle
                                 variant=""
                                 className="icon-false p-0 btn-link"
                                 data-toggle="dropdown"
                              >
                                 <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                 </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M22 4L12 14.01L9 11.01"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Accept order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M15 9L9 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M9 9L15 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Reject order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 16V12"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 8H12.01"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    View Details
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </td>
                     </tr>
                     <tr role="row" className="even">
                        <td className="pr-0 all_spending_checkbox">
                           <div className="custom-control custom-checkbox ml-2">
                              <input
                                 type="checkbox"
                                 onClick={() => chackboxFun()}
                                 className="custom-control-input"
                                 id="customCheckBox72"
                                 required
                              />
                              <label
                                 className="custom-control-label"
                                 htmlFor="customCheckBox72"
                              />
                           </div>
                        </td>
                        <td>#ADS01236</td>
                        <td>26 March 2020, 12:42 AM</td>
                        <td>
                           <span className="font-w600">$4,521.21</span>
                        </td>
                        <td>
                           <span className="font-w600">$5,415.51</span>
                        </td>
                        <td>
                           <span className="font-w600">$245,173.02</span>
                        </td>
                        <td>
                           <span className="font-w600 text-primary">
                              $67,234.66
                           </span>
                        </td>
                        <td>
                           <span className="p-2 rounded border">
                              <svg
                                 width={28}
                                 height={28}
                                 viewBox="0 0 28 28"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                                    fill="#52B141"
                                 />
                              </svg>
                           </span>
                        </td>
                        <td>
                           <Dropdown className="dropdown ml-auto">
                              <Dropdown.Toggle
                                 variant=""
                                 className="icon-false p-0 btn-link"
                                 data-toggle="dropdown"
                              >
                                 <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                 </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M22 4L12 14.01L9 11.01"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Accept order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M15 9L9 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M9 9L15 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Reject order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 16V12"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 8H12.01"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    View Details
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </td>
                     </tr>
                     <tr role="row" className="odd">
                        <td className="pr-0 all_spending_checkbox">
                           <div className="custom-control custom-checkbox ml-2">
                              <input
                                 type="checkbox"
                                 onClick={() => chackboxFun()}
                                 className="custom-control-input"
                                 id="customCheckBox76"
                                 required
                              />
                              <label
                                 className="custom-control-label"
                                 htmlFor="customCheckBox76"
                              />
                           </div>
                        </td>
                        <td>#ADS01237</td>
                        <td>26 March 2020, 12:42 AM</td>
                        <td>
                           <span className="font-w600">$4,521.21</span>
                        </td>
                        <td>
                           <span className="font-w600">$5,415.51</span>
                        </td>
                        <td>
                           <span className="font-w600">$245,173.02</span>
                        </td>
                        <td>
                           <span className="font-w600 text-primary">
                              $67,234.66
                           </span>
                        </td>
                        <td>
                           <span className="p-2 rounded border">
                              <svg
                                 width={28}
                                 height={28}
                                 viewBox="0 0 28 28"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                                    fill="#52B141"
                                 />
                              </svg>
                           </span>
                        </td>
                        <td>
                           <Dropdown className="dropdown ml-auto">
                              <Dropdown.Toggle
                                 variant=""
                                 className="icon-false p-0 btn-link"
                                 data-toggle="dropdown"
                              >
                                 <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                 </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M22 4L12 14.01L9 11.01"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Accept order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M15 9L9 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M9 9L15 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Reject order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 16V12"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 8H12.01"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    View Details
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </td>
                     </tr>
                     <tr role="row" className="even">
                        <td className="pr-0 all_spending_checkbox">
                           <div className="custom-control custom-checkbox ml-2">
                              <input
                                 type="checkbox"
                                 onClick={() => chackboxFun()}
                                 className="custom-control-input"
                                 id="customCheckBox75"
                                 required
                              />
                              <label
                                 className="custom-control-label"
                                 htmlFor="customCheckBox75"
                              />
                           </div>
                        </td>
                        <td>#ADS01238</td>
                        <td>26 March 2020, 12:42 AM</td>
                        <td>
                           <span className="font-w600">$4,521.21</span>
                        </td>
                        <td>
                           <span className="font-w600">$5,415.51</span>
                        </td>
                        <td>
                           <span className="font-w600">$245,173.02</span>
                        </td>
                        <td>
                           <span className="font-w600 text-primary">
                              $67,234.66
                           </span>
                        </td>
                        <td>
                           <span className="p-2 rounded border">
                              <svg
                                 width={28}
                                 height={28}
                                 viewBox="0 0 28 28"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                                    fill="#52B141"
                                 />
                              </svg>
                           </span>
                        </td>
                        <td>
                           <Dropdown className="dropdown ml-auto">
                              <Dropdown.Toggle
                                 variant=""
                                 className="icon-false p-0 btn-link"
                                 data-toggle="dropdown"
                              >
                                 <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                 </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M22 4L12 14.01L9 11.01"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Accept order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M15 9L9 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M9 9L15 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Reject order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 16V12"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 8H12.01"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    View Details
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </td>
                     </tr>
                     <tr role="row" className="odd">
                        <td className="pr-0 all_spending_checkbox">
                           <div className="custom-control custom-checkbox ml-2">
                              <input
                                 type="checkbox"
                                 onClick={() => chackboxFun()}
                                 className="custom-control-input"
                                 id="customCheckBox77"
                                 required
                              />
                              <label
                                 className="custom-control-label"
                                 htmlFor="customCheckBox77"
                              />
                           </div>
                        </td>
                        <td>#ADS01239</td>
                        <td>26 March 2020, 12:42 AM</td>
                        <td>
                           <span className="font-w600">$4,521.21</span>
                        </td>
                        <td>
                           <span className="font-w600">$5,415.51</span>
                        </td>
                        <td>
                           <span className="font-w600">$245,173.02</span>
                        </td>
                        <td>
                           <span className="font-w600 text-primary">
                              $67,234.66
                           </span>
                        </td>
                        <td>
                           <span className="p-2 rounded border">
                              <svg
                                 width={28}
                                 height={28}
                                 viewBox="0 0 28 28"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                                    fill="#52B141"
                                 />
                              </svg>
                           </span>
                        </td>
                        <td>
                           <Dropdown className="dropdown ml-auto">
                              <Dropdown.Toggle
                                 variant=""
                                 className="icon-false p-0 btn-link"
                                 data-toggle="dropdown"
                              >
                                 <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                 </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M22 4L12 14.01L9 11.01"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Accept order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M15 9L9 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M9 9L15 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Reject order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 16V12"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 8H12.01"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    View Details
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </td>
                     </tr>
                     <tr role="row" className="even">
                        <td className="pr-0 all_spending_checkbox">
                           <div className="custom-control custom-checkbox ml-2">
                              <input
                                 type="checkbox"
                                 onClick={() => chackboxFun()}
                                 className="custom-control-input"
                                 id="customCheckBox70"
                                 required
                              />
                              <label
                                 className="custom-control-label"
                                 htmlFor="customCheckBox70"
                              />
                           </div>
                        </td>
                        <td>#ADS012310</td>
                        <td>26 March 2020, 12:42 AM</td>
                        <td>
                           <span className="font-w600">$4,521.21</span>
                        </td>
                        <td>
                           <span className="font-w600">$5,415.51</span>
                        </td>
                        <td>
                           <span className="font-w600">$245,173.02</span>
                        </td>
                        <td>
                           <span className="font-w600 text-primary">
                              $67,234.66
                           </span>
                        </td>
                        <td>
                           <span className="p-2 rounded border">
                              <svg
                                 width={28}
                                 height={28}
                                 viewBox="0 0 28 28"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                              >
                                 <path
                                    d="M7.875 15.75H2.625C2.14175 15.75 1.75 16.1418 1.75 16.625V25.375C1.75 25.8582 2.14175 26.25 2.625 26.25H7.875C8.35825 26.25 8.75 25.8582 8.75 25.375V16.625C8.75 16.1418 8.35825 15.75 7.875 15.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M25.375 8.75H20.125C19.6418 8.75 19.25 9.14175 19.25 9.625V25.375C19.25 25.8582 19.6418 26.25 20.125 26.25H25.375C25.8582 26.25 26.25 25.8582 26.25 25.375V9.625C26.25 9.14175 25.8582 8.75 25.375 8.75Z"
                                    fill="#52B141"
                                 />
                                 <path
                                    d="M16.625 1.75H11.375C10.8918 1.75 10.5 2.14175 10.5 2.625V25.375C10.5 25.8582 10.8918 26.25 11.375 26.25H16.625C17.1082 26.25 17.5 25.8582 17.5 25.375V2.625C17.5 2.14175 17.1082 1.75 16.625 1.75Z"
                                    fill="#52B141"
                                 />
                              </svg>
                           </span>
                        </td>
                        <td>
                           <Dropdown className="dropdown ml-auto">
                              <Dropdown.Toggle
                                 variant=""
                                 className="icon-false p-0 btn-link"
                                 data-toggle="dropdown"
                              >
                                 <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                 >
                                    <path
                                       d="M11.0005 12C11.0005 12.5523 11.4482 13 12.0005 13C12.5528 13 13.0005 12.5523 13.0005 12C13.0005 11.4477 12.5528 11 12.0005 11C11.4482 11 11.0005 11.4477 11.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M18.0005 12C18.0005 12.5523 18.4482 13 19.0005 13C19.5528 13 20.0005 12.5523 20.0005 12C20.0005 11.4477 19.5528 11 19.0005 11C18.4482 11 18.0005 11.4477 18.0005 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                    <path
                                       d="M4.00049 12C4.00049 12.5523 4.4482 13 5.00049 13C5.55277 13 6.00049 12.5523 6.00049 12C6.00049 11.4477 5.55277 11 5.00049 11C4.4482 11 4.00049 11.4477 4.00049 12Z"
                                       stroke="#3E4954"
                                       strokeWidth={2}
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                 </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M22 4L12 14.01L9 11.01"
                                          stroke="#209F84"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Accept order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M15 9L9 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M9 9L15 15"
                                          stroke="#F24242"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    Reject order
                                 </Dropdown.Item>
                                 <Dropdown.Item className="dropdown-item text-black">
                                    <svg
                                       className="mr-3"
                                       width={24}
                                       height={24}
                                       viewBox="0 0 24 24"
                                       fill="none"
                                       xmlns="http://www.w3.org/2000/svg"
                                    >
                                       <path
                                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 16V12"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                       <path
                                          d="M12 8H12.01"
                                          stroke="#6F6F6F"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                       />
                                    </svg>
                                    View Details
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </td>
                     </tr>
                  </tbody>
               </table>
               <div className="d-sm-flex text-center justify-content-between align-items-center">
                  <div className="dataTables_info" id="example5_info">
                     Showing {activePag.current * sort + 1} to{" "}
                     {data.length > (activePag.current + 1) * sort
                        ? (activePag.current + 1) * sort
                        : data.length}{" "}
                     of {data.length} entries
                  </div>
                  <div className="dataTables_paginate paging_simple_numbers">
                     <Link
                        to="/spendings"
                        className="paginate_button previous disabled"
                        aria-controls="example5"
                        onClick={() =>
                           activePag.current > 0 &&
                           onClick(activePag.current - 1)
                        }
                     >
                        Previous
                     </Link>
                     <span>
                        {paggination.map((number, i) => (
                           <Link
                              key={i}
                              to="/spendings"
                              className={`paginate_button  ${
                                 activePag.current === i ? "current" : ""
                              }`}
                              onClick={() => onClick(i)}
                           >
                              {number}
                           </Link>
                        ))}
                     </span>
                     <Link
                        to="/spendings"
                        className="paginate_button next"
                        onClick={() =>
                           activePag.current + 1 < paggination.length &&
                           onClick(activePag.current + 1)
                        }
                     >
                        Next
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default SpendingDataTable;
