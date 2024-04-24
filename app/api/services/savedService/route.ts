import { NextRequest, NextResponse } from "next/server";
import path from 'path';
import { IService, IWidget } from "../interfaces";
import connectDB from "@/lib/connectDB"
import Service from "@/Model/Service";
import SavedService from "@/Model/SavedService";

interface IParams {
  key: string;
  value: string;
}

const filePath = path.join(process.cwd(), 'app/api/services/config.json');

async function get(endpoint: string, apiKey: string, widget: IWidget, params: IParams[]) {
  const reqParams = params.filter(item => item.key !== 'service' && item.key !== 'widget').map(item => {
      return Object.values(item).join('=')
  }).join('&');
  console.log(reqParams)
  return await fetch(`${endpoint}${widget.path}?${apiKey}&${reqParams}`, {
    method: widget.type,
  })
}

async function executeWidget(endpoint: string, apiKey: string, widget: IWidget, params: IParams[]) {
  if (widget.type === 'GET')
    return await get(endpoint, apiKey, widget, params);
  return null
}

async function parseSevices(services: IService[], params: IParams[]) {
  const paramService = params.find(param => param.key == "service")?.value || "";
  const paramWidget = params.find(param => param.key == "widget")?.value || "";
  const service = services.find(service => service.name === paramService);
  if (!service) return null;
  const widget = service.widgets.find(widget => widget.name === paramWidget);
  if (!widget) return null;

  const apiKey = Object.entries(service.apiKey).map(([key, value]) => `${key}=${value}`)[0]
  const res = await executeWidget(service.endpoint, apiKey, widget, params)
  return await res?.json()
}

export async function POST(req: NextRequest, res: NextResponse) {
  await connectDB();
  try {
    const body = await req.json();
    const service = await SavedService.create({data:body})
    return NextResponse.json({ service }, { status: 200 });
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
      await connectDB();
      const services = await Service.find();
      return NextResponse.json({ data: services });
  } catch (error) {
      return NextResponse.json({ message: error });
  }
}
