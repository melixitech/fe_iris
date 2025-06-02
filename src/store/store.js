import Vue from 'vue';
import Vuex from 'vuex';
import { userInfo } from './userStore';

Vue.use(Vuex);

const sample = {
  namespaced: true,
  state: {
    countB: 0,
  },
  mutations: {
    increment(state) {
      state.countB++;
    },
    decrement(state) {
      state.countB--;
    },
  },
};

export default new Vuex.Store({
  modules: {
    sample,
    userInfo,
  },
});
