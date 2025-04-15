import { PrismaClient, Analysis, ApiKey } from '@prisma/client'
import { ANALYSIS_OPERATION } from '@/types'

const prisma = new PrismaClient()

export const AnalysisService = {
  getLatest: async (): Promise<Analysis | null> => {
    const response = await prisma.analysis.findFirst({
      orderBy: { createdAt: 'desc' },
    })
    return response
  },
  deleteById: async (id: string): Promise<void> => {
    await prisma.analysis.delete({
      where: {
        id,
      },
    })
  },
  create: async (longDescription: string, shortDescription: ANALYSIS_OPERATION): Promise<void> => {
    await prisma.analysis.create({
      data: {
        longDescription,
        shortDescription,
      },
    })
  },
}

export const ApiKeyService = {
  getAll: async (): Promise<ApiKey[] | null> => {
    const response = await prisma.apiKey.findMany()
    return response
  },
  create: async (apiKey: string, email: string): Promise<void> => {
    await prisma.apiKey.create({ data: { email, apiKey } })
  },
}
