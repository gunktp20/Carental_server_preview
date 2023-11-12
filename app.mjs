import express from "express";
//import custom.d.ts file for declare each module interface
import { StatusCodes } from "http-status-codes";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
//import connect database module that we created
import connectDB from "./db/connect.mjs";
//import router for handler request
import authRouter from "./routes/auth.routes.mjs";
import carRouter from "./routes/car.routes.mjs";
import orderRouter from "./routes/order.routes.mjs";
import userRouter from "./routes/user.routes.mjs";
//import error handler middleware for manage error
import notFoundMiddleware from "./middlewares/not-found.mjs";
import errorHandlerMiddleware from "./middlewares/error-handler.mjs";
//import authenticate middleware
import authJWT from "./middlewares/auth.mjs";
import helmet from "helmet";
//import swaggerDocument 
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./utils/swagger.mjs";

const app = express();

//middleware

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

app.use((req, res, next) => {
  console.log(req.method, req.path);
  console.log("------------------------");
  next();
});

app.get("/api/v1", (req, res) => {
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Welcome to our carental API" });
});

// SwaggerDoc
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/car", authJWT, carRouter);
app.use("/api/v1/order", authJWT, orderRouter);
app.use("/api/v1/user", authJWT, userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    await connectDB(MONGO_URL);
    app.listen(PORT, () => {
      console.log(`server is running on port : ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
