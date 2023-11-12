import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.mjs";
import NotFoundError from "../errors/not-found.mjs";
import Order from "../models/Order.mjs";
import User from "../models/User.mjs";
import Car from "../models/Car.mjs";
import {
  getDatesInRange,
  isDateValid,
  getDifferenceDays,
} from "../utils/index.mjs";

const getUserOrder = async (req, res) => {
  const userId = req.user.userId;
  const orders = await User.findById({ _id: userId }).populate({
    path: "orderRentedCar",
    populate: { path: "car" },
  });

  res.status(StatusCodes.OK).json(orders);
};

const getAllOrder = async (req, res) => {
  const orders = await Order.find().populate("car").populate("user");
  
  res.status(StatusCodes.OK).json({ orders });
};

const makeOrder = async (req, res) => {
  const { car, date_start, date_return } = req.body; 
  const user_id = req.user.userId; 
  const phoneNumber = req.user.phoneNumber ? req.user.phoneNumber : undefined;

  if (phoneNumber === undefined) {
    throw new BadRequestError("You must specify phone-number !");
  }

  if (!car || !date_start || !date_return) {
    throw new BadRequestError("Please provide all value!");
  }

  const thisCarExisting = await Car.findById({ _id: car });

  if (!thisCarExisting) {
    throw new BadRequestError("Your car id is not exist !");
  }

  var differenceInDays = getDifferenceDays(date_start, date_return);

  if (differenceInDays < 0) {
    throw new BadRequestError("Please provide a valid date!");
  }

  const dateValidBetweenToday = isDateValid(date_start, date_return);

  //Check date selected does not less than Today
  if (!dateValidBetweenToday) {
    throw new BadRequestError("Please provide date from today !");
  }

  const thisCarOrder = await Order.find({ car: car });

  const datesSelected = getDatesInRange(date_start, date_return);

  var isDuplicateDate = false;

  await thisCarOrder.map((item) => {
    const datesItem = getDatesInRange(item.date_start, item.date_return);
    datesSelected.map((item2) => {
      if (datesItem.includes(item2)) {
        isDuplicateDate = true;
        return;
      }
      return;
    });
  });

  if (isDuplicateDate) {
    throw new BadRequestError(
      "The date you selected has already been reserved!"
    );
  }

  var priceForDay = thisCarExisting.price;

  var totalPrice = Number(differenceInDays) * priceForDay;

  differenceInDays = Number(differenceInDays);
  totalPrice = Number(totalPrice);

  if (differenceInDays === 0) {
    totalPrice = priceForDay;
    differenceInDays = 1;
  }

  const { firstname, lastname } = await User.findById(user_id);

  const order = await Order.create({
    user: user_id,
    car,
    date_start,
    date_return,
    days: differenceInDays,
    totalPrice,
    driver: `${firstname} ${lastname}`,
    driver_person_id: phoneNumber,
  });

  const user = await User.findOneAndUpdate(
    { _id: user_id },
    { $push: { orderRentedCar: order._id } }
  );

    res.status(StatusCodes.OK).json({ order });

};

const approveOrderById = async (req, res) => {
  const order_id = req.params.id;
  if (!order_id) {
    throw new BadRequestError("Please provide order id!");
  }
  const order = await Order.findById(order_id);
  if (!order) {
    throw new NotFoundError("Not found your order id!");
  }
  await Order.findByIdAndUpdate(order_id,{
    status:"Approved"
  })

  res.status(StatusCodes.OK).json({msg:"Approved your order !"})
};

const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.userId;
  const user_role = req.user.role;

  const order = await Order.findById(id);

  if (!order) {
    throw new NotFoundError("Not found your order!");
  }

  if (user_role === "admin" && order) {
    await Order.deleteOne({ _id: id });
    res.status(StatusCodes.OK).json({ msg: "deleted your order" });
    return;
  }

  if (order.user.toString() !== user_id) {
    throw new BadRequestError("Your are not owner of this order !");
  }

  if(order.status === "Approved"){
    throw new BadRequestError("You can not cancel this order ! This order was approved ")
  }

  await Order.deleteOne({ _id: id });
  res.status(StatusCodes.OK).json({ msg: "deleted your order" });
};

export {
  makeOrder,
  getAllOrder,
  getUserOrder,
  deleteOrderById,
  approveOrderById,
};
