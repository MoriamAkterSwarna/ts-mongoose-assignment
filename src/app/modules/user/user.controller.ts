/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express"
import { UserServices } from "./user.services"
import { UserZodSchema } from "./user.validation"

const createUser = async (req: Request, res: Response) => {
  try {
    const query = req.body
    // console.log(req.body, "body")

    const zodValidateData = UserZodSchema.parse(query)
    const result = await UserServices.createUserDB(zodValidateData)

    res.status(201).json({
      success: true,
      message: "User Created successfully!",
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    })
  }
}
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB()

    res.status(200).json({
      success: true,
      message: "User Fetched successfully!",
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "No user Found",
      error: error,
    })
  }
}
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await UserServices.getSingleUserFromDB(id)

    res.status(200).json({
      success: true,
      message: "Single User Fetched successfully!",
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not Found",
      error: error,
    })
  }
}
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const id = req.params.userId

    const result = await UserServices.updateUserFromDB(id, user)

    res.status(200).json({
      success: true,
      message: "User Updated successfully!",
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not Found",
      error: error,
    })
  }
}
const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const result = await UserServices.deleteUserFromDB(id)

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not Found",
      error: error,
    })
  }
}

const addOrder = async (req: Request, res: Response) => {
  try {
    const { productName, price, quantity } = req.body
    const id = req.params.userId

    const result = await UserServices.addOrdersToDB(id, [
      { productName, price, quantity },
    ])

    res.status(200).json({
      success: true,
      message: "Order added successfully!",
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Orders not Found",
      error: error,
    })
  }
}
const getOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await UserServices.getOrdersFromDB(id)

    const orders = result?.orders

    res.status(200).json({
      success: true,
      message: "Order Fetched successfully!",
      data: orders,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "User not Found",
      error: error,
    })
  }
}
export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteUser,
  addOrder,
  getOrder,
}
