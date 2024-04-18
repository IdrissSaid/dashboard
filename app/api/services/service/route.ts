import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'app/api/services/config.json');

export function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log(jsonData)
    return NextResponse.json({ data: jsonData }, { status: 200 });
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}