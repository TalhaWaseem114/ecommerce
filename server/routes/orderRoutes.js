import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

const orderRouter = express.Router();
orderRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body)
    const newOrder = new Order({
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
    });

    await newOrder.save();
    res.status(201).send("Order is Placed");
  })
);

// ----------------//////////--GETTING ORDER DATA
orderRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const orderDetail = await Order.find({})
      res.status(200).send(orderDetail);
    } catch (error) {
      res.status(500).send("can not get order detail!");
    }
  })
);

// ----------------//////////--GETTING ORDER DATA
orderRouter.patch(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      await Order.findByIdAndUpdate(req.params.id,
        {
          paymentStatus: req.body.paymentStatus
        }
      )
      res.status(200).send("payment status is updated!");
    } catch (error) {
      res.status(500).send("payment status is not updated!");
    }
  })
);

export default orderRouter;
