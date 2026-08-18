import bcrypt from "bcryptjs";
import { jsonWebToken } from "../config/jwt.config.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { configDotenv } from "dotenv";
configDotenv();

export const userSignupController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "please prvide email and password" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: "User already Exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCreated = await User.create({ email, password: hashedPassword });

    res.status(201).send({ body: userCreated, success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .json({ message: "please enter email and password" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid email or password" });

    const { token, refreshToken } = await jsonWebToken(user);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken);

    if (!refreshToken) {
      return res.send("refreshToken token is not provieded");
    }

    const user = await jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const token = await jwt.sign(
      {
        userId: user.userId,
        userEmail: user.userEmail,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );
    const newRefreshToken = jwt.sign(
      {
        userId: user.userId,
        userEmail: user.userEmail,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "30d",
      },
    );
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
