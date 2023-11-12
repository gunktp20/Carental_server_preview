import { UnAuthenticatedError } from "../errors/index.mjs";
import jwt from "jsonwebtoken";
import User from "../models/User.mjs";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  
  try {
    const { userId, role, phoneNumber } = await jwt.verify(
      token,
      process.env.JWT_SECRET_ACCESS
    );
    req.user = phoneNumber
      ? { userId: userId, role, phoneNumber: phoneNumber }
      : { userId: userId, role };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default auth;
