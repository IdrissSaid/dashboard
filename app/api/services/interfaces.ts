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
  method: string;
  params: IParam[];
  results: [{}]
}

export interface IKeyValue {
  data: [{
    key: string;
    value: string;
  }]
  result: [{}];
  _id: string;
  createdAt: string;
  createdBy: string;
}

export interface IService {
  name: string;
  apiKey: string;
  endpoint: string;
  widgets: IWidget[];
}

export interface ISavedConfig {
  config: [string];
  widget: string;
}
