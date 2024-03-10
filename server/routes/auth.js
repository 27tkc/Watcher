// Updated
import express from "express";
import { signup, signin, googleAuth } from "../controllers/auth.js";
const router = express.Router();

//CREATE A USER
router.post("/signup", signup);
//SIGNIN
router.post("/signin", signin);
//SIGNOUT
// router.get("/signout", signout);
//GOOGLE AUTH
router.post("/google", googleAuth);

export default router;
