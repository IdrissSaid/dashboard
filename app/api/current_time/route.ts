import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, res: NextResponse) {
  const currentTime = Math.floor(Date.now() / 1000);
  return NextResponse.json({ data: currentTime }, { status: 200 });
}
