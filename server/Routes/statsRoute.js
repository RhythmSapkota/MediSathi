import { Router } from "express";
import { getAllStats } from "../controllers/statsController.js";

const router = Router();

router.get("/all", getAllStats);


export default router;
