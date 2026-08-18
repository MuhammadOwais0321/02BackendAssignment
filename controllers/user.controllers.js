import bcrypt from "bcryptjs";
import { jsonWebToken } from "../config/jwt.config.js";
import { User } from "../model/user.model.js";

export const userProfileUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "user not found" });
    console.log(req.body);

    const { first_name, last_name, phone, address, gender } = req.body;
    console.log(first_name, last_name, phone);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { first_name, last_name, phone, address, gender },
      { new: true },
    );
    console.log(updatedUser);
    res.status(201).json({ user: updatedUser, success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

export const userProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user){
      res.status(404).json({message: 'user not found', success: false})
    }
    res.status(200).json({ user });
    
  } catch (error) {
    res.status(500).json({message: error.message, success: false})
  }
};
