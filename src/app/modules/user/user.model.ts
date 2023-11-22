import mongoose, { Schema } from "mongoose"
import { TAddress, TFullName, TOrder, TUser } from "./user.interface"

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

const userSchema = new Schema<TUser>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
  fullName: { type: fullNameSchema },
  age: { type: Number },
  email: { type: String, unique: true },
  isActive: { type: Boolean },
  hobbies: [{ type: String }],
  address: { type: addressSchema },
  orders: [{ type: orderSchema }],
})

export const User = mongoose.model("User", userSchema)
