import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const CarSchema = new mongoose.Schema({
  car_id: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    maxlength: 30,
    trim: true,
  },
  system:{
    type:String,
    require:true,
  },
  seat: {
    type: Number,
  },
  image: { type: mongoose.Schema.Types.String, required: true },
  price: { type: Number, String, required: true },
  location: { type: String, required: true },
});

export default mongoose.model("cars", CarSchema);
