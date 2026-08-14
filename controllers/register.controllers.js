import bcrypt from "bcryptjs";
import { jsonWebToken } from "../config/jwt.config.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const userSignupController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Bad request please prvide email and password" });
    }
    const existingUser = await User.findOne({ email });
    console.log(existingUser);

    if (existingUser)
      return res.status(400).send({ message: "User already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userCreated = User.create({ email, password: hashedPassword }, {});
    res.send({ body: req.body, success: true }).status(201);
  } catch (error) {
    res.send(error);
  }
};

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "please enter email and password" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid email or password" });

    const { token, refreshToken } = await jsonWebToken(user);
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    console.log(refreshToken);

    res.json({ token, user });
  } catch (error) {
    res.json({ message: error });
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.send("refreshToken token is not provieded");
    }
     jwt.verify(
      refreshToken,
      process.env.JWT_SECRET,
      async (err, decodePayload) => {
        if (err) {
          console.log(err);
          return res.status(403).json({ message: "Invalid or token expired" });
        }
        console.log(decodePayload);

        const token =  jwt.sign(
          {
            userId: decodePayload.userId,
            userEmail: decodePayload.userEmail,
          },
          process.env.JWT_SECRET,
          { expiresIn: "15m" },
        );
        return res.status(200).send(token);
      },
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
