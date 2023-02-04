import "./About.css";
import { Link } from "react-router-dom";
import aboutImg from "../../img/about.jpg";
import Service from "../Service/Service";

export default function About() {
  return (
    <div className="about-page">
      {/* --------------------------------PAGE HEADER-------------------------- */}
      <div className="page-header container-fluid">
        <div className="links">
          <Link to="/">Home</Link>
          <span>/</span>
          <p>About</p>
        </div>
        <h3>ABOUT US</h3>
      </div>

      <div className="container pb-0">
        <div className="about-grid">
          <img src={aboutImg} alt="img" />
          <div className="content">
            <h1>Who We Are</h1>
            <p className="para1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              consequuntur quibusdam enim expedita sed nesciunt incidunt
              accusamus adipisci officia libero laboriosam!
            </p>
            <p className="para2">
              Proin gravida nibh vel velit auctor aliquet. nec sagittis sem nibh
              id elit. Duis sed odio sit amet nibh vultate cursus a sit amet
              mauris. Duis sed odio sit amet nibh vultate cursus a sit amet
              mauris.
            </p>
          </div>
        </div>
      </div>

      <Service bgLight={true}/>
    </div>
  );
}
