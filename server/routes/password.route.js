import express from "express";
import {
  deletePassword,
  generatePassword,
  getPasswords,
  savePassword,
} from "../controllers/password.controller.js";

const router = express.Router();

router.post("/generate", generatePassword);
router.post("/save", savePassword);
router.get("/get-list", getPasswords);
router.delete("/delete/:passwordId", deletePassword);

export default router;
