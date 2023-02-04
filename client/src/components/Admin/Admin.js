import React, { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { NavLink, Route, Routes } from "react-router-dom";
import AdminMain from "./AdminMain";
import Users from "./Users";
import Product from "./Product";
import Order from "./Order"
import AddProduct from "./AddProduct";

export default function Admin() {
  const [authentication, setAuthentication] = useState(false);
  const [email, setEmail] = useState("");
  const [expandSideBar, setExpandSideBar] = useState(true)

  const { userInfo } = useSelector((state) => state.authReducer);

  useEffect(() => {
    setEmail(userInfo.email);
  }, [userInfo.email]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/auth",
        { email }
      );
      if (data.userType === "admin") {
        setAuthentication(true);
      }
    };
    getUser();
  }, [email]);

  return (
    <div className="admin">
      {!authentication ? (
        "Authentication..."
      ) : (
        <div className={expandSideBar ? "admin-screen" : "admin-screen admin-screen-expand"}>
          <div className={expandSideBar ? "sidebar" : "sidebar sidebar-shrink"}>
          <h1 className="logo">W</h1>
            <button className="btn-align" onClick={() => setExpandSideBar(!expandSideBar)}>
            {expandSideBar ? (<i className="fa-solid fa-arrow-left"></i>) : (<i className="fa-solid fa-arrow-right"></i>)}
            </button>
            <NavLink to={"/adminDashboard/"} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
              {expandSideBar ? 'Admin' : (<i className="fa-solid fa-user-secret"></i>)}
            </NavLink>
            <NavLink to={"/adminDashboard/users"} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
              {expandSideBar ? 'Users' : (<i className="fa-solid fa-users"></i>)}
            </NavLink>
            <NavLink to={"/adminDashboard/product"} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
              {expandSideBar ? 'Product' : (<i className="fa-brands fa-product-hunt"></i>)}
            </NavLink>
            <NavLink to={"/adminDashboard/order"} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
              {expandSideBar ? 'Orders' : (<i className="fa-solid fa-clipboard-list"></i>)}
            </NavLink>
            <NavLink to={"/adminDashboard/addProduct"} className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
              {expandSideBar ? 'Add Product' : (<i className="fa-solid fa-plus"></i>)}
            </NavLink>
          </div>
          <div className="screen">
            <Routes>
              <Route path="/" element={<AdminMain />} />
              <Route path="/users" element={<Users />} />
              <Route path="/product" element={<Product />} />
              <Route path="/order" element={<Order />} />
              <Route path="/addProduct" element={<AddProduct />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
}
