import { Device } from 'interfaces/device';
import fetch from 'node-fetch';

const getDevices = async (sid: string) => {
  const url = `http://monitoreo.midechile.cl/wialon/ajax.html?svc=core/update_data_flags&sid=${sid}`;
  const payload = {
    spec: [{ type: "type", data: "avl_unit", flags: 4294967295, mode: 1 }],
  };

  const body = "params=" + encodeURIComponent(JSON.stringify(payload));

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await res.json();

 const devices: Device[] = data.map((device: any) => {
    if (!device) {
      return null;
    }

    return {
      id: device.i,
      name: device.d?.nm,
      phone: device.d?.ph,
      cmds: device.d?.cmds.map((cmd: any) => {
        return {
          name: cmd.n,
          action: cmd.c,
          param: cmd.a,
        };
      }),

      position: [device.d?.pos.y, device.d?.pos.x],
      sensors: Object.values(device.d?.sens || {}).map((sen: any) => {
        return {
          id: sen.id,
          name: sen.n,
          description: sen.d,
          cal: sen.tbl,
        };
      }),

      parmas: device.d?.prms,
    };
  });

  return devices;
}

export default getDevices;