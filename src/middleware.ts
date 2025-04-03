import { NextRequest, NextResponse } from "next/server";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60 });

export const middleware = async (req: NextRequest) => {
  const apiKey = req.headers.get("CV-API-KEY");
  const adminCredentials = btoa(`${process.env.ADMIN_USER}:${process.env.ADMIN_PASSWORD}`);
  if (!apiKey) {
    return NextResponse.json({ error: "API key required" }, { status: 401 } as any);
  }
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + '/api/apiKey',
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${adminCredentials}`,
        "Content-Type": "application/json"
      }
    }
  );
  const apiKeys = await response.json();
  const isKeyExist = apiKeys.includes(apiKey);
  if (!isKeyExist) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 403 } as any);
  }
  const requestCount = (cache.get(apiKey) as number) || 0;
  if (requestCount >= 10) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 } as any);
  }
  cache.set(apiKey, requestCount + 1);
  return NextResponse.next();
}

export const config = {
  matcher: "/api/analysis/:path*",
};