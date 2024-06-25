import {Router} from "express";
import {
    postNewCourse,
    getAllCourses,
    updateCourseById,
    deleteCourseById,
    getCourseById
} from "../controllers/courseController.js";

const router = Router();

router.post("/", postNewCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourseById);
router.delete("/:id", deleteCourseById);

export default router