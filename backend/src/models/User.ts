import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserRequest {
  name: string
  email: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
}

export interface UserResponse {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export const userToResponse = (user: User): UserResponse => ({
  id: user._id!.toString(),
  name: user.name,
  email: user.email,
  createdAt: user.createdAt.toISOString(),
  updatedAt: user.updatedAt.toISOString()
})