import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const createdAt = new Date(Date.now()).toISOString().split("T")[0]
    // ENABLED CACHING
    const jokeResponse = await fetch('https://api.sampleapis.com/jokes/goodJokes', { next: { revalidate: 3600 } });
    const joke = await jokeResponse.json();
    return NextResponse.json(
      {
        createdAt,
        message: 'HOLD',
        joke: joke[0]
      },
      {
        status: 200,
      } as any
    )
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 } as any);
  }
}