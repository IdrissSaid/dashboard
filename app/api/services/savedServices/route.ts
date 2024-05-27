import { NextRequest, NextResponse } from "next/server";
import { IKeyValue, IService, IWidget } from "../interfaces";
import connectDB from "@/lib/connectDB"
import SavedService from "@/Model/SavedService";
import Service from "@/Model/Service";

interface IParams {
  key: string;
  value: string;
}

async function get(endpoint: string, apiKey: string, widget: IWidget, params: IParams[]) {
  const filtredParams = params.filter(item => item.key !== 'service' && item.key !== 'Widget Name' && item.key !== 'widget')
  const reqParams = filtredParams.map(item => {
      return `${encodeURIComponent(item.key)}=${encodeURIComponent(item.value)}`;
  }).join('&');
  return await fetch(`${endpoint}${widget.path}?${apiKey}&${reqParams}`, {
    method: widget.method,
  })
}

async function executeWidget(endpoint: string, apiKey: string, widget: IWidget, params: IParams[]) {
  if (widget.method === 'GET')
    return await get(endpoint, apiKey, widget, params);
  console.error(`Widget Method ${widget.method} not supported`)
  return null
}

async function parseSavedServices(services: IService[], params: IParams[]) {
  const paramService = params.find(param => param.key == "service")?.value || "";
  const paramWidget = params.find(param => param.key == "widget")?.value || "";
  const service = services.find(service => service.name === paramService);
  if (!service) return null;
  const widget = service.widgets.find(widget => widget.name === paramWidget);
  if (!widget) return null;

  const apiKey = Object.entries(service.apiKey).map(([key, value]) => `${key}=${value}`)[0]
  const res = await executeWidget(service.endpoint, apiKey, widget, params)
  const data = await res?.json()
  let path = [] as Array<string>
  const dataRes = [] as any
  // console.log(widget)
  widget.results.map((result) => {
    console.log(result)
    let key = Object.keys(result)[0];
    let value = Object.values(result)[0] as string;
    console.log(key, value)
    if (key === 'in') {
      path.push(value)
    } else if (key === 'out')
      path = []
    else {
      if (path) {
        let nestedProperty = path.reverse().join('.') + '.' + key;
        let propertyValue = data.get()
        console.log(path, nestedProperty, propertyValue)
        if (value == 'boolean') {
          const bValue = parseInt(propertyValue)
          let vTrue = Object.values(result)[1];
          let vFalse = Object.values(result)[2];
          dataRes.push({[key] : bValue ? vTrue : vFalse, type: value})
        } else
          dataRes.push({[key] : propertyValue, type: value})
      } else {
        if (value == 'boolean') {
          const bValue = parseInt(data[key])
          let vTrue = Object.values(result)[1];
          let vFalse = Object.values(result)[2];
          dataRes.push({[key] : bValue ? vTrue : vFalse, type: value})
        } else
          dataRes.push({[key]: data[key], type: value})
      }
    }
  })
  // console.log(dataRes)
  return dataRes
}

export async function POST(req: NextRequest, res: NextResponse) {
  await connectDB();
  try {
    const body = await req.json();

    const services = await Service.find().populate({ path:'widgets' }) as IService[]
    const result = await parseSavedServices(services, body);
    const service = await SavedService.create({data:body, result})
    return NextResponse.json({ service }, { status: 200 });
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
      await connectDB();
      const savedServices = await SavedService.find() as IKeyValue[];
      return NextResponse.json({ data: savedServices });
  } catch (error) {
      return NextResponse.json({ message: error });
  }
}
