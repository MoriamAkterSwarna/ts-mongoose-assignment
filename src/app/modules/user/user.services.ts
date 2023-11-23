import mongoose from "mongoose"
import { TOrder, TUser } from "./user.interface"
import { User } from "./user.model"

const createUserDB = async (userData: TUser) => {
  const result = await User.create(userData)
  return result
}
const getAllUserFromDB = async () => {
  const result = await User.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  })

  return result
}
const getSingleUserFromDB = async (id: string) => {
  const result = await User.findOne({ id })
  return result
}
const updateUserFromDB = async (
  id: string,
  userData: TUser,
): Promise<TUser | null> => {
  const result = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndDelete(id)
  return result
}
const addOrdersToDB = async (
  id: string,
  orderData: TOrder[],
): Promise<TOrder[] | null> => {
  // console.log(id, orderData)

  const user = await User.findById(id)
  if (!user) {
    throw new Error("User not found")
  }

  const updatedUser = await User.updateOne(
    { _id: id },
    { $push: { orders: { $each: orderData } } },
  )

  if (updatedUser.modifiedCount == 0) {
    throw new Error("Failed to update orders")
  }

  // Fetch the updated user to get the updated orders
  const updatedUserWithOrders = await User.findById(id)
  return updatedUserWithOrders?.orders || null
}
const getOrdersFromDB = async (id: string) => {
  const result = await User.findOne({ _id: id })
  console.log(result, "result")
  return result
}
// const getTotalPriceDB = async (id: string) => {
//   console.log(id, "id")
//   // const totalPrice = await User.aggregate([
//   //   { $match: { _id: id } },
//   //   { $unwind: "$orders" },
//   //   {
//   //     $group: {
//   //       _id: "$_id",
//   //       totalPrice: {
//   //         $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
//   //       },
//   //     },
//   //   },
//   //   { $project: { _id: 1, totalPrice: 1, orders: 1 } },
//   // ])
//   // console.log(totalPrice)
//   // return totalPrice
// }
const getTotalPriceDB = async (id: string) => {
  const result = await User.aggregate([
    // { $match: { _id: new mongoose.Types.ObjectId(id) } },
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    { $unwind: "$orders" },
    {
      $group: {
        _id: "$_id",
        totalPrice: {
          $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
        },
      },
    },
  ])

  return result[0]?.totalPrice || 0
}
export const UserServices = {
  createUserDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
  addOrdersToDB,
  getOrdersFromDB,
  getTotalPriceDB,
}
