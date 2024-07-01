import { Router } from "express";
import {
  postBooking,
  getBookingsByUser,
  getBookingsByTrainer,
  cancelBookingById,
  approveBooking
} from "../controllers/bookingController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.post("/", isAuth, postBooking);
router.get("/", isAuth, getBookingsByUser);
router.get("/trainer", isAuth, getBookingsByTrainer);
router.delete("/:id", isAuth, cancelBookingById);
router.patch("/:id/approve", isAuth, approveBooking);

export default router;
