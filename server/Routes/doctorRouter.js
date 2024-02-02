import express from 'express';
import { getDoctorsById, registerDoctor } from '../controllers/doctorContoller.js'; // Import the controller function

const router = express.Router();

// GET doctors by ID
router.get('/:doctorId', getDoctorsById);
router.post('/registerDoctor',registerDoctor);router.post('/registerDoctor',registerDoctor);

export default router;
