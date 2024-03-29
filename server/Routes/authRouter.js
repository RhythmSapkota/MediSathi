import { Router } from "express";
const router = Router();
import {forgotPassword, login,logout,register, resetPassword, validateResetLink} from '../controllers/authController.js'
import { validateLoginUser, validateRegisterUser } from "../middleware/validationMiddleware.js";


router.post('/register', validateRegisterUser,register);

router.post('/login',validateLoginUser,login);
router.get('/logout', logout);
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)
router.get("/validate-link/:token",validateResetLink)

export default router;