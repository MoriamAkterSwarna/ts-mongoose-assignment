import { Request, Response } from "express"
import { UserServices } from "./user.services"

const createUser = async (req: Request, res: Response) => {
  try {
    const query = req.body
    console.log(req.body)

    const result = await UserServices.createUserDB(query)

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

export const UserController = {
  createUser,
  getAllUser,
}
