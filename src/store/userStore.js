import { userApi } from '../api/api.js';
import { LStorage } from '../util/tool.js';

const KEY_USERINFO = 'userInfo';

export const userInfo = {
  namespaced: false,
  state: {
    account: '',
    name: '',
    jwt: '',
    permissions: [],
  },
  getters: {
    isLogin(state) {
      return state.jwt != '';
    },
  },
  mutations: {
    updateUserInfo(state, objA = {}) {
      // 所有操作都要經過 upateUserInfo
      Object.assign(state, objA);
      LStorage.saveObj(KEY_USERINFO, JSON.parse(JSON.stringify(state)));
    },
    updateAccount(state, acc) {
      this.commit('updateUserInfo', { account: acc });
    },
    updateJWT(state, jwt) {
      this.commit('updateUserInfo', { jwt: jwt });
    },
    logout(state) {
      this.commit('updateUserInfo', { jwt: '', permission: [], level: '' });
    },
  },
  actions: {
    async login(context, objA) {
      if (typeof objA !== 'object') return false;
      const acc = objA.account;
      const pwd = objA.password;
      console.log('====DDDD Account:' + acc + ' , ' + 'Password:' + pwd);
      const res = await userApi.login(acc, pwd);
      if (res && res.UserInfo && res.UserInfo.Jwt) {
        // 登入成功
        context.commit('updateUserInfo', {
          account: res.UserInfo.Account,
          name: res.UserInfo.Name,
          jwt: res.UserInfo.Jwt,
          permissions: res.UserInfo.Permissions.map((c) => {
            return {
              functionName: c.FunctionName,
              permission: {
                create: c.Permission.Create,
                update: c.Permission.Update,
                read: c.Permission.Read,
              },
            };
          }),
        });

        // 導引到所有用戶都有的 dashboard
        this.routerA.push('/dashboard')
      }
    },
    logout(context) {
      context.commit('logout');
    },
  },
};
