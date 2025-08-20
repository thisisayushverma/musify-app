import { Router } from "express";
import { handleCreatePlaylist } from "../controllers/playlist.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../utils/multer.js";

const router = Router();

// get playlist by user id
// get playlist via search
// get playlist by playlist id
// create playlist
router.post('/create',authMiddleware,upload.single("thumbnail"),handleCreatePlaylist)
// update playlist
// delete playlist

export default router