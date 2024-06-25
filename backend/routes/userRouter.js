import { Router } from "express";
import {
  signup,
  login,
  verifyToken,

  getProtected,
  getAdminDashboardData,
  getTrainerDashboardData,
  getMemberDashboardData,
  getPictureById,

  uploadPictureById,
  getAllUsers,
  getUserById,
  updateUserProfile,
  uploadProfilePicture,

  deleteUserById,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/isAuth.js";
import multer from "multer";

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify/:token", verifyToken);
router.get("/getprotected", isAuth, getProtected);


router.get("/dashboard/admin", isAuth, getAdminDashboardData);
router.get("/dashboard/trainer", isAuth, getTrainerDashboardData);
router.get("/dashboard/member", isAuth, getMemberDashboardData);




router.patch("/:id", upload.single("picture"), uploadPictureById);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/picture/:id", getPictureById);
router.put("/profile/", isAuth, updateUserProfile);
router.post("/upload", isAuth, upload.single('file'), uploadProfilePicture);

router.delete("/:id", deleteUserById);

export default router;
