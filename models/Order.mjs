import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const OrderSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: "users" },
  car: { type: ObjectId, ref: "cars" },
  date_start: {
    type: String,
    require: true,
  },
  date_return: {
    type: String,
    require: true,
  },
  days: {
    type: Number,
    require: true,
  },
  totalPrice: {
    type: Number,
    require: true,
  },
  driver:{
    type:String,
    require:true,
  },
  driver_person_id:{
    type:String,
    require:true,
  },
  status:{
    type: String,
    enum: ["Waiting","Approved"],
    default:"Waiting",
    required: true,
  }
});

export default mongoose.model("orders", OrderSchema);
