import {Router} from "express";
import {
    postNewCourse,
    getAllCourses,
    updateCourseById,
    deleteCourseById,
    getCourseById
} from "../controllers/courseController.js";

import {isAuth} from "../middlewares/isAuth.js";
import {isTrainer} from "../middlewares/isTrainer.js";


const router = Router();

router.post("/",isAuth, isTrainer, postNewCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourseById);
router.delete("/:id", deleteCourseById);

export default router