import { Router } from "express";
import { handleCheckAccessTokenPresent } from "../controllers/auth.controller.js";
import { handleRefreshAccessToken } from "../controllers/user.controller.js";


const router = Router();

router.post('/check-access-token-present',handleCheckAccessTokenPresent)
router.post('/refresh-access-token',handleRefreshAccessToken)


export default router