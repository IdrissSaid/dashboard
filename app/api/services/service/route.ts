import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import { ISevice, IWidget } from "../interfaces";

interface IParams {
  key: string;
  value: string;
}

const filePath = path.join(process.cwd(), 'app/api/services/config.json');

async function get(endpoint: string, apiKey: string, widget: IWidget, params: IParams[]) {
  const reqParams = params.filter(item => item.key !== 'service' && item.key !== 'widget').map(item => {
      return Object.values(item).join('=')
  }).join('&');

  return await fetch(`${endpoint}${widget.path}?${apiKey}&${reqParams}`, {
    method: widget.type,
  })
}

async function executeWidget(endpoint: string, apiKey: string, widget: IWidget, params: IParams[]) {
  if (widget.type === 'GET')
    return await get(endpoint, apiKey, widget, params);
  return null
}

async function parseSevices(services: ISevice[], params: IParams[]) {
  const paramService = params.find(param => param.key == "service")?.value || "";
  const paramWidget = params.find(param => param.key == "widget")?.value || "";
  const service = services.find(service => service.name === paramService);
  if (!service) return null;
  const widget = service.widgets.find(widget => widget.name === paramWidget);
  if (!widget) return null;

  const apiKey = Object.entries(service.apiKey).map(([key, value]) => `${key}=${value}`)[0]
  const res = await executeWidget(service.endpoint, apiKey, widget, params)
  const data = await res?.json()
  console.log(data)
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const services = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const params : IParams[] = [
      { key: "q", value: "reunion" },
      { key: "widget", value: "city_temperature" },
      { key: "service", value: "weather" },
    ]
    await parseSevices(services, params)
    return NextResponse.json({ data: services }, { status: 200 });
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}