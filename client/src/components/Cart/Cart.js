import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { removeToCart } from "../../redux/cartSlice";
import { useEffect, useState } from "react";

export default function Cart() {
  // -->URL OF BACKEND SERVER
  const [url, setUrl] = useState("http://localhost:5000/")

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);

  const removeHandler = (item) => {
    dispatch(removeToCart(item));
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div className="cart">
      <Helmet>
        <title>Cart</title>
      </Helmet>

      {/* ---------------page header- start------------- */}
      <div className="page-header container-fluid">
        <div className="links">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/product">product</Link>
          <span>/</span>
          <p>cart</p>
        </div>
        <h3>SHOPPING CART</h3>
      </div>
      {/* ---------------page header- end-------------- */}

      {cartItems.length > 0 ? (
        <div className="cart-wrapper container">
          <h3 className="total-item-header">Your selection <span>({cartItems.length} Items)</span></h3>
          <div className="cart-grid">
            <div className="row-1">
              <div className="cart-header">
                <p>remove</p>
                <p>Product</p>
                <p>subtotal</p>
              </div>
              <div className="cart-flex">
                {cartItems.map((item,index) => (
                  <div className="cart-item" key={index}>
                    <div className="img-wrapper">
                      <button
                        className="delete"
                        onClick={() => removeHandler(item)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                      <img src={`${url}${item.image}`} alt={item.name} />
                    </div>
                    <Link to={`/productDetail/${item.slug}`} className="name">
                      {item.name}
                    </Link>
                    <p className="price">${item.price}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="total">
              <h1>Cart Total</h1>
              <div className="price">
                <h3>Total</h3>
                <span>${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}</span>
              </div>
              <button onClick={checkoutHandler}>Proceed to Checkout</button>
              <Link to="/product">Continue Shopping</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/product" className="shopping">
            Go Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
