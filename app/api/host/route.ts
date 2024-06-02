import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    return NextResponse.json({ data: "ipAddress" }, { status: 200 });
    const ipAddress = req?.headers?.get('x-forwarded-host');
    return NextResponse.json({ data: ipAddress }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Failed to process request' }, { status: 500 });
  }
}