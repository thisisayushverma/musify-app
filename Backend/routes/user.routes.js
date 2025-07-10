import express from "express";
import { getUserDetailsByRefreshToken, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
router.get('/',getUserDetailsByRefreshToken)




export default router;