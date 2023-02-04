import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { addToCart } from "../../redux/cartSlice";
// import { getUser } from "../../redux/productSlice";
// import Loading from "../Loading/Loading";
import Rating from "../Rating/Rating";

import product_1 from "../../img/product-1.jpg";
import product_2 from "../../img/product-2.jpg";
import product_3 from "../../img/product-6.jpg";
import product_4 from "../../img/product-4.jpg";

export default function Products() {

  return (
    <div className="product-section">
      <div className="container">
        <h1 className="section-heading">Products</h1>
        <p className="section-para">
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia
        </p>

        <div className="products">
          <div className="product product1" id="products">
            <div className="img-wrapper" style={{padding:0}}>
              <img src={product_1} alt="product img" />
              <div className="img-wrapper-content">
                <Link to={"/product"}>Shop Now</Link>
              </div>
            </div>
            <div className="card-content">
              <h3 className="title">Floral Jackquard Pullover</h3>
              <div className="card-flex">
                <p className="price">$120</p>
                <Rating size={0.85} />
              </div>
            </div>
          </div>

          <div className="product product2" id="products">
            <div className="img-wrapper" style={{padding:0}}>
              <img src={product_2} alt="product img" />
              <div className="img-wrapper-content">
                <Link to={"/product"}>Shop Now</Link>
              </div>
            </div>
            <div className="card-content">
              <h3 className="title">Floral Jackquard Pullover</h3>
              <div className="card-flex">
                <p className="price">$90</p>
                <Rating size={0.85} />
              </div>
            </div>
          </div>

          <div className="product product3" id="products">
            <div className="img-wrapper" style={{padding:0}}>
              <img src={product_3} alt="product img" />
              <div className="img-wrapper-content">
                <Link to={"/product"}>Shop Now</Link>
              </div>
            </div>
            <div className="card-content">
              <h3 className="title">Floral Jackquard Pullover</h3>
              <div className="card-flex">
                <p className="price">$130</p>
                <Rating size={0.85} />
              </div>
            </div>
          </div>

          <div className="product product4" id="products">
            <div className="img-wrapper" style={{padding:0}}>
              <img src={product_4} alt="product img" />
              <div className="img-wrapper-content">
                <Link to={"/product"}>Shop Now</Link>
              </div>
            </div>
            <div className="card-content">
              <h3 className="title">Floral Jackquard Pullover</h3>
              <div className="card-flex">
                <p className="price">$180</p>
                <Rating size={0.85} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
