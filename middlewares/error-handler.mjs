import { StatusCodes } from "http-status-codes";
// err.message.include(":") ? err.message.split(":")[2] : err.message
const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:
      (err.message.includes(":") ? err.message.split(":")[2] : err.message) ||
      "Something went wrong , try again later",
  };
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
