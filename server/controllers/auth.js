//Updated
import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import stripeModule from "stripe";
const stripe = stripeModule(process.env.STRIPE_SECRET);
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    //Password encryption
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    console.log(newUser);
    res.status(200).send("User has been created!");
  } catch (err) {
    next(err);
  }
};
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User  not found"));

    const isCorrect = bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};
export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};
// export const signout = async (req, res, next) => {
//   try {
//     res.clearCookie("access_token");
//     res.status(200).send("User logged out successfully!");
//   } catch (err) {
//     next(err);
//   }
// };

export const stripeCheckout = async (req, res, next) => {
  try {
    const product = req.body.lineItems[0]; // Assuming the request body contains a single product
    const lineItem = {
      price_data: {
        currency: "cad",
        product_data: {
          name: product.name,
        },
        unit_amount: Math.round(product.unit_amount),
      },
      quantity: product.quantity,
    };

    // Create the checkout session with Stripe
    const session = await stripe.checkout.sessions.create(
      {
        payment_method_types: ["card"],
        line_items: [lineItem], // Pass the single line item in an array
        mode: "payment",
        success_url: "",
        cancel_url: "",
      },
      {
        // Set the API key in the headers
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET}`, // Replace 'YOUR_SECRET_KEY' with your actual API key
        },
      }
    );

    res.json({ id: session.id });
  } catch (err) {
    next(err);
  }
};
