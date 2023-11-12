import { StatusCodes } from "http-status-codes";
import Car from "../models/Car.mjs";
import Order from "../models/Order.mjs";
import { BadRequestError, NotFoundError } from "../errors/index.mjs";

const insertCar = async (req, res) => {
  const { car_id, brand, model, system, seat, image, price, location } =
    req.body;
  if (
    !car_id ||
    !brand ||
    !model ||
    !system ||
    !seat ||
    !image ||
    !price ||
    !location
  ) {
    throw new BadRequestError("Please provide all value!");
  }

  const car = await Car.create(req.body);
  res.status(StatusCodes.OK).json({ car });
};

const deleteCar = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Please provide car id!");
  }
  const car = await Car.findById(id);
  if (!car) {
    throw new NotFoundError("Not found your car!");
  }
  await Order.deleteMany({ car: id });
  await Car.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: "Deleted 1 record!" });
};

const getAllCar = async (req, res) => {
  const { price, location, seat, system } = req.query;

  const queryObject = {};

  if (price && price !== "all") {
    queryObject.price = price;
  }
  if (location && location !== "all") {
    queryObject.location = location;
  }
  if (seat && seat !== "all") {
    queryObject.seat = seat;
  }
  if (system && system !== "all") {
    queryObject.system = system;
  }

  const result = await Car.find(queryObject);

  const totalCars = await Car.countDocuments(queryObject);

  res.status(StatusCodes.OK).json({ cars: result, totalCars });
};

const updateCar = async(req, res) => {
  if(!req.params.id){
    throw new BadRequestError("Please provide car id!");
  }
  const { car_id, brand, model, system, seat, image, price, location } =
    req.body;
  if (
    !car_id ||
    !brand ||
    !model ||
    !system ||
    !seat ||
    !image ||
    !price ||
    !location
  ) {
    throw new BadRequestError("Please provide all value!");
  }

  const car = await Car.findById(req.params.id);
  if (!car) {
    throw new NotFoundError("Not found your car!");
  }

  await Car.findByIdAndUpdate(req.params.id,req.body)
  res.status(StatusCodes.OK).json({ msg: "Updated 1 record" });
};

export { getAllCar, insertCar, deleteCar, updateCar };
