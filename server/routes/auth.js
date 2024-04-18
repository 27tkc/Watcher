// Updated
import express from "express";
import {
  signup,
  signin,
  googleAuth,
  stripeCheckout,
} from "../controllers/auth.js";
const router = express.Router();
import stripeModule from "stripe";
const stripe = stripeModule(process.env.STRIPE_SECRET);

//CREATE A USER
router.post("/signup", signup);
//SIGNIN
router.post("/signin", signin);
//SIGNOUT
// router.get("/signout", signout);
//GOOGLE AUTH
router.post("/google", googleAuth);

//Stripe
router.post("/create-checkout-session", stripeCheckout);

export default router;
