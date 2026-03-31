import { Prisma, PrismaClient, User } from '@prisma/client'
import UserWhereInput = Prisma.UserWhereInput

const prisma = new PrismaClient()

export const UserService = {
  create: async (data: { email: string; subscribed: boolean }): Promise<User> => {
    return await prisma.user.create({ data })
  },
  getByEmail: async (email: string): Promise<User | null> => {
    return await prisma.user.findFirst({ where: { email } })
  },
  upsert: async (data: { email: string; subscribed: boolean }): Promise<User> => {
    const { email } = data
    return await prisma.user.upsert({
      where: { email },
      update: data,
      create: data,
    })
  },
  getAll: async (where: UserWhereInput): Promise<User[]> => {
    return await prisma.user.findMany({ where })
  },
}
