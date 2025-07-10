import express from "express";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import { generateOtp, resendOtp, verifyOtp } from "../controllers/otp.controller.js";



const router = express.Router();

router.post('/verify-otp',verifyOtp);
router.post('/resend-otp',resendOtp)

export default router;

