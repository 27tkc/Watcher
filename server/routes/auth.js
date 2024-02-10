import express from "express";
import { signup, signin } from "../controllers/auth.js";
const router = express.Router();

//CREATE A USER
router.post("/signup", signup);
//SIGNIN
router.post("/signin", signin);
//GOOGLE AUTH
router.post("/google");
export default router;
