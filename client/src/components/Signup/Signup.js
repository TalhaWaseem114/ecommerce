import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { userCreate } from "../../redux/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ============if the user already sign in it will redirect to home / shipping page======
  const { userInfo } = useSelector((state) => state.authReducer);
  const userInfoSize = Object.keys(userInfo).length;

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {

        // WE WILL USE THIS WHILE UPLOADING IMAGE
        // const formData = new FormData();
        // formData.append("name", name);
        // formData.append("email", email);
        // formData.append("password", password);
        // formData.append("image", image);

        const { data } = await axios.post(
          "http://localhost:5000/api/users/signup",
          {
            name,
            email,
            password
          }
        );
        // console.log(data)
        localStorage.setItem("userInfo", JSON.stringify(data));
        dispatch(userCreate(data));
        navigate(redirect || "/");
        toast.success("Successfully Sign Up !");
      } catch (error) {
        toast.error("Failed to create account !");
      }
    }
  };

  useEffect(() => {
    if (userInfoSize > 0) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfoSize]);

  return (
    <div className="sign-up">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="sign-up-wrapper">
        <div className="img-wrapper">
          <div className="content">
            <h1>Great deal. <br />Unbeatable value.</h1>
            <p>Buy and sell platform for all.</p>
          </div>
        </div>
        <div className="form-container">
          <div className="form-center">
            <h1>Sign Up</h1>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Enter your Name"
                autoComplete="off"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter your Email"
                autoComplete="off"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your Password"
                autoComplete="off"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm your Password"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">Sign Up</button>
            </form>
            <p>
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
