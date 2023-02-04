import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Shipping.css";
import { saveShippingAddress } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function ShippingAddress() {
  const { shippingAddress } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.authReducer);
  const userInfoSize = Object.keys(userInfo).length;

  const [shippingData, setShippingData] = useState({
    firstName: shippingAddress.firstName || "",
    lastName: shippingAddress.lastName || "",
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    postalCode: shippingAddress.postalCode || "",
    country: shippingAddress.country || "",
    message: shippingAddress.message || "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(shippingData));
    localStorage.setItem("shippingAddress", JSON.stringify(shippingData));
    navigate("/placeOrder");
  };

  useEffect(() => {
    if (userInfoSize <= 0) {
      navigate("/signin?redirect=/shipping");
    }
  }, [navigate, userInfoSize]);

  return (
    <div className="shipping">
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>

      {/* ---------------page header- start------------- */}
      <div className="page-header container-fluid">
        <div className="links">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/cart">cart</Link>
          <span>/</span>
          <p>Checkout</p>
        </div>
        <h3>SHIPPING ADDRESS</h3>
      </div>
      {/* ---------------page header- end-------------- */}

      <div className="address-wrapper">
        <form onSubmit={submitHandler}>
          <div className="inputs-container">
            <div className="input-slice">
              <label htmlFor="fname">first name</label>
              <input
                type="text"
                placeholder="First Name *"
                required
                id="fname"
                value={shippingData.firstName}
                onChange={(e) =>
                  setShippingData({
                    ...shippingData,
                    firstName: e.target.value,
                  })
                }
              />
            </div>
            <div className="input-slice">
              <label htmlFor="lname">last name</label>
              <input
                type="text"
                placeholder="Last Name *"
                required
                id="lname"
                value={shippingData.lastName}
                onChange={(e) =>
                  setShippingData({ ...shippingData, lastName: e.target.value })
                }
              />
            </div>

            <div className="input-slice">
              <label htmlFor="address">address</label>
              <input
                type="text"
                placeholder="Enter Address"
                required
                id="address"
                value={shippingData.address}
                onChange={(e) =>
                  setShippingData({ ...shippingData, address: e.target.value })
                }
              />
            </div>
            <div className="input-slice">
              <label htmlFor="city">city</label>
              <input
                type="text"
                placeholder="Enter your City"
                required
                id="city"
                value={shippingData.city}
                onChange={(e) =>
                  setShippingData({ ...shippingData, city: e.target.value })
                }
              />
            </div>
            <div className="input-slice">
              <label htmlFor="postCode">post code</label>
              <input
                type="text"
                placeholder="Enter your Postal code"
                required
                id="postCode"
                value={shippingData.postalCode}
                onChange={(e) =>
                  setShippingData({ ...shippingData, postalCode: e.target.value })
                }
              />
            </div>
            <div className="input-slice">
              <label htmlFor="country">country</label>
              <input
                type="text"
                placeholder="Enter your Country"
                required
                id="country"
                value={shippingData.country}
                onChange={(e) =>
                  setShippingData({ ...shippingData, country: e.target.value })
                }
              />
            </div>

            <textarea
              type="text"
              placeholder="Note about your order, e.g special notes for delivery"
              required
              value={shippingData.message}
              onChange={(e) =>
                setShippingData({ ...shippingData, message: e.target.value })
              }
            />
          </div>

          <div className="info-card">
            <div className="shipping-charges">
              <h3>shipping charges</h3>
              <p>No delivery charges for local customer.Other have to pay 10%</p>
              <h3>tax</h3>
              <p>15% tax will be applied on every product.</p>
            </div>
            <button type="submit">Continue</button>
            <Link to={"/cart"}>Cart</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
