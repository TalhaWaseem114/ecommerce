import React, { useEffect, useState } from "react";
import "./Product.css";
import { useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
import { Link, useLocation } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";
import axios from "axios";
import Rating from "../Rating/Rating";
import { Helmet } from "react-helmet-async";

export default function Product() {
  // -->URL OF BACKEND SERVER
  const [url, setUrl] = useState("http://localhost:5000/");

  // -->for handling search query
  const { search, state } = useLocation();
  const queryParams = new URLSearchParams(search);
  const name = queryParams.get("search");

  // -->STATE RELATED TO STORING FETCHED DATA
  const [sortList, setSortList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [fetchCategory, setFetchCategory] = useState("");
  const [filterCompany, setFilterCompany] = useState("")
  const [filterColor, setFilterColor] = useState("")

  // -->STATES USED IN FILTER
  const [price, setPrice] = useState({ lowVal: 1, heighVal: 100 });
  const [rating, setRating] = useState();
  const [category, setCategory] = useState(state || "");
  const [company, setCompany] = useState()
  const [color, setColor] = useState()
  const [sortBy, setSortBy] = useState("price");

  // -->FUNCTIONS FOR FETCHING DATA
  const filterData = async () => {
    const { data } = await axios.post(`http://localhost:5000/api/products/`);
    // console.log(data)
    setFetchCategory([...new Set(data.products.map((product) => product.category))]);
    setFilterCompany([...new Set(data.products.map((product) => product.brand))]);
    setFilterColor([...new Set(data.products.map((product) => product.color))])
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.post(
        `http://localhost:5000/api/products/`,
        {
          minPrice: Number(price.lowVal),
          maxPrice: Number(price.heighVal),
          rating,
          category,
          company,
          sortBy,
          name,
          color
        }
      );
      setProducts(data.products);
      setIsLoading(false);
      // console.log(data.products)
    };
    filterData();
    fetchData();
  }, [price, rating, category, company, sortBy, name, color]);

  // -->ADD TO CART FUNCTIONALITY
  const dispatch = useDispatch();
  const addToCartHandler = async (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <div className="all-product">
      <Helmet>
        <title>Shop</title>
      </Helmet>
      {/* --------------------------------PAGE HEADER-------------------------- */}
      <div className="page-header container-fluid">
        <div className="links">
          <Link to="/">Home</Link>
          <span>/</span>
          <p>Shop</p>
        </div>
        <h3>COLLECTION PRODUCTS</h3>
      </div>

      <div className="container">
        {/* --------------------------------FILTER SIDEBAR-------------------------- */}
        <aside className="filter">
          <div className="clothing category">
            <h3 className="sub-heading">Categories</h3>
            <p onClick={() => setCategory()}>All</p>
            {fetchCategory &&
              fetchCategory.map((c) => (
                <p key={c} onClick={() => setCategory(c)}>
                  {c}
                </p>
              ))}
          </div>
          <div className="company category">
            <h3 className="sub-heading">Companies</h3>
            <p onClick={() => setCompany()}>All</p>
            {filterCompany &&
              filterCompany.map((c) => (
                <p key={c} onClick={() => setCompany(c)}>
                  {c}
                </p>
              ))}
          </div>
          <div className="price category">
            <h3 className="sub-heading">Price</h3>
            <p>from : ${price.lowVal}</p>
            <input type="range" min="1" max="100" value={price.lowVal} onChange={(e) => setPrice({ ...price, lowVal: e.target.value })} />
            <p>Upto : ${price.heighVal}</p>
            <input type="range" min="1" max="100" value={price.heighVal} onChange={(e) => setPrice({ ...price, heighVal: e.target.value })} />
          </div>
          <div className="color category">
            <h3 className="sub-heading">Colors</h3>
            <p onClick={() => setColor()}>All</p>
            <div className="color-flex">
              {filterColor &&
                filterColor.map((c) => (
                  <div key={c} onClick={() => setColor(c)} className="filter-color" style={{ backgroundColor: `${c}` }}></div>
                ))}
            </div>
          </div>
          <div className="rating category">
            <h3 className="sub-heading">Rating</h3>
            <p onClick={() => setRating(5)}>
              {" "}
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </p>
            <p onClick={() => setRating(4)}>
              {" "}
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </p>
            <p onClick={() => setRating(3)}>
              {" "}
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </p>
            <p onClick={() => setRating(2)}>
              {" "}
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </p>
            <p onClick={() => setRating(1)}>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </p>
            <p onClick={() => setRating()}>Clear Rating</p>
          </div>
        </aside>
        {/* -------------------------------FILTER SIDEBAR-end----------------------- */}

        {/* --------------------------------PRODUCT SECTION------------------------- */}
        <div className="product-data">
          <div className="product-upper">
            <h1>Search Results</h1>
            <div className="sort">
              <p onClick={() => setSortList(!sortList)}>
                <i className="fa-solid fa-arrow-down-short-wide"></i>
                Sort{" "}
                <span>
                  {sortBy === "price" ? "Low to High" : "High to Low"}
                </span>
              </p>
              {sortList && (
                <div className="list">
                  <p onClick={() => { setSortBy("-price"); setSortList(false); }}  > High to Low </p>
                  <p onClick={() => { setSortBy("price"); setSortList(false); }} > Low to High </p>
                </div>
              )}
            </div>
          </div>

          {/* ---------------------list of applied filter */}
          <div className="apply-filter-slice">
            {category && <div><span>{category}</span> <button onClick={() => setCategory()}><i className="fa-solid fa-circle-xmark"></i></button></div>}
            {company && <div><span>{company} </span><button onClick={() => setCompany()}><i className="fa-solid fa-circle-xmark"></i></button></div>}
            {rating && <div> <i className="fa-solid fa-star"></i><span>{rating}</span><button onClick={() => setRating()}><i className="fa-solid fa-circle-xmark"></i></button></div>}
            {color && <div style={{ backgroundColor: `${color}` }} className="color-applied-filter"><span></span><button onClick={() => setColor()}><i className="fa-solid fa-circle-xmark"></i></button></div>}
          </div>

          <div className="products">
            {isLoading ? (
              <Loading />
            ) : (
              products.map((product) => (
                <div className="product" key={product.slug} id="products">
                  <div className="img-wrapper">
                    <img src={`${url}${product.image}`} alt={product.name} />
                    <div className="img-wrapper-content">
                      <button
                        onClick={() => addToCartHandler(product)}
                        className="btn-cart"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="card-content">
                    <Link to={`/productDetail/${product.slug}`}>
                      <h3 className="title">{product.name}</h3>
                      <div className="card-flex">
                        <p className="price">${product.price}</p>
                        <Rating
                          size={0.85}
                          rating={product.rating}
                          numReviews={product.noOfReview}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* --------------------------------PRODUCT SECTION-end------------------------ */}

      </div>
    </div>
  );
}
