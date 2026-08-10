import jwt from "jsonwebtoken";

export const jsonWebToken = async (user) => {
  const payload = {
    userId: user._id,
    userEmail: user.email,
  };
  const Secret_kay = process.env.JWT_SECRET;
  const options = { expiresIn: "10m" };

  const token = await jwt.sign(payload, Secret_kay, options);
  console.log(token);

  return token;
};
