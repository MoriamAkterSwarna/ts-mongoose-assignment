import { TOrder, TUser } from "./user.interface"
import { User } from "./user.model"

const createUserDB = async (userData: TUser) => {
  // if (await User.isUserExists(userData.userId)) {
  //   throw new Error("User already exists")
  // }

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
  console.log(id, userData)
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
  console.log(id, orderData)

  const user = await User.findById(id)
  if (!user) {
    throw new Error("User not found")
  }
  // if (!(await User.isUserExists(user.userId as number))) {
  //   throw new Error("User does not exists")
  // }

  const updatedUser = await User.updateOne(
    { _id: id },
    { $push: { orders: { $each: orderData } } },
  )

  if (updatedUser.matchedCount == 0) {
    throw new Error("Failed to update orders")
  }

  const updatedUserWithOrders = await User.findById(id)
  return updatedUserWithOrders?.orders || null
}
const getOrdersFromDB = async (id: string) => {
  const result = await User.findOne({ id })
  return result
}
export const UserServices = {
  createUserDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
  addOrdersToDB,
  getOrdersFromDB,
}
