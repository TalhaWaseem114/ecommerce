import "./Contact.css";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [showToaster, setShowToaster] = useState(false)

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_tttejjn', 'template_y4lyyhh', form.current, 'J45WNl4cIt7cFcA4u')
      .then((result) => {
        console.log("message sent!")
        setShowToaster(true)
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset()
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBZm0oKNunvXpPrYTJfHcPmkRFBfPsAHK0",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="contact-page">
      {/* --------------------------------PAGE HEADER-------------------------- */}
      <div className="page-header container-fluid">
        <div className="links">
          <Link to="/">Home</Link>
          <span>/</span>
          <p>Contact</p>
        </div>
        <h3>CONTACT US</h3>
      </div>
      {/* --------------------------------SEND TOASTER---------------------- */}
      {showToaster && (
        <div className="send-toaster">
          <p className="message">Message Sent!</p>
          <i className="fa-solid fa-circle-xmark" onClick={() => setShowToaster(false)}></i>
        </div>
      )}

      <div className="container">
        <div className="info-flex">
          <div className="address">
            <span>Address:</span>
            <p>198 West 21th Street, Suite 721 New York NY 10016</p>
          </div>
          <div className="phone">
            <span>Phone:</span>
            <a href="tel:+03493771741">0349-3771741</a>
          </div>
          <div className="email">
            <span>email:</span>
            <a href="mailto:talhawaseem512@gmail.com">
              talhawaseem512@gmail.com
            </a>
          </div>
          <div className="website">
            <span>Website:</span>
            <a href="https://talha-waseem.netlify.app/">https://talha-waseem.netlify.app</a>
          </div>
        </div>

        <div className="contact-wrapper">
          <Map />
          <form ref={form} onSubmit={sendEmail} id="frm">
            <input type="text" placeholder="Your Name" name="user_name" required/>
            <input type="text" placeholder="Your Email" name="user_email" required/>
            <input type="text" placeholder="Subject" name="subject" required/>
            <textarea placeholder="Message" name="message" required></textarea>
            <button type="submit" className="btn-send">Send</button>
          </form>
        </div>

      </div>
    </div>
  );
}

function Map() {
  const center = { lat: 29.388473, lng: 71.702033 };
  return (
    <GoogleMap zoom={12} center={center} mapContainerClassName="map-container">
      <Marker position={center}></Marker>
    </GoogleMap>
  );
}
