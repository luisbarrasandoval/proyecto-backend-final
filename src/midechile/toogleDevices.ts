import fetch from 'node-fetch';

interface toogleDevicesProps{
  sid: string;
  id: string;
  name: string;
  param: string;
}

// * param es el pin que se quiere activar o desactivar
export default async function toogleDevices({sid, id, name, param}: toogleDevicesProps ) {
  const payload = {
    params: [
      {
        svc: "unit/exec_cmd",
        params: {
          itemId: id.toString(),
          commandName: name.toString(),
          linkType: "",
          param: param.toString(),
          timeout: 60,
          flags: 0,
        },
      },
    ],
    flags: 0,
  };

  const url = `http://monitoreo.midechile.cl/wialon/ajax.html?svc=core/batch&sid=${sid}`;
  const body = "params=" + encodeURIComponent(JSON.stringify(payload));
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const data = await response.json();
  return data
}
