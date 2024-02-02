import express from 'express';
const router = express.Router();

import { handleAbsentRequest } from '../controllers/absentController.js';

router.patch('/absent/report/:id', handleAbsentRequest);

export default router;
