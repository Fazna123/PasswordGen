import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(errorHandler(401, "Please Login!"));
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY),
    (err, user) => {
      if (err) {
        return next(errorHandler(403, "JWT Token is not valid"));
      }
      req.user = user;
      next();
    };
};
