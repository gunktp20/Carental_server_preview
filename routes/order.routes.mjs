import express from "express";
const router = express.Router();
import { getAllOrder, makeOrder,getUserOrder , deleteOrderById , approveOrderById} from "../controllers/order.controller.mjs";
import verifyAdmin from "../middlewares/verify-admin.mjs";

router.route("/").get(getAllOrder);
router.route("/").post(makeOrder);
router.route("/user").get(getUserOrder)
router.route("/:id").delete(deleteOrderById)
router.route("/:id").put(verifyAdmin,approveOrderById)

export default router;
