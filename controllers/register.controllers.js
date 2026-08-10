import bcrypt from "bcryptjs";
import { jsonWebToken } from "../config/jwt.config.js";
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
    res.send(req.body).status(201);
  } catch (error) {
    res.send(error);
  }
};

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid email or password" });

    const token = await jsonWebToken(user);
    res.json({ token , user});
  } catch (error) {
    res.json({ message: error });
  }
};