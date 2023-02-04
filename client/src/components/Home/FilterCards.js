import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/productSlice";

export default function FilterCards() {
  // -->URL OF BACKEND SERVER
  const [url, setUrl] = useState("http://localhost:5000/");

  const navigate = useNavigate();

  const [productsData, setProductsData] = useState([])
  const [categories, setCategories] = useState([])
  const [activeButton, setActiveButton] = useState("all")

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);

  const filterProduct = (category) => {
    if (category === 'all') {
      setProductsData(products);
      return;
    }
    const newItems = products.filter((item) => item.category === category);
    setProductsData(newItems);
  }

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    setProductsData(products)
    setCategories(["all", ...new Set(products.map((product) => product.category))])
  }, [products])

  return (
    <div className="filter-section">
      {productsData && (
        <div className="container">
          <div className="btn-wrapper">
            {categories.map((c,index) => (
              <button key={index} onClick={() => {filterProduct(c);setActiveButton(c)}} className={activeButton===c?"btn-active":null}>
                {c}
              </button>
            ))}
          </div>
          <div className="products-wrapper">
            {productsData.map((p, index) => (
              <div className="filter-product" key={index} onClick={()=> navigate(`productDetail/${p.slug}`)}>
                <img src={`${url}${p.image}`} alt={p.name} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
