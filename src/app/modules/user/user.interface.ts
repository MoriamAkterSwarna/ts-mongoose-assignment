/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from "mongoose"

export type TFullName = {
  firstName: string
  lastName: string
}

export type TAddress = {
  street: string
  city: string
  country: string
}

export type TOrder = {
  productName: string
  price: number
  quantity: number
}

export type TUser = {
  userId: number
  username: string
  password: string
  fullName: TFullName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: TAddress
  orders: TOrder[]
}
// export interface UserModel extends Model<TUser> {
//   isUserExists(userId: any): Promise<TUser | null>
// }
//for creating custom instance
export type UserMethod = {
  isUserExists(userId: any): Promise<TUser | null>
}

export type UserModel = Model<TUser, Record<string, never>, UserMethod>
