import express from "express";
import Product from "../models/productModel.js";
import multer from "multer";

const productRouter = express.Router();

// =============================find by category
productRouter.get("/categories", async (req, res) => {
  const categories = await Product.find().distinct("category");
  res.send(categories);
});

// ==================== fro filtering the searched product
productRouter.post("/search", async (req, res) => {
  const { query } = req;
  const { body } = req;
  const { price, category, rating, sortBy } = body;

  const queryFilter =
    query.search && query.search !== "all"
      ? {
          name: {
            $regex: query.search,
          },
        }
      : {};

  const priceFilter = price.heighVal
    ? {
        price: {
          $gte: price.lowVal,
          $lte: price.heighVal,
        },
      }
    : {};

  const categoryFilter = category
    ? {
        category: {
          $regex: category,
        },
      }
    : {};

  const ratingFilter = rating
    ? {
        rating: {
          $gte: rating,
          $lte: rating + 1,
        },
      }
    : {};
  const sortOrder = sortBy === "lowToHigh" ? { price: 1 } : { price: -1 };

  const products = await Product.find({
    ...queryFilter,
    ...priceFilter,
    ...categoryFilter,
    ...ratingFilter,
  }).sort(sortOrder);
  res.send(products);
  // console.log(products);
});

// =============================fro fetching all the products and filter
productRouter.post("/", async (req, res) => {
  const { category, price, rating, sortBy } = req.body;

  const priceFilter = price
    ? {
        price: {
          $gte: price.lowVal,
          $lte: price.heighVal,
        },
      }
    : {};

  const categoryFilter = category
    ? {
        category: {
          $regex: category,
        },
      }
    : {};

  const ratingFilter = rating
    ? {
        rating: {
          $gte: rating,
          $lte: rating + 1,
        },
      }
    : {};
  const sortOrder = sortBy === "lowToHigh" ? { price: 1 } : { price: -1 };

  const products = await Product.find({
    ...priceFilter,
    ...categoryFilter,
    ...ratingFilter,
  }).sort(sortOrder);
  res.send(products);
});

// ============================finding the slug used in routing
productRouter.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

// ============================finding the product by Id
productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

// =============================add products

const Storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("image");

productRouter.post("/addProduct", upload, async (req, res, next) => {
  try {
    const profilePic = req.file.path;
    // console.log(profilePic);
    const slug = req.body.name.split(" ").join("-");
    req.body.slug = slug;
    req.body.image = profilePic.replace("public", "");

    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send("product is created!");
  } catch (error) {
    res.status(500).send({ message: "Product is not created!" });
  }
});

// =============================update product
productRouter.put("/updateProduct", async (req, res) => {
  try {
    const { body } = req;
    await Product.findByIdAndUpdate(body._id, body, { new: true });
    const product = await Product.find();
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: "Product is not updated!" });
  }
});

export default productRouter;
