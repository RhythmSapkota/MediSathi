// routes/pdfRoutes.js
import express from 'express';
import { getPDFByBookingId } from '../controllers/pdfController.js';

const router = express.Router();

router.get('/booking/pdf/:bookingId', getPDFByBookingId);

export default router;
