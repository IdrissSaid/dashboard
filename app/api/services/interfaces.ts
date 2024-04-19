export interface IParam {
  name: string;
  type: string;
}

export interface IWidget {
  name: string;
  description: string;
  path: string;
  type: string;
  params: IParam[];
}

export interface ISevice {
  name: string;
  apiKey: string;
  endpoint: string;
  widgets: IWidget[];
}
