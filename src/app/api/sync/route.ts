import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { GoogleGenAI } from "@google/genai";

export const GET = async (req: NextRequest) => {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 } as any);
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Explain how AI works in a few words",
    })
    const content = response.text as string
    await prisma.analysis.create({
      data: {
        content
      }
    })
    return NextResponse.json({ success: true }, { status: 200 } as any)
  } catch (error) {
    console.log("Sync error: " + (error as Error).message)
    return NextResponse.json({ error: "Sync error: " + (error as Error).message }, { status: 500 } as any)
  }

}