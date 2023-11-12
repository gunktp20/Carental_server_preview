import { connect } from "mongoose";

//create connect database function and export it
const connectDB = async (url) => {
  try {
    await connect(url);
    console.log("connected to database success");
  } catch (err) {
    console.log("connect to database failed !");
    console.log(err);
  }
};

export default connectDB;
