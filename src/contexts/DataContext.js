import React, { useState, useContext, useEffect } from "react";
import database from "../firebase";

const DataContext = React.createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [customerList, setCustomerList] = useState();
  const [riderList, setRiderList] = useState();
  const [productList, setProductList] = useState();
  const [orderList, setOrderList] = useState();
  const [unitList, setUnitList] = useState();
  const [deliveryLocList, setDeliveryLocList] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    database.ref("customer/").on("value", (snapshot) => {
      setCustomerList(snapshot.val());
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    database.ref("riders/").on("value", (snapshot) => {
      setRiderList(snapshot.val());
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    database.ref("products/").on("value", (snapshot) => {
      setProductList(snapshot.val());
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    database.ref("orders/").on("value", (snapshot) => {
      setOrderList(snapshot.val());
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    database.ref("unit/").on("value", (snapshot) => {
      setUnitList(snapshot.val());
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    database.ref("delivery/").on("value", (snapshot) => {
      setDeliveryLocList(snapshot.val());
      setLoading(false);
    });
  }, []);

  const value = {
    customerList,
    riderList,
    productList,
    orderList,
    unitList,
    deliveryLocList,
  };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
};
