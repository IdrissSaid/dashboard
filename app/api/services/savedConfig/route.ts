import SavedConfig from "@/Model/SavedConfig";
import connectDB from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  await connectDB();
  try {
    const body = await req.json();
    const savedConfig = await SavedConfig.create({
      config: body.config,
      savedService: body.savedService
    })
    return NextResponse.json({ savedConfig }, { status: 200 });
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
