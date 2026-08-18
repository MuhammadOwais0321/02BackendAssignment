import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader != "undefined") {
      const token = bearerHeader.split(" ")[1];
        console.log(token);
        
      const user = jwt.verify(token, process.env.JWT_SECRET);
      console.log(user)
      
      req.user = user;
      next();
    } else {
      res.status(401).json({ message: "NO token provied" });
    }
  } catch (error) {
    res.status(403).json({ message: "invalid or expired token" });
  }
};
