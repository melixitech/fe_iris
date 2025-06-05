<template>
  <div v-if="readyInit" class="OutFrameApp">
    <router-view></router-view>
  </div>
</template>

<script>
import { LStorage } from './util/tool';

export default {
  data() {
    return {
      readyInit: false,
    };
  },
  methods: {
    initializeLayout() {
      if (!this.$rtl.isRTL) {
        // Just make sure rtl css is off when we are not on rtl
        this.$rtl.disableRTL();
      }
    },
    async doVerifyJWT() {},
    async doInit() {
      // 1. 先讀 LStorage 的 JWT 往後端進行驗證
      let jwt = LStorage.getJWT();
      if (jwt) {
        await this.$store.dispatch('loginByJWT', jwt);
      }
      console.log('====DDDD init verify jwt isLogin = ' + this.$store.getters.isLogin);
      this.$store.commit('callUserTokenInitDone');
      this.readyInit = true;
    },
  },
  mounted() {
    this.doInit();
    this.initializeLayout();
    window.App = this;
    window.store = this.$store;
  },
};
</script>
