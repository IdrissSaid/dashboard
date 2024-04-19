import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export function GET(req: NextApiRequest, res: NextApiResponse) {
  const currentTime = Math.floor(Date.now() / 1000);
  return NextResponse.json({ data: currentTime }, { status: 200 });
}
