import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import "./Signin.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userSignIn } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../../img/login bg.jpg"

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ============if the user already sign in it will redirect to home / shipping page======
  const { userInfo } = useSelector((state) => state.authReducer);
  const userInfoSize = Object.keys(userInfo).length;

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signin",
        {
          email,
          password,
        }
      );
      // console.log(data)
      dispatch(userSignIn(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
      toast.success("Successfully Sign In !");
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  useEffect(() => {
    if (userInfoSize > 0) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfoSize]);

  return (
    <div className="sign-in">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <div className="sign-in-wrapper">
        <div className="img-wrapper">
          <div className="content">
            <h1>Great deal. <br />Unbeatable value.</h1>
            <p>Buy and sell platform for all.</p>
          </div>
        </div>
        <div className="form-container">
          <div className="form-center">
            <h1>Sign In</h1>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Enter your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your Password"
                required
                email={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Sign In</button>
              <p>
                New consumer?
                <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
