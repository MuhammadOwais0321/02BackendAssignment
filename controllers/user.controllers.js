import bcrypt from "bcryptjs";
import { jsonWebToken } from "../config/jwt.config.js";
import { User } from "../model/user.model.js";

export const userProfileUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "user not found" });
    const { name, phone, address, gender } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, phone, address, gender },
      { new: true },
    );
    res.send(updatedUser);
  } catch (error) {}
};
