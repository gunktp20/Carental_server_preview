import express from "express";
import {
  getAllCar,
  insertCar,
  deleteCar,
  updateCar
} from "../controllers/car.controller.mjs";
import verifyAdmin from "../middlewares/verify-admin.mjs";
const router = express.Router();

router.route("/").get(getAllCar);
router.route("/:id").delete(verifyAdmin,deleteCar);
router.route("/").post(verifyAdmin, insertCar);
router.route("/:id").put(verifyAdmin, updateCar);

export default router;
