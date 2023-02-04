import express from "express";
import cors from "cors";
import './db/conn.js'
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import favoriteRouter from "./routes/favoriteRoute.js"

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use("/api/products",productRouter)
app.use("/api/products",favoriteRouter)
app.use("/api/users",userRouter)
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
