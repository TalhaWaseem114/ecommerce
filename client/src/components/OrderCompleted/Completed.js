import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import "./Completed.css";

export default function Completed() {
  return (
    <div className="completed">
      <Helmet>
        <title>Order Completed</title>
      </Helmet>
      {/* ---------------page header- start------------- */}
      <div className="page-header container-fluid">
        <div className="links">
          <Link to="/">Home</Link>
          <span>/</span>
          <p>Order Completed</p>
        </div>
        <h3>ORDER COMPLETED</h3>
      </div>

      <div className="container">
        <i className="fa-solid fa-circle-check"></i>
        <h3>Your Order Is Completed!</h3>
        <p>
          Thank you for your order! Your order is being processed and will be
          completed within 3-6 hours. You will receive an email confirmation
          when your order is completed.
        </p>
        <Link to="/product">Continue Shopping</Link>
      </div>
    </div>
  );
}
