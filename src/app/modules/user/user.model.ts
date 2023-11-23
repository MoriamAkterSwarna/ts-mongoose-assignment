/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt"
import { MongooseError, Schema, model } from "mongoose"
import config from "../../config"
import {
  TAddress,
  TFullName,
  TOrder,
  TUser,
  UserMethod,
  UserModel,
} from "./user.interface"

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String },
  lastName: { type: String },
})

const addressSchema = new Schema<TAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
})

const orderSchema = new Schema<TOrder>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
})

const userSchema = new Schema<TUser, UserModel, UserMethod>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: {
    type: String,
    maxlength: [20, "Password can not be more than 20 characters"],
  },
  fullName: { type: fullNameSchema },
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean, default: true },
  hobbies: [{ type: String }],
  address: { type: addressSchema },
  orders: [{ type: orderSchema }],
})

userSchema.pre("save", async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

userSchema.post("save", async function (doc, next) {
  try {
    const user = await User.findById(doc._id).select("-password")
    if (user) {
      Object.assign(doc, user)
    }

    next()
  } catch (error) {
    next(error as MongooseError)
  }
})

// userSchema.statics.isUserExists = async function (
//   userId: any,
// ): Promise<TUser | null> {
//   const existingUser = await User.findById(userId)
//   return existingUser
// }
userSchema.methods.isUserExists = async function (userId: any) {
  const existingUser = await User.findOne({ userId })
  return existingUser
}
export const User = model<TUser, UserModel>("User", userSchema)
