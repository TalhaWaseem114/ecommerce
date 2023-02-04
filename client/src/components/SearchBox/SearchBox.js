import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBox.css";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [style, setStyle] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/product/?search=${query}` : "/product");
    setShowSearchBox(false)
  };
  return (
    <>
      {showSearchBox && (
        <div className="search-box">
          <i className="fa-solid fa-xmark" onClick={()=>setShowSearchBox(false)}></i>
          <form onSubmit={submitHandler} className="search-form container">
            <div className="search-wrapper">
              <input
                type="text"
                className={style ? "search-input input-lg" : "search-input"}
                onFocus={() => setStyle(true)}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ..."
              />
              <button type="submit" className="search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
