import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import Car from "./Car.mjs";
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserVerificationSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "users", required: true},
  uniqueToken:{type:String,required:true},
});

export default mongoose.model("users_verification", UserVerificationSchema);
