import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="intro">
          <h1 className="heading">Winkel</h1>
          <p className="detail text">
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia.
          </p>
        </div>
        <div className="menu">
          <h1 className="heading">Menu</h1>
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/">Shope</Link>
            <Link to="/">About</Link>
            <Link to="/">Contact us</Link>
          </div>
        </div>
        <div className="question">
          <h1 className="heading">HAVE A QUESTIONS?</h1>
          <div className="question-grid">
            <i className="fa-solid fa-location-dot"></i>
            <p className="text"> 203 Fake St. Mountain View, San Francisco, California, USA</p>
            <i className="fa-solid fa-phone"></i>
            <a href="tel:+03493771741" className="text">0349-3771741</a>
            <i className="fa-solid fa-envelope"></i>
            <a href="mailto:talhawaseem512@gmail.com" className="text">
              talhawaseem512@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
