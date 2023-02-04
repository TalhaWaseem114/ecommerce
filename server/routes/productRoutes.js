import express from "express";
import Product from "../models/productModel.js";
import multer from "multer";

const productRouter = express.Router();

// =============================for fetching all the products and filter them
productRouter.post("/", async (req, res) => {
  try {
    const { rating, category, company, sortBy, name, color } = req.body;

    const queryObject = {};

    // -->if following parameters exist in QUERY then append them into "query object"
    if (category) {
      queryObject.category = category;
    }
    if (company) {
      queryObject.brand = company;
    }
    if (name) {
      queryObject.name = { $regex: name, $options: "i" };
    }
    if (color) {
      queryObject.color = color;
    }
    if (rating) {
      queryObject.rating = {
        $gte: rating,
        $lt: rating + 1,
      };
    }

    // -->for price filter
    const minPrice = req.body.minPrice || 0;
    const maxPrice = req.body.maxPrice || 1000000000000000;
    queryObject.price = { $gt: minPrice, $lt: maxPrice };

    // console.log(queryObject);
    let result = Product.find(queryObject);

    // -->for sorting
    if (sortBy) {
      result = result.sort(sortBy);
    }

    // -->for pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 15;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    // -->for getting from DB with relative appended value
    const products = await result;

    res.status(200).send({ nbHits: products.length, products });
  } catch (error) {
    res.send("error");
  }
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
    const size = req.body.size.split(",");
    req.body.size = size
    req.body.image = profilePic.replace("public", "");

    const newProduct = new Product(req.body);
    // console.log(newProduct)
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

// =============================delete product
productRouter.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.send("product is deleted");
  } catch (error) {
    res.status(500).send({ message: "Product is not deleted!" });
  }
});


export default productRouter;
