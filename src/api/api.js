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
        data.userInfo = {
          account: acc,
          name: acc + ' Man',
          level: '5',
          permissions: ['dashboard', 'profile', 'user', 'game'],
          jwt: 'abc1234jwtnlasiofdso8sijsdoigfsirjoajf8.sgfuhsdg8f.sfgdsf09gsd09',
        };
        return data;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
  },
};
