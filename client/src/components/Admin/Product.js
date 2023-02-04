import axios from 'axios'
import React, { useEffect, useState } from 'react'
import gridIcon from "../../img/grid.png"
import listIcon from "../../img/list.png"
import { Link } from "react-router-dom"


export default function Product() {
  // -->URL OF BACKEND SERVER
  const [url, setUrl] = useState("http://localhost:5000/")

  const [grid, setGrid] = useState(false)
  const [products, setProducts] = useState(false)
  const [update, setUpdate] = useState(false)
  const [input, setInput] = useState({ name: "", brand: "", address: "", category: "", price: "", countInStoke: "", description: "" });
  const [productId, setProductId] = useState("")

  // =========================//////////--FOR FETCHING ALL PRODUCTS
  const fetchProductArray = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/api/products"
    );
    // console.log(data)
    setProducts(data.products);
  };
  useEffect(() => {
    fetchProductArray();
  }, []);

  // =========================///////--FOR FETCHING SINGLE PRODUCT WHICH IS TO BE UPDATE
  const fetchProduct = async (slug) => {
    const { data } = await axios.get(`http://localhost:5000/api/products/slug/${slug}`)
    setInput({
      name: data.name || "",
      brand: data.brand || "",
      category: data.category || "",
      price: data.price || "",
      countInStock: data.countInStock || "",
      description: data.description || "",
    })
    setProductId(data._id) // -----id is to be use for "findByIdAndUpdate" in mongodb
    setUpdate(true)
  }

  // ========================////////--HANDLER TO UPDATE PRODUCT
  const updateHandler = async (e) => {
    e.preventDefault()
    const { data } = await axios.put(`http://localhost:5000/api/products/updateProduct`, {
      _id: productId,
      name: input.name,
      brand: input.brand,
      address: input.address,
      category: input.category,
      price: input.price,
      countInStock: input.countInStock,
      description: input.description,
    })
    setProducts(data)
    setUpdate(false)
  }

  // ========================////////--DELETING PRODUCT
  const deleteProduct = async (_id) => {
    const { data } = await axios.delete(`http://localhost:5000/api/products/${_id}`)
    console.log(data)
    fetchProductArray()
  }

  return (
    <>
      {!products ? "Loading..." : (
        <div className='admin-products'>

          <div className="product-upper">
            <h3>Product List</h3>
            <div className="icon-wrapper">
              <button onClick={() => setGrid(true)} className={grid ? "btn-active" : null}><img src={gridIcon} alt="grid" /></button>
              <button onClick={() => setGrid(false)} className={!grid ? "btn-active" : null}><img src={listIcon} alt="grid" /></button>
            </div>
          </div>
          {
            grid ? (
              <div className="product-grid">
                {products.map((product) => (
                  <div className="admin-product-card" key={product._id}>
                    <Link to={`/productDetail/${product.slug}`}>
                      <div className="image-wrapper">
                        <img src={`${url}${product.image}`} alt="img" className={product.category === "shoe" ? 'img-fit-width-admin-list' : null} />
                      </div>
                      <div className="admin-content">
                        <h3 className='name'>{product.name}</h3>
                        <p className="price">${product.price}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="product-list">
                {
                  products.map((product) => (
                    <div className="admin-product-card" key={product._id}>
                      <div className="img-wrapper">
                        <img src={`${url}${product.image}`} alt="img" className={product.category === "shoe" ? 'img-fit-width-admin-list' : null} />
                      </div>
                      <div className="content">
                        <h1 className="name">{product.name}</h1>
                        <p className="price">${product.price}</p>
                        <p className="desc">{product.description}</p>
                        <div className="underline"></div>
                        <div className="cat-flex">
                          <p className="category"><span className="bold">Category</span> : {product.category}</p>
                          <p className="seller"><span className='bold'>Seller</span> : {"admin"}</p>
                          <p className="seller"><span className='bold'>Items</span> : {product.countInStock}</p>
                          <p className="hover">Hover over me</p>
                        </div>
                      </div>
                      <div className="info-block">
                        <svg>
                          <circle cx="70" cy="70" r="70" />
                          <circle cx="70" cy="70" r="70" style={{ strokeDashoffset: ` calc(440 - (440 * (${product.rating} * 20)) / 100)` }} />
                        </svg>
                        <div className="rating">
                          <h3>{product.rating}</h3>
                          <p className='rating-text'>Rating</p>
                        </div>
                        <p className="count-item">Reviews <span>({product.noOfReview})</span></p>
                      </div>
                      {product.countInStock > 0 && (
                        <div className="availability">In stock</div>
                      )}
                      <div className="edit">
                        <button className="update" onClick={() => fetchProduct(product.slug)}>Update</button>
                        <button className='delete' onClick={() => deleteProduct(product._id)}>Delete</button>
                      </div>
                    </div>
                  ))
                }
              </div>
            )
          }
          {/* -----------------------container for updating product */}
          {
            update && (
              <div className="update-screen-wrapper">
                <div className="update-screen">
                  <h1>Update Product</h1>
                  <form onSubmit={updateHandler}>
                    <input type="text" placeholder='Name *' className='input1' value={input.name} onChange={(e) => setInput({ ...input, name: e.target.value })} />
                    <input type="text" placeholder='Brand *' className='input2' value={input.brand} onChange={(e) => setInput({ ...input, brand: e.target.value })} />
                    <input type="text" placeholder='Category' className='input3' value={input.category} onChange={(e) => setInput({ ...input, category: e.target.value })} />
                    <input type="number" placeholder='price' className='input4' value={input.price} onChange={(e) => setInput({ ...input, price: e.target.value })} />
                    <input type="number" placeholder='Count in Stoke' className='input5' value={input.countInStock} onChange={(e) => setInput({ ...input, countInStock: e.target.value })} />
                    <textarea type="text" placeholder='Description...' className='input6' value={input.description} onChange={(e) => setInput({ ...input, description: e.target.value })} />
                    <button type="submit">Update</button>
                  </form>
                  <button className="btn-close" onClick={() => setUpdate(false)}><i className="fa-solid fa-xmark"></i></button>
                </div>
              </div>
            )
          }
        </div>
      )}
    </>
  )
}
