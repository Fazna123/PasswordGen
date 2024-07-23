import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(errorHandler(400, "This email is already registered"));
  }
  if (!name || !email || !password) {
    // return res
    //   .status(400)
    //   .json({ success: false, message: "All fields are required" });
    return next(errorHandler(400, "All fields are required"));
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "You have registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "Please register first"));
    }
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return next(errorHandler(401, "Invalid credentials"));
    }
    const { password: hashedPassword, ...rest } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, //1 day
      })
      .status(200)
      .json({ success: true, user: rest });
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken").status(200).json("Logged out successfully");
  } catch (error) {
    next(error);
  }
};
