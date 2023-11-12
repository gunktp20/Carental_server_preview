import { StatusCodes } from "http-status-codes";
import User from "../models/User.mjs";
import { BadRequestError, UnAuthenticatedError,NotFoundError } from "../errors/index.mjs";
import validator from "validator";
import jwt from "jsonwebtoken"

const register = async (req, res) => {
  const { firstname, lastname, password, email } = req.body;

  if (!firstname || !lastname || !password || !email) {
    throw new BadRequestError("Please provide all value !");
  }

  if (!validator.isEmail(email)) {
    throw new BadRequestError("Please provide a valid Email !");
  }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("email already in use");
  }
  const user = await User.create({
    firstname,
    lastname,
    password,
    email,
  });
  const accessToken = user.createAccessToken();
  const refreshToken = user.createRefreshToken();
  res.status(StatusCodes.OK).json({
    user:{
      _id:user._id,
      firstname:user.firstname,
      lastname:user.lastname,
      email:user.email,
      role:user.role,
      orderRentedCar:user.orderRentedCar,
      phoneNumber:user.phoneNumber,
    },
    accessToken: accessToken,
    refreshToken:refreshToken
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values!");
  }
  const user = await User.findOne({ email: email }).select("+password");
  // .populate("rentedCars");

  if (!user) {
    throw new NotFoundError("Not found your account!");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Password is not correct!");
  }

  const accessToken = user.createAccessToken();
  const refreshToken = user.createRefreshToken();
  res.status(StatusCodes.OK).json({
    user:{
      _id:user._id,
      firstname:user.firstname,
      lastname:user.lastname,
      email:user.email,
      role:user.role,
      orderRentedCar:user.orderRentedCar,
      phoneNumber:user.phoneNumber,
    },
    accessToken: accessToken,
    refreshToken:refreshToken
  });
};

const refresh = async(req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_REFRESH);
    
    const user = await User.findOne({ _id: userId }).select("+password");

    if(!user){
      throw new NotFoundError("Not Found your account!")
    }

    const accessToken = user.createAccessToken();
    const refreshToken = user.createRefreshToken();
    
    res.status(StatusCodes.OK).json({
      user:{
        _id:user._id,
        firstname:user.firstname,
        lastname:user.lastname,
        email:user.email,
        role:user.role,
        orderRentedCar:user.orderRentedCar,
      },
      accessToken: accessToken,
      refreshToken:refreshToken
    });
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export { register, login, refresh };
