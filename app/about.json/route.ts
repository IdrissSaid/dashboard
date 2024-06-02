import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const ipAddress = await fetch(`${process.env.SERVER_HOST}/host`, { method: 'GET' });
    const currentTime = await fetch(`${process.env.SERVER_HOST}/current_time`, { method: 'GET' });

    // if (!ipAddress.ok) {
    //   throw new Error('Failed to fetch data');
    // }
    return NextResponse.json({
      "client": "await ipAddress.json().then(res => res.data)",
      "server": {
        "current_time": await currentTime.json().then(res => res.data)
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.error();
  }
}
