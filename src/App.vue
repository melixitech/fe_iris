<template>
  <router-view></router-view>
</template>

<script>
export default {
  methods: {
    initializeLayout() {
      if (!this.$rtl.isRTL) {
        // Just make sure rtl css is off when we are not on rtl
        this.$rtl.disableRTL();
      }
    },
  },
  mounted() {
    this.initializeLayout();
    window.App = this;
    window.store = this.$store;
  },
};
</script>
