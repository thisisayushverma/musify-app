import { Router } from "express";
import { handleSearch,handleSearchSong } from "../controllers/search.controller.js";


const router = Router();

router.post('/',handleSearchSong)
router.get('/:search',handleSearch)

export default router