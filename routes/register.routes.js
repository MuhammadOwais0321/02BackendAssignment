import express from "express";
import {
  refreshTokenController,
  userLoginController,
  userSignupController,
} from "../controllers/register.controllers.js";

const router = express.Router();

router.post("/signup", userSignupController);

router.post("/login", userLoginController);

router.post("/refreshToken", refreshTokenController);

export default router;
