import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export const GET = async () => {
  try {
    const response = await prisma.analysis.findFirst({
      orderBy: { createdAt: "desc" },
    } as any)
    return NextResponse.json(response, { status: 200 } as any
    )
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 } as any);
  }
}