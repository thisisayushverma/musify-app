import {Router} from "express";
import { createAudioFile, getAllMyAudio, uploadAudioFile } from "../controllers/audio.controller.js";
import { upload } from "../utils/multer.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = Router();

router.post('/create-audio',authMiddleware,upload.single("thumbnail"),createAudioFile)
router.post('/upload-audio',authMiddleware,upload.single("audio"),uploadAudioFile)
router.get('/your-library',authMiddleware,getAllMyAudio)
// router.delete('/audio/:id',authMiddleware,deleteAudioFile)


export default router