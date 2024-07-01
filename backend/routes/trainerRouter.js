import { Router } from "express";
import { getAllTrainers } from "../controllers/trainerController.js";
import { isAuth } from '../middlewares/isAuth.js';
import { getCoursesByTrainer } from '../controllers/trainerController.js';

const router = Router();
router.get("/", getAllTrainers);
router.get('/courses', isAuth, getCoursesByTrainer);



export default router;