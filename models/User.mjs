import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import Car from "./Car.mjs";
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide firstname"],
    minlength: [3, "firstname must contain more than 3 letter "],
    maxlength: 30,
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Please provide lastname"],
    minlength: [3, "lastname must contain more than 3 letter "],
    maxlength: 30,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: [6, "password must contain more than 6 letter "],
    select: false,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    validate: [validator.isEmail],
    maxlength: 30,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true, 
  },
  // id_number: {
  //   type: String,
  //   require: false,
  // },
  orderRentedCar: [{ type: ObjectId, ref: "orders" }],
});

UserSchema.pre("save", async function () {
  console.log(this.modifiedPaths());
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createAccessToken = function () {
  if (!this.phoneNumber) {
    return jwt.sign(
      { userId: this._id, role: this.role },
      process.env.JWT_SECRET_ACCESS,
      {
        expiresIn: "60m",
      }
    );
  }
  return jwt.sign(
    { userId: this._id, role: this.role, phoneNumber: this.phoneNumber },
    process.env.JWT_SECRET_ACCESS,
    {
      expiresIn: "60m",
    }
  );
};

UserSchema.methods.createRefreshToken = function () {
  if (!this.phoneNumber) {
    return jwt.sign(
      { userId: this._id, role: this.role },
      process.env.JWT_SECRET_REFRESH,
      {
        expiresIn: "1d",
      }
    );
  }
  return jwt.sign(
    { userId: this._id, role: this.role, phoneNumber: this.phoneNumber },
    process.env.JWT_SECRET_REFRESH,
    {
      expiresIn: "1d",
    }
  );
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("users", UserSchema);
