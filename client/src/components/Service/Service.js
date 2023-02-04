import "./Service.css";
import serviceImg1 from "../../img/service img1.png";
import serviceImg2 from "../../img/service img2.png";
import serviceImg3 from "../../img/service img3.png";

export default function Service({ bgLight }) {
  return (
    <div className={bgLight ? "service-wrapper bgLight" : "service-wrapper"}>
      <div className="container">
        <h1 className="title">Why Choose Us?</h1>
        <div className="service-grid">
          <div className="service-card">
            <img src={serviceImg1} alt="img" />
            <h3>Free Delivery</h3>
            <p>
              If you are going to use of Lorem, you need to be sure there
              anything
            </p>
          </div>
          <div className="service-card service-card-middle">
            <img src={serviceImg2} alt="img" />
            <h3>30 Day Return</h3>
            <p>
              If you are going to use of Lorem, you need to be sure there
              anything
            </p>
          </div>
          <div className="service-card">
            <img src={serviceImg3} alt="img" />
            <h3>27/4 Support</h3>
            <p>
              If you are going to use of Lorem, you need to be sure there
              anything
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
