import jwt from "jsonwebtoken";

export const jsonWebToken = async (user) => {
  const payload = {
    userId: user._id,
    userEmail: user.email,
  };
  const Secret_kay = process.env.JWT_SECRET;
  const Refresh_Secret_Key = process.env.JWT_REFRESH_SECRET
  const options = { expiresIn: "10m" };

  const token = await jwt.sign(payload, Secret_kay, options);
  const refreshToken = await jwt.sign(payload, Refresh_Secret_Key, {expiresIn: '30d'})
  console.log(token);

  return {token, refreshToken}
};
