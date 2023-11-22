import { TUser } from "./user.interface"
import { User } from "./user.model"

const createUserDB = async (userData: TUser) => {
  const result = await User.create(userData)
  return result
}
const getAllUserFromDB = async () => {
  const result = await User.find()
  return result
}
const getSingleUserFromDB = async (id: string) => {
  const result = await User.findOne({ id })
  return result
}

export const UserServices = {
  createUserDB,
  getAllUserFromDB,
  getSingleUserFromDB,
}
