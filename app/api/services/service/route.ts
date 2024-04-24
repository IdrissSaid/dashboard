import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/connectDB"
import Service from "@/Model/Service";
import Widget from "@/Model/Widget";

export async function POST(req: NextRequest, res: NextResponse) {
  await connectDB();

  try {
    const service = await Service.create({
      name: "Meteo",
      endpoint: "http://api.weatherapi.com/v1/",
      apiKey: {
        key: "b0a2912b458a4027aaf153649241804"
      },
    });

    const widget = await Widget.create({
      name: "City Temperature",
      description: "Display temperature for a city",
      path: "current.json",
      type: "GET",
      params: [
        {
          name: "q",
          desc: "City",
          type: "string"
        }
      ]
    });

    await Service.findByIdAndUpdate(
      service._id,
      { $push: { widgets: widget } },
      { new: true }
    );

    return NextResponse.json({ data: service }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create service" }, { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
      await connectDB();
      const services = await Service.find().populate("widgets");
      return NextResponse.json({ data: services });
  } catch (error) {
      return NextResponse.json({ message: error });
  }
}
