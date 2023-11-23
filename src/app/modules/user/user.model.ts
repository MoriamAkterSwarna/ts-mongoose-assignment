/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt"
import { MongooseError, Schema, model } from "mongoose"
import config from "../../config"
import { TAddress, TFullName, TOrder, TUser, UserModel } from "./user.interface"

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

const userSchema = new Schema<TUser, UserModel>({
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
    await User.updateOne({ _id: doc._id }, { $unset: { password: 1 } })
    const updatedDoc = await User.findById(doc._id)
    if (updatedDoc) {
      Object.assign(doc, updatedDoc)
    }

    next()
  } catch (error) {
    next(error as MongooseError)
  }
})
userSchema.post(/^find/, async function (doc, next) {
  try {
    await User.updateOne({ _id: doc._id }, { $unset: { password: 1 } })

    next()
  } catch (error) {
    next(error as MongooseError)
  }
})

// userSchema.statics.isUserExists = async function (
//   email: string,
// ): Promise<TUser | null> {
//   const existingUser = await User.findById({ email: email })
//   return existingUser
// }
export const User = model<TUser, UserModel>("User", userSchema)
