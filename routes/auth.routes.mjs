import express from "express";
import { login, register , refresh} from "../controllers/auth.controller.mjs";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/refresh").post(refresh);

export default router;
