import SavedConfig from "@/Model/SavedConfig";
import connectDB from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(res: NextResponse, params: {params: {id: string}}) {
  await connectDB();
  try {
    const id = params.params.id
    if (!id) {
      return NextResponse.json({ message: 'Widget ID is required' }, { status: 400 });
    }

    const savedConfig = await SavedConfig.findOne({savedService: id});
    if (!savedConfig) {
      return NextResponse.json({ message: 'Config not found' }, { status: 404 });
    }

    return NextResponse.json({ savedConfig }, { status: 200 });
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}