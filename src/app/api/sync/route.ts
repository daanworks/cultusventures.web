import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export const GET = async (req: NextRequest) => {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 } as any);
  }
  try {
    await prisma.analysis.create({
      data: {
        content: 'HOLD'
      }
    })
    return NextResponse.json({ success: true }, { status: 200 } as any)
  } catch (error) {
    console.log("Sync error: " + (error as Error).message)
    return NextResponse.json({ error: "Sync error: " + (error as Error).message }, { status: 500 } as any)
  }

}