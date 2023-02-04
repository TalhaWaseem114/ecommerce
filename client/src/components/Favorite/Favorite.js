import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Favorite.css";
import { addToCart } from "../../redux/cartSlice";
import axios from "axios";

export default function Favorite() {
  // -->URL OF BACKEND SERVER
  const [url, setUrl] = useState("http://localhost:5000/");

  const dispatch = useDispatch();

  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [reFetch, setReFetch] = useState();

  const { userInfo } = useSelector((state) => state.authReducer);

  // =====================//////////--DELETING FAVORITE PRODUCT
  const deleteFavorite = async (_id) => {
    const { data } = await axios.delete(
      `http://localhost:5000/api/products/favorite/${_id}`
    );
    console.log(data);
    setReFetch(data);
  };

  // =====================//////////--FETCHING ALL FAVORITE PRODUCT WHEN COMPONENT RENDER
  useEffect(() => {
    const getFavorite = async () => {
      const { data } = await axios.post(
        `http://localhost:5000/api/products/favorite/getAllFavorites`,
        { userName: userInfo.name, userEmail: userInfo.email }
      );
      setFavoriteProducts(data);
      setReFetch(data);
    };
    getFavorite();
  }, [userInfo.email, userInfo.name, reFetch]);

  return (
    <div className="favorite-wrapper">
      <h1 className="heading">Favorite wrapper</h1>
      <div className="favorite-flex">
        {!favoriteProducts
          ? "loading..."
          : favoriteProducts.map((product, index) => (
              <div className="favorite-item" key={index}>
                <div className="img-wrapper">
                  <button
                    className="delete"
                    onClick={() => deleteFavorite(product._id)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <img
                    src={`${url}${product.image}`}
                    alt={product.name}
                    className={product.category==="shoe"?'img-fit-width-fav':null}
                  />
                </div>
                <div className="content">
                  <Link to={`/productDetail/${product.slug}`}>
                    {product.name}
                  </Link>
                  <p className="price">${product.price}</p>
                  <button
                    className="cart-btn"
                    onClick={() =>
                      dispatch(addToCart({ ...product, quantity: 1 }))
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
