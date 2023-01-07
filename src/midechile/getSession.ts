import fetch from 'node-fetch';

const getSession = async (token: string) => {
  const payload = { token, fl: 2 };
  const body = 'params=' + encodeURIComponent(JSON.stringify(payload));

  const response = await fetch(
    'http://monitoreo.midechile.cl/wialon/ajax.html?svc=token/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    },
  );

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }

  return {
    id: data.user.id,
    name: data.au,
    token,
    eid: data.eid,
  };
};


export default getSession;