import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../lib/prisma";

export const GET = async (req: NextRequest) => {
  try {
    const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 } as any);
    }
    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];
    if (user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASSWORD) {
      const response = await prisma.apiKey.findMany();
      const data = response.map(record => record.apiKey)
      return NextResponse.json(data, { status: 200 } as any)
    } else {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 403 } as any);
    }

  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 } as any);
  }
}