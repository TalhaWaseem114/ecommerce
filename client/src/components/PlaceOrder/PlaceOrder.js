import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import "./PlaceOrder.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { clearCart } from "../../redux/cartSlice";

export default function PlaceOrder() {
  // -->URL OF BACKEND SERVER
  const [url, setUrl] = useState("http://localhost:5000/")

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingAddress, cartItems } = useSelector(
    (state) => state.cartReducer
  );
  const { userInfo } = useSelector((state) => state.authReducer);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23s
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  const shippingPrice = itemsPrice > 100 ? round2(0) : round2(10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      toast.success(data);
      navigate(`/orderCompleted`);
      dispatch(clearCart());
      localStorage.removeItem("cartItems");
    } catch (error) {
      toast.error("Can not placed the order");
    }
  };

  return (
    <div className="place-order">
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      {/* ---------------page header- start------------- */}
      <div className="page-header container-fluid">
        <div className="links">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/cart">cart</Link>
          <span>/</span>
          <p>place order</p>
        </div>
        <h3>PLACE ORDER</h3>
      </div>
      {/* ---------------page header- end-------------- */}

      <div className="container">
        <div className="row-1">

          <div className="shipping-card">
            <h3>Shipping Address</h3>
            <div className="name">
              <span className="bold">Name  </span>
              <p className="name-text">{shippingAddress.firstName} {shippingAddress.lastName}</p>
            </div>
            <div className="address">
              <span className="bold">Address  </span>
              <p>{shippingAddress.address}, {shippingAddress.city} ,
                {shippingAddress.postalCode},{shippingAddress.country}</p>
            </div>
            <Link to="/shipping" className="btn-link">
              Edit
            </Link>
          </div>

          <div className="payment-card">
            <h3>Payment</h3>
            <div className="name">
              <span className="bold">Payment Method </span>
              <p>Cash on delivery</p>
            </div>
          </div>

          <div className="items-card">
            <h3>Cart Items</h3>
            {cartItems &&
              cartItems.map((item) => (
                <div className="cart-flex" key={item._id}>
                  <div className="img-wrapper">
                    <img src={`${url}${item.image}`} alt={item.name} />
                  </div>
                  <Link to={`/productDetail/${item.slug}`}>{item.name}</Link>
                  <p className="price">
                    <span className="bold">Price :</span> ${item.price}
                  </p>
                </div>
              ))}
            <Link to="/cart" className="btn-cart">
              Edit
            </Link>
          </div>
        </div>

        {/* ---------------------ORDER SUMMERY------------------ */}
        <div className="summary">
          <h2>Order Summary</h2>
          <div className="summary-flex border-bottom">
            <p>Items</p>
            <p className="value">${itemsPrice}</p>
          </div>
          <div className="summary-flex border-bottom">
            <p>Shipping</p>
            <p className="value">${shippingPrice}</p>
          </div>
          <div className="summary-flex border-bottom">
            <p>Tax</p>
            <p className="value">${taxPrice}</p>
          </div>
          <div className="summary-flex">
            <p className="bold">Total Price</p>
            <p className="value">${totalPrice}</p>
          </div>
          <button className="place-order-btn" onClick={placeOrderHandler}>
            Place Order
          </button>

        </div>
      </div>
    </div>
  );
}
