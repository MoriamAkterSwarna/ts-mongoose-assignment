import { z } from "zod"
const fullNameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
})

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
})

const orderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
})

const userSchema = z.object({
  userId: z.number().int().positive(),
  username: z.string(),
  password: z.string().max(20),
  fullName: fullNameSchema,
  age: z.number().int().positive(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: addressSchema,
  orders: z.array(orderSchema),
})

export const UserZodSchema = userSchema
