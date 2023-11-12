import express from "express";
const router = express.Router();
import { insertPhoneNumber } from "../controllers/user.controller.mjs";

router.route("/phone-number").put(insertPhoneNumber);

export default router;
