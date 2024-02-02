// booking-backend/routes/bookingRoutes.js
import express from "express";
const router = express.Router();
import {
  createBooking,
  getAllBookings,
  getAllUserBookings,
  getAllDoctorsBookings,
  getAllHospitalBookings,
} from "../controllers/bookingController.js";

import { generateReport } from "../controllers/pdfController.js";

router.post("/", createBooking);
router.get("/", getAllBookings);

router.patch('/generate-report/:bookingId', generateReport);
router.get("/user/:userId", getAllUserBookings);

// Route to get all bookings for a specific doctor
router.get("/doctor", getAllDoctorsBookings);

// Route to get all bookings for a specific hospital
router.get("/hospital/:hospitalId", getAllHospitalBookings);

export default router;
