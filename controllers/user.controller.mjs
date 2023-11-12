import { StatusCodes } from "http-status-codes";
import User from "../models/User.mjs";
import BadRequestError from "../errors/bad-request.mjs";
import UnAuthenticatedError from "../errors/unauthenticated.mjs";

const insertPhoneNumber= async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    throw new BadRequestError("Please provide all value!");
  }
  const userId = req.user.userId;
  const userExist = await User.findOne({ _id: userId }).select("+password");
  if (!userExist) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  await User.findOneAndUpdate(
    { _id: userId },
    { phoneNumber: phoneNumber }
  );

  const user = await User.findById(userId)

  const accessToken = user.createAccessToken();
  const refreshToken = user.createRefreshToken();
  res.status(StatusCodes.OK).json({
    user,
    accessToken,
    refreshToken,
  });
};

export { insertPhoneNumber };
