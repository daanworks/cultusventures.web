import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { BUY, DO_NOTHING, HOLD, SELL } from "@/constants";
import { Prisma } from '@prisma/client'

export const GET = async (req: NextRequest) => {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 } as any);
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    const latestItem: Prisma.PromiseReturnType<any> = await prisma.analysis.findFirst({
      orderBy: { createdAt: "desc" },
    } as Prisma.AnalysisFindFirstArgs)
    if (latestItem.shortDescription === HOLD || latestItem.shortDescription === DO_NOTHING) {
      await prisma.analysis.delete({
        where: {
          id: latestItem.id
        }
      })
    }
    const today = new Date().toISOString().split('T')[0]
    const prompts = {
      [HOLD]: 'Explain me why should I hold my Bitcoins in a few words according to todays fundamental and technical analysis. Today is ' + today,
      [BUY]: 'buy',
      [SELL]: 'sell',
      [DO_NOTHING]: 'do nothing with'
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompts[HOLD],
    })
    const longDescription = response.text as string
    const shortDescription = HOLD
    await prisma.analysis.create({
      data: {
        longDescription,
        shortDescription
      }
    })
    return NextResponse.json({ success: true }, { status: 200 } as any)
  } catch (error) {
    console.log("Sync error: " + (error as Error).message)
    return NextResponse.json({ error: "Sync error: " + (error as Error).message }, { status: 500 } as any)
  }

}