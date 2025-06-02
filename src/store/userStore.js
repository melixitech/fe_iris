import { userApi } from '../api/api.js';
import { LStorage } from '../util/tool.js';

const KEY_USERINFO = 'userInfo';

export const userInfo = {
  namespaced: false,
  state: {
    account: '',
    level: '',
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
      console.log('Account:' + acc + ' , ' + 'Password:' + pwd);
      const res = await userApi.login(acc, pwd);
      if (res && res.userInfo && res.userInfo.jwt) {
        // 登入成功
        context.commit('updateUserInfo', {
          account: res.userInfo.account,
          level: res.userInfo.level,
          name: res.userInfo.name,
          jwt: res.userInfo.jwt,
          permissions: res.userInfo.permissions,
        });
      }
    },
    logout(context) {
      context.commit('logout');
    },
  },
};
