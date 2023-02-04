import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { userUpdate } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.authReducer);

  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const { data } = await axios.put(
          "http://localhost:5000/api/users/profile",
          {
            _id: userInfo._id,
            name,
            email,
            password,
          }
        );
        dispatch(userUpdate(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
        toast.success("Successfully Updated !");
        navigate("/");
      } catch (error) {
        toast.error("Failed to Update Profile !");
      }
    }
  };

  return (
    <div className="profile">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <div className="profile-wrapper">
        <div className="img-wrapper">
          <div className="content">
            <h1>Great deal. <br />Unbeatable value.</h1>
            <p>Buy and sell platform for all.</p>
          </div>
        </div>
        <div className="form-container">
          <div className="form-center">
            <h1>Profile</h1>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Enter your Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <input
                type="password"
                placeholder="Confirm your Password"
                required
                email={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
