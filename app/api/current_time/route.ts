import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export function GET(req: NextApiRequest, res: NextApiResponse) {
  const currentTime = Math.floor(Date.now() / 1000);
  return NextResponse.json({ data: currentTime }, { status: 200 });
}