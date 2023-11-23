import { TUser } from "./user.interface"
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
  console.log(id, userData)
  const result = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  })
  return result
}

export const UserServices = {
  createUserDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
}
