import React, { useState, useContext, useEffect } from "react";
import database from "../firebase";

const DataContext = React.createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [customerList, setCustomerList] = useState(null);
  const [riderList, setRiderList] = useState(null);
  const [productList, setProductList] = useState(null);
  const [orderList, setOrderList] = useState(null);
  const [unitList, setUnitList] = useState(null);
  const [deliveryLocList, setDeliveryLocList] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const [deliveryLocationList, setDeliveryLocationList] = useState(null);

  const [loading, setLoading] = useState(true);

  /// Get all customers from firebase
  useEffect(() => {
    database.ref("customer/").once("value", (snapshot) => {
      setCustomerList(snapshot.val());
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    database.ref("riders/").once("value", (snapshot) => {
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

  useEffect(() => {
    database.ref("category/").on("value", (snapshot) => {
      setCategoryList(snapshot.val());
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    database.ref("deliveryLoations/").on("value", (snapshot) => {
      setCategoryList(snapshot.val());
      setLoading(false);
    });
  }, []);

  const value = {
    customerList,
    setCustomerList,
    riderList,
    productList,
    orderList,
    unitList,
    deliveryLocList,
    categoryList,
    deliveryLocationList,
    setLoading,
  };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
};
