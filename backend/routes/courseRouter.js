import { Router } from "express";
import {
  postNewCourse,
  getAllCourses,
  updateCourseById,
  deleteCourseById,
  getCourseById,
  upLoadCoursePic,
} from "../controllers/courseController.js";

import { isAuth } from "../middlewares/isAuth.js";
import { isTrainer } from "../middlewares/isTrainer.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination folder for course pictures
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

const router = Router();

router.post("/", postNewCourse);
router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourseById);

router.patch("/:id", upload.single("coursePic"), upLoadCoursePic); // Handle file upload with multer middleware
router.delete("/:id", deleteCourseById);

export default router;
