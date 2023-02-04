import shirt from "../../img/tshirt.png";
import pant from "../../img/trousers.png";
import shoe from "../../img/shoe.png";
import jacket from "../../img/jacket.png";
import { useNavigate } from "react-router-dom";

export default function Category() {
  const navigate = useNavigate();

  return (
    <div className="category-section">
      <div className="container">
        <div className="card" onClick={()=> navigate(`product`, { state: "shirt" })}>
          <img src={shirt} alt="shirt" />
          <h3>Shirt</h3>
        </div>
        <div className="card" onClick={()=> navigate(`product`, { state: "pant" })}>
          <img src={pant} alt="pant" />
          <h3>Pant</h3>
        </div>
        <div className="card" onClick={()=> navigate(`product`, { state: "shoe" })}>
          <img src={shoe} alt="shoe" />
          <h3>Shoe</h3>
        </div>
        <div className="card" onClick={()=> navigate(`product`, { state: "jacket" })}>
          <img src={jacket} alt="jacket" />
          <h3>Jacket</h3>
        </div>
      </div>
    </div>
  );
}
