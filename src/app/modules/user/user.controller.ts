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

    res.status(201).json({
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

    res.status(201).json({
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
    // const { id } = req.params
    const user = req.body
    const id = req.params.userId
    console.log(user, "user")
    const result = await UserServices.updateUserFromDB(id, user)

    res.status(201).json({
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
    const id = req.params.id
    const result = await UserServices.getSingleUserFromDB(id)

    res.status(201).json({
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

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteUser,
}
