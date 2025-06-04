import axios from 'axios';

let req = axios.create({
  baseURL: 'https://tdx.transportdata.tw/api/basic/v3/',
  timeout: 60000,
  withCredentials: false,
  headers: {
    Authorization: 'none',
    'Content-Type': 'application/json',
  },
});

export const userApi = {
  login(acc, pwd) {
    return req
      .get(
        'Rail/TRA/Network',
        {
          account: acc,
          password: pwd,
        },
        {}
      )
      .then((e) => {
        console.log('====DDDD login then', e);
        const data = e.data;
        data.UserInfo = {
          Account: acc,
          Name: acc + ' Man',
          Jwt: 'abc1234jwtnlasiofdso8sijsdoigfsirjoajf8.sgfuhsdg8f.sfgdsf09gsd09',
          Permissions: [
            {
              FunctionName: 'SearchByBetID',
              Permission: { Read: true, Create: true, Update: true },
            },
            {
              FunctionName: 'SearchByPlayer',
              Permission: { Read: true, Create: true, Update: true },
            },
            {
              FunctionName: 'GameList',
              Permission: { Read: true, Create: true, Update: true },
            },
            {
              FunctionName: 'CurrencyList',
              Permission: { Read: true, Create: true, Update: true },
            },
            {
              FunctionName: 'RoleManagement',
              Permission: { Read: true, Create: true, Update: true },
            },
            {
              FunctionName: 'UserManagement',
              Permission: { Read: true, Create: true, Update: true },
            },
            {
              FunctionName: 'VendorManagement',
              Permission: { Read: true, Create: true, Update: true },
            },
            {
              FunctionName: 'GameProviderManagement',
              Permission: { Read: true, Create: true, Update: true },
            },
          ],
        };
        return data;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  },
};
