import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const ipAddress = req?.headers?.get('x-forwarded-host');
    return NextResponse.json({ data: ipAddress }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ message: 'Failed to process request' }, { status: 500 });
  }
}