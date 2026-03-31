import { BankAccount, Cash, Crypto, Other, Prisma, PrismaClient, Stock, User } from '@prisma/client'

const prisma = new PrismaClient()

export const UserService = {
  create: async (data: Prisma.UserCreateInput): Promise<User> => {
    return await prisma.user.create({ data })
  },
  getById: async (id: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { id } })
  },
  getByEmail: async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({ where: { email } })
  },
  upsert: async (data: Prisma.UserCreateInput): Promise<User> => {
    return await prisma.user.upsert({
      where: { email: data.email },
      update: data,
      create: data,
    })
  },
  getAll: async (where?: Prisma.UserWhereInput): Promise<User[]> => {
    return await prisma.user.findMany({ where })
  },
  update: async (id: string, data: Prisma.UserUpdateInput): Promise<User> => {
    return await prisma.user.update({
      where: { id },
      data,
    })
  },
  delete: async (id: string): Promise<User> => {
    return await prisma.user.delete({ where: { id } })
  },
}

export const BankAccountService = {
  create: async (data: Prisma.BankAccountCreateInput): Promise<BankAccount> => {
    return await prisma.bankAccount.create({ data })
  },
  getById: async (id: string): Promise<BankAccount | null> => {
    return await prisma.bankAccount.findUnique({ where: { id } })
  },
  getAll: async (where?: Prisma.BankAccountWhereInput): Promise<BankAccount[]> => {
    return await prisma.bankAccount.findMany({ where })
  },
  update: async (id: string, data: Prisma.BankAccountUpdateInput): Promise<BankAccount> => {
    return await prisma.bankAccount.update({
      where: { id },
      data,
    })
  },
  delete: async (id: string): Promise<BankAccount> => {
    return await prisma.bankAccount.delete({ where: { id } })
  },
}

export const CashService = {
  create: async (data: Prisma.CashCreateInput): Promise<Cash> => {
    return await prisma.cash.create({ data })
  },
  getById: async (id: string): Promise<Cash | null> => {
    return await prisma.cash.findUnique({ where: { id } })
  },
  getAll: async (where?: Prisma.CashWhereInput): Promise<Cash[]> => {
    return await prisma.cash.findMany({ where })
  },
  update: async (id: string, data: Prisma.CashUpdateInput): Promise<Cash> => {
    return await prisma.cash.update({
      where: { id },
      data,
    })
  },
  delete: async (id: string): Promise<Cash> => {
    return await prisma.cash.delete({ where: { id } })
  },
}

export const StockService = {
  create: async (data: Prisma.StockCreateInput): Promise<Stock> => {
    return await prisma.stock.create({ data })
  },
  getById: async (id: string): Promise<Stock | null> => {
    return await prisma.stock.findUnique({ where: { id } })
  },
  getAll: async (where?: Prisma.StockWhereInput): Promise<Stock[]> => {
    return await prisma.stock.findMany({ where })
  },
  update: async (id: string, data: Prisma.StockUpdateInput): Promise<Stock> => {
    return await prisma.stock.update({
      where: { id },
      data,
    })
  },
  delete: async (id: string): Promise<Stock> => {
    return await prisma.stock.delete({ where: { id } })
  },
}

export const CryptoService = {
  create: async (data: Prisma.CryptoCreateInput): Promise<Crypto> => {
    return await prisma.crypto.create({ data })
  },
  getById: async (id: string): Promise<Crypto | null> => {
    return await prisma.crypto.findUnique({ where: { id } })
  },
  getAll: async (where?: Prisma.CryptoWhereInput): Promise<Crypto[]> => {
    return await prisma.crypto.findMany({ where })
  },
  update: async (id: string, data: Prisma.CryptoUpdateInput): Promise<Crypto> => {
    return await prisma.crypto.update({
      where: { id },
      data,
    })
  },
  delete: async (id: string): Promise<Crypto> => {
    return await prisma.crypto.delete({ where: { id } })
  },
}

export const OtherService = {
  create: async (data: Prisma.OtherCreateInput): Promise<Other> => {
    return await prisma.other.create({ data })
  },
  getById: async (id: string): Promise<Other | null> => {
    return await prisma.other.findUnique({ where: { id } })
  },
  getAll: async (where?: Prisma.OtherWhereInput): Promise<Other[]> => {
    return await prisma.other.findMany({ where })
  },
  update: async (id: string, data: Prisma.OtherUpdateInput): Promise<Other> => {
    return await prisma.other.update({
      where: { id },
      data,
    })
  },
  delete: async (id: string): Promise<Other> => {
    return await prisma.other.delete({ where: { id } })
  },
}

export { prisma }
