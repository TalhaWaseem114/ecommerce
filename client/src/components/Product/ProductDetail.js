import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../../redux/productSlice";
import { addToCart } from "../../redux/cartSlice";
import Rating from "../Rating/Rating";
import { Helmet } from "react-helmet-async";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProductDetail() {
  // -->URL OF BACKEND SERVER
  const [url, setUrl] = useState("http://localhost:5000/");

  const [isAdded, setIsAdded] = useState(false);
  const [selected, setSelected] = useState("large");
  const [selectShow, setSelectShow] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.authReducer);
  const { product, isLoading, relatedCategory } = useSelector(
    (state) => state.productReducer
  );

  const [categoryData, setCategoryData] = useState();

  useEffect(() => {
    dispatch(getSingleUser(slug));
  }, [slug, dispatch]);


  // =>fetching related products
  useEffect(() => {
    const fetchCategory = async () => {
      const { data } = await axios.post(`http://localhost:5000/api/products/`, {
        category: relatedCategory,
      });
      setCategoryData(data.products);
    };
    fetchCategory();
  }, [relatedCategory]);

  const addToCartHandler = async () => {
    if (isAdded) {
      navigate("/cart", { replace: true });
    } else {
      setIsAdded(true);
      dispatch(addToCart({ ...product, quantity: 1, size: selected }));
    }
  };

  const favoriteHandler = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/products/favorite`,
        { userInfo: { userName: userInfo.name, userEmail: userInfo.email }, product }
      );
      console.log(data)
    } catch (error) {
      // console.log(error.message)
      // toast.info("Product is already in Wishlist");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="product-detail">
          {/* ---------------page header-------------top-aligned */}
          <div className="page-header container-fluid">
            <div className="links">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/product">product</Link>
              <span>/</span>
              <p>product detail</p>
            </div>
            <h3>SINGLE PRODUCT</h3>
          </div>
          {/* ---------------page header------end-------- */}

          <div className="container">
            {/* ------------------------------SINGLE PRODUCTS--------------------------center */}
            <div className="product-wrapper ">
              <div className="image-wrapper">
                <img src={`${url}${product.image}`} alt={product.name} />
              </div>
              <div className="content">
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>

                <p className="product-name">{product.name}</p>
                <div className="rating-flex">
                  <p>{product.rating}</p>
                  <Rating
                    rating={product.rating}
                    numReviews={product.noOfReview}
                  />
                </div>
                <p className="product-price">${product.price}</p>
                <p className="product-description"> {product.description}</p>

                {/* -----------------SIZE-------------- */}
                {product.size && (
                  <div className="product-select" onClick={() => setSelectShow(!selectShow)} >
                    <h3>
                      {selected}
                      <i className="fa-solid fa-caret-down"></i>
                    </h3>
                    {selectShow && (
                      <div className="select-list">
                        {product.size.map((s) => (
                          <p key={s} className="product-size"
                            onClick={() => {
                              setSelected(s);
                              setSelectShow(false);
                            }}
                          >
                            {s}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="status">
                  {product.countInStock > 0 ? (
                    <>
                      <div className="btn-flex">
                        <button onClick={addToCartHandler} className="btn-add">
                          {!isAdded ? "Add to Cart" : "Check the Cart"}
                        </button>
                        <button className="btn-fav" onClick={favoriteHandler}>
                          <i className="fa-solid fa-heart"></i>
                        </button>
                      </div>
                      <div className="in-stock">
                        <p className="tag">
                          {product.countInStock} pieces available
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="out-stock">
                      <p className="tag">
                        Availability : <span>Out of Stoke</span>
                      </p>
                    </div>
                  )}
                </div>
                <div className="share">
                  <h3>Share :</h3>
                  <div className="links">
                    <a href="https://www.facebook.com/">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com/">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href="https://www.pinterest.com/">
                      <i className="fa-brands fa-pinterest-p"></i>
                    </a>
                    <a href="https://www.reddit.com/">
                      <i className="fa-brands fa-reddit-alien"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------RELATED PRODUCTS-------------------------- */}
          {categoryData && (
            <div className="related-product">
              <div className="container">
                <h1 className="header">Related Products</h1>
                <div className="product-grid">
                  {categoryData.map((product) => (
                    <div className="product" key={product.slug} id="products">
                      <div className="img-wrapper">
                        <img src={`${url}${product.image}`} alt={product.name} className={product.category==="shoe"?'img-fit-width':null}/>
                        <div className="img-wrapper-content">
                          <button onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))} className="btn-cart" >
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
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
