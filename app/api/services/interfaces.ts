export interface IParam {
  name: string;
  desc: string;
  type: string;
}

export interface IWidget {
  name: string;
  description: string;
  path: string;
  type: string;
  params: IParam[];
}

export interface IService {
  name: string;
  apiKey: string;
  endpoint: string;
  widgets: IWidget[];
}
