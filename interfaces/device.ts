export interface Cmd {
  name: string;
  action: string;
  param: string;
}


export interface Sensor {
  id: string;
  name: string;
  description: string;
  cal: {
    x: number;
    a: number;
    b: number;
  }[];
}

export interface Status {
  v: number;
  ac: number;
  at: number;
}

export interface Device {
  id: number;
  name: string;
  phone: string;
  group: {
    name: string
    order: number
  }
  cmd: Cmd[]
  position: number[];
  sensors: Sensor[];
  // key value
  parmas: {
    [key: string]: Status;
  };
}