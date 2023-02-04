import React, { useState } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userSignOut } from "../../redux/authSlice";
import { saveShippingAddress } from "../../redux/cartSlice";
import SearchBox from "../SearchBox/SearchBox";
import cartImg from "../../img/cart.png";
import SearchBtn from "../../img/search-btn.png";
import FavoriteBtn from "../../img/favorite-btn.png";
import Favorite from "../Favorite/Favorite";

export default function Header() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);

  const { cartItems } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.authReducer);
  const userInfoSize = Object.keys(userInfo).length;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // =================/////////////--ON SIGN OUT CLEAR LOCAL STORAGE DATA
  const signOutHandler = () => {
    dispatch(userSignOut("sign out"));
    dispatch(saveShippingAddress({}));
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("cartItems");
    toast.success("Log out !");
  };

  return (
    <>
      <header className="app-header">

        <Link to="/" className="brand">
          Winkel
        </Link>

        {/* ---page navigating links-----------center-aligned */}
        <div className="mid-header">
          <p onClick={() => { navigate("/"); setShowSearchBox(false); }}>Home</p>
          <p onClick={() => { navigate("/product"); setShowSearchBox(false); }}>Shop</p>
          <p onClick={() => { navigate("/about"); setShowSearchBox(false); }}>About us</p>
          <p onClick={() => { navigate("/contact"); setShowSearchBox(false); }}>Contact us</p>
        </div>

        {/* ---favorite and search btn------------left-aligned */}
        <div className="header-right">
          {userInfoSize > 0 && (
            <button type="submit" className="favorite-btn" onClick={() => setShowFavorite(!showFavorite)} >
              <img src={FavoriteBtn} alt="Favorite" />
            </button>
          )}
          <button type="submit" className="search-btn" onClick={() => setShowSearchBox(!showSearchBox)} >
            <img src={SearchBtn} alt="search" />
          </button>
          <Link to="/cart" className="cart-link">
            <img src={cartImg} alt="cart" className="cart-icon" />
            <span>{cartItems.reduce((a, c) => a + c.quantity, 0)}</span>
          </Link>
          {userInfoSize > 0 ? (
            <div className="user">
              <p onClick={() => setShowDropDown(!showDropDown)} className="name">
                {userInfo.name.substring(0, 1)}
              </p>
              {showDropDown && (
                <div className="list">
                  {userInfo.userType === "admin" && (<Link to={"/adminDashboard"} className="dashboard-btn">Dashboard</Link>)}
                  <Link to="/profile">User Profile</Link>
                  <p onClick={signOutHandler}>Sign out</p>
                </div>
              )}
            </div>
          ) : (
            <Link className="nav-link" to="/signin">
              <i className="fa-solid fa-user"></i>
            </Link>
          )}
        </div>

        {/* ---------------------------FAVORITE BOX------------------------------ */}
        {showFavorite && <Favorite />}
      </header>

      {/* ----------------------------------SEARCH BOX------------------------------ */}
      {showSearchBox && <SearchBox />}
    </>
  );
}
