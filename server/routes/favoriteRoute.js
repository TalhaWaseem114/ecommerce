import express from "express";
import Favorite from "../models/favoriteModel.js";

const favoriteRouter = express.Router();

// =============================Add to favorite
favoriteRouter.post("/favorite", async (req, res) => {
  try {
    const { userInfo, product } = req.body;
    const { userName, userEmail } = userInfo
    const { _id, name, slug, image, brand, category, description, price, countInStock, rating, noOfReview, color, size } = product
    const newItem = new Favorite({
      _id,
      userName,
      userEmail,
      name,
      slug,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
      rating,
      noOfReview,
      color,
      size
    })
    // console.log(newItem)
    await newItem.save();
    res.send("added to favorites!")
  } catch (error) {
    res.status(500).send({ message: "Product is not added to favorite!" });
  }
});

// =============================getting all favorite
favoriteRouter.post("/favorite/getAllFavorites", async (req, res) => {
  try {
    const product=await Favorite.find(req.body)
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: "Product is not added to favorite!" });
  }
});

// =============================deleting from favorite
favoriteRouter.delete("/favorite/:id", async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id)
    res.send("deleted from favorites!");
  } catch (error) {
    res.status(500).send({ message: "Product is not added to favorite!" });
  }
});

export default favoriteRouter;