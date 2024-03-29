import express from "express";
import {
  addVideo,
  addView,
  getByTag,
  getVideo,
  latestVideo,
  random,
  search,
  sub,
  trend,
  getAllVideos,
  getAllVideosUser,
  getAllVideoByCategory,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, addVideo);
router.delete("/:id", verifyToken, addVideo);
router.get("/find/:id", getVideo);
router.get("/getAllVideos", getAllVideos);
router.get("/getAllVideosUser/:id", getAllVideosUser);
router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", verifyToken, sub);
router.get("/tags", getByTag);
router.get("/search", search);
router.get("/latestVideo", latestVideo);
router.get("/:category", getAllVideoByCategory);

export default router;