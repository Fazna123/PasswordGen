import { errorHandler } from "../utils/error.js";
import Password from "../models/password.model.js";

export const generatePassword = async (req, res, next) => {
  try {
    const { checkboxData, length } = req.body;
    const checkboxDataOptions = checkboxData.filter((item) => item.state);
    if (checkboxDataOptions.length === 0) {
      return next(errorHandler(401, "Select atleast one option!"));
    }
    let charset = "";
    let generatedPassword = "";

    checkboxDataOptions.forEach((item) => {
      switch (item.title) {
        case "Include Uppercase Letters": {
          charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        }
        case "Include Lowercase Letters": {
          charset += "abcdefghijklmopqrstuvwxyz";
          break;
        }
        case "Include Numbers": {
          charset += "0123456789";
          break;
        }
        case "Include Symbols": {
          charset += "#$%^&*/_()[]";
          break;
        }
        default: {
          break;
        }
      }
    });

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    return res.status(200).json({
      success: true,
      message: "Password generated",
      password: generatedPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const savePassword = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "Email and password are required"));
  }
  try {
    const newPasswordData = new Password({ email, password });
    await newPasswordData.save();
    res.status(201).json({ success: true, message: "Password has been saved" });
  } catch (error) {
    next(error);
  }
};

export const getPasswords = async (req, res, next) => {
  const { email } = req.query;
  try {
    const passwords = await Password.find({ email: email });
    if (!passwords) {
      return res.status(404).json({
        success: false,
        message: "No passwords are saved in this account",
      });
    } else {
      res
        .status(200)
        .json({ success: true, message: "Password list fetched", passwords });
    }
  } catch (error) {
    next(error);
  }
};

export const deletePassword = async (req, res, next) => {
  try {
    console.log("delete password");
    const { passwordId } = req.params;
    console.log("id", passwordId);

    const result = await Password.findByIdAndDelete(passwordId);

    if (result) {
      return res
        .status(200)
        .json({ success: true, message: "Password deleted successfully" });
    } else {
      return next(errorHandler(404, "Password not found"));
    }
  } catch (error) {
    next(error);
  }
};
