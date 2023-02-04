import { Link } from "react-router-dom";

import about_1 from "../../img/about-1.jpg";
import about_2 from "../../img/about-2.jpg";

export default function AboutSection() {
  return (
    <div className="about-section">
      <div className="container">
        <div className="row-1">
          <div className="img-wrapper">
            <img src={about_1} alt="img" />
          </div>
          <div className="content">
            <h1 className="about-heading">
              NEW WOMEN'S CLOTHING SUMMER COLLECTION 2022
            </h1>
            <p className="para">
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean.
            </p>
            <Link to="/product">Shop Now</Link>
          </div>
        </div>
        <div className="row-2">
          <div className="content">
            <h1 className="about-heading">
              NEW MEN'S CLOTHING SUMMER COLLECTION 2022
            </h1>
            <p className="para">
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean.
            </p>
            <Link to="/product">Shop Now</Link>
          </div>
          <div className="img-wrapper">
            <img src={about_2} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
}
