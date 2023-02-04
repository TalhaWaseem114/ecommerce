import axios from 'axios';
import React, { useState } from 'react'
import { toast } from "react-toastify";

export default function AddProduct() {
  const [input, setInput] = useState({ name: "", brand: "", category: "", price: "", countInStock: "", color: "#6e6e6e", size: "", image: "", description: "" });
  const [showColor, setShowColor] = useState(false)

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      let fd = new FormData();
      fd.append("name", input.name);
      fd.append("brand", input.brand);
      fd.append("category", input.category);
      fd.append("price", input.price);
      fd.append("countInStock", input.countInStock);
      fd.append("color", input.color);
      fd.append("size", input.size);
      fd.append("image", input.image);
      fd.append("description", input.description);

      await axios.post("http://localhost:5000/api/products/addProduct", fd)
      setInput({ name: "", brand: "", category: "", price: "", countInStock: "", color: "#6e6e6e", size: "", image: "", description: "" })
      setShowColor(false)
    } catch (error) {
      console.log("Could not create the product !")
    }
  };

  return (
    <div className='admin-addProduct'>
      <h1 className='heading'>Add Product</h1>
      <div className="add-wrapper">


        <form onSubmit={submitHandler} >
          <div className="input-slice">
            <label htmlFor="name">Name *</label>
            <input type="text" id='name' placeholder='Enter Product Title' value={input.name} onChange={(e) => setInput({ ...input, name: e.target.value })} />
          </div>
          <div className="input-slice">
            <label htmlFor="brand">Brand *</label>
            <input type="text" id='brand' placeholder='Enter Brand Name' value={input.brand} onChange={(e) => setInput({ ...input, brand: e.target.value })} />
          </div>
          <div className="input-slice">
            <label htmlFor="category">Category</label>
            <input type="text" id='category' placeholder='Enter Category (shirt pant)' value={input.category} onChange={(e) => setInput({ ...input, category: e.target.value })} />
          </div>
          <div className="input-slice">
            <label htmlFor="price">Price</label>
            <input type="number" id='price' placeholder='Enter Product Price' value={input.price} onChange={(e) => setInput({ ...input, price: e.target.value })} />
          </div>
          <div className="input-slice">
            <label htmlFor="count">Stock in count</label>
            <input type="number" id='count' placeholder='Total no. of Product' value={input.countInStock} onChange={(e) => setInput({ ...input, countInStock: e.target.value })} />
          </div>
          <div className="input-slice">
            <label htmlFor="color">Color</label>
            <input type="color" id='color' placeholder='Enter Color' value={input.color} onChange={(e) => { setInput({ ...input, color: e.target.value }); setShowColor(true) }} />
          </div>
          <div className="input-slice">
            <label htmlFor="size">Size</label>
            <input type="text" id='size' placeholder='Large,Medium,Small' value={input.size} onChange={(e) => setInput({ ...input, size: e.target.value })} />
          </div>
          <div className="input-slice">
            <label htmlFor="img">Upload Image</label>
            <input type="file" id='img' placeholder='Upload Image' onChange={(e) => setInput({ ...input, image: e.target.files[0] })} />
          </div>
          <div className="input-slice textarea-slice">
            <label htmlFor="desc">Description</label>
            <textarea id='desc' placeholder='Description about the Product' className='input10' value={input.description} onChange={(e) => setInput({ ...input, description: e.target.value })} />
          </div>

          {/* ==========================================//////////////-- CARD */}
          <div className="product-card">
            {input.name && (<p className="name">{input.name}</p>)}
            <div className="product-card-flex">
              {input.brand && (<p className='brand'>{input.brand}</p>)}
              {input.category && (<p className="category">{input.category}</p>)}
              {input.price && (<p className="price">${input.price}</p>)}
              {input.countInStock && (<p className='stock'> {input.countInStock}</p>)}
              {showColor && (<p className="color" style={{ backgroundColor: `${input.color}` }}></p>)}
            </div>
            {input.description && (<p className="desc">{input.description}</p>)}
          </div>

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  )
}
