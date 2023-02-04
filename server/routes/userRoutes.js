import express from "express";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";
const userRouter = express.Router();

// import multer from "multer";

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          userType: user.userType,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);

// const Storage = multer.diskStorage({
//   destination: "public/uploads",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({
//   storage: Storage,
// }).single("image");

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    // const profilePic=req.file
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      token: generateToken(user),
    });
  })
);

userRouter.put(
  "/profile",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.body._id,
      {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
      },
      { new: true }
    );
    res.send(user);
  })
);

// ROUTE TO FIND USER for admin & sale authentication
userRouter.post(
  "/auth",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      res.status(200).send(user)
    } catch (error) {
      res.status(401).send({ message: "Authentication failed" });
    }
  })
);

// to get the list of all users
userRouter.get(
  "/allUsers",
  expressAsyncHandler(async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).send(user)
    } catch (error) {
      res.status(401).send({ message: "no user found!" });
    }
  })
);

// to delete user
userRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("user is deleted")
    } catch (error) {
      res.status(401).send({ message: "no user deleted!" });
    }
  })
);

export default userRouter;
