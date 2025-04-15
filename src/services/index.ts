import { Prisma, PrismaClient } from '@prisma/client'
import { ANALYSIS_OPERATION } from '@/types'

const prisma = new PrismaClient()

export const AnalysisService = {
  getLatest: async () => {
    const response = await prisma.analysis.findFirst({
      orderBy: { createdAt: 'desc' },
    } as Prisma.AnalysisFindFirstArgs)
    return response
  },
  deleteById: async (id: string) => {
    await prisma.analysis.delete({
      where: {
        id,
      },
    })
  },
  create: async (longDescription: string, shortDescription: ANALYSIS_OPERATION) => {
    await prisma.analysis.create({
      data: {
        longDescription,
        shortDescription,
      },
    })
  },
}

export const ApiKeyService = {
  getAll: async () => {
    const response = await prisma.apiKey.findMany()
    return response
  },
  create: async (apiKey: string, email: string) => {
    await prisma.apiKey.create({ data: { email, apiKey } })
  },
}
