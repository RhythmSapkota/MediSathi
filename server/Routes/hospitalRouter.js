import { Router } from "express";
const router = Router();

import {
  getAllHospitals,
  getSingleHospital,
  updateHospital,
  addHospital,
  deleteHospital,
} from "../controllers/hospitalController.js";
import { validateHospitalInput, validateIdParam } from "../middleware/validationMiddleware.js";



router.route("/").get(getAllHospitals).post(validateHospitalInput, addHospital);
router
  .route("/:id")
  .get(validateIdParam,getSingleHospital)
  .patch(validateHospitalInput, updateHospital)
  .delete(validateIdParam, deleteHospital);

export default router;
