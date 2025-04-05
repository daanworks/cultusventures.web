import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { Prisma } from '@prisma/client'

export const GET = async () => {
  try {
    const response: Prisma.PromiseReturnType<any> = await prisma.analysis.findFirst({
      orderBy: { createdAt: "desc" },
    } as Prisma.AnalysisFindFirstArgs)
    return NextResponse.json(response, { status: 200 } as any
    )
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 } as any);
  }
}