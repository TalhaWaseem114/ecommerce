import bg_1 from "../../img/bg_1.jpg";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="hero-section">
      <div className="content-wrapper">
        <div className="content">
          <h3 className="subheading">Winkel ecommerce shop</h3>
          <div className="underline"></div>
          <p className="side-text">Stablished Since 2000</p>
          <h1 className="heading">
            Catch your own <br />
            <span className="bold">style & look</span>
          </h1>
          <p className="para">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia. It is a paradisematic country.
          </p>
          <button className="shope-now" onClick={() => navigate("/product")}>
            Shop Now
          </button>
        </div>
      </div>
      <div className="img-container">
        <img src={bg_1} alt="img" />
      </div>
    </div>
  );
}
