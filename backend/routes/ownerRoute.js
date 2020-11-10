import express from "express";
import { userAuth, registerUser, getUserMenu } from "../controller/ownerController.js";
import { protect } from "../middlewares/userMiddlewares.js";

const router = express.Router();

//@desc user and authentication
//@Route is /api/users
//@Access is public
router.post("/login", userAuth);

//register user
router.route("/").post(registerUser);

router.route("/:id/menu").get(protect, getUserMenu);
// router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
// router.route("/menu").get(protect, getUserMenu).put(protect, updateMenu);

export default router;
