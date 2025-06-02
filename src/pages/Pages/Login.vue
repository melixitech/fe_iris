<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <card class="card-login card-white">
            <template slot="header">
              <img src="img/card-primary.png" alt="" />
              <h1 class="card-title">Login</h1>
            </template>

            <div>
              <ValidationProvider
                name="acc"
                rules="required|min:1"
                v-slot="{ passed, failed, errors }"
              >
                <base-input
                  required
                  v-model="account"
                  type="text"
                  placeholder="Account"
                  addon-left-icon="tim-icons icon-single-02"
                  :error="errors[0]"
                  :class="[{ 'has-success': passed }, { 'has-danger': failed }]"
                >
                </base-input>
              </ValidationProvider>

              <ValidationProvider
                name="password"
                rules="required|min:1"
                v-slot="{ passed, failed, errors }"
              >
                <base-input
                  required
                  v-model="password"
                  placeholder="Password"
                  addon-left-icon="tim-icons icon-lock-circle"
                  type="password"
                  :error="errors[0]"
                  :class="[{ 'has-success': passed }, { 'has-danger': failed }]"
                >
                </base-input>
              </ValidationProvider>
            </div>

            <div slot="footer">
              <base-button
                native-type="submit"
                type="primary"
                class="mb-3"
                size="lg"
                block
              >
                Get Started
              </base-button>
              <div class="pull-left">
                <h6>
                  <router-link class="link footer-link" to="/register">
                    Create Account
                  </router-link>
                </h6>
              </div>

              <div class="pull-right">
                <h6>
                  <a href="#pablo" class="link footer-link">Need Help?</a>
                </h6>
              </div>
            </div>
          </card>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { extend } from 'vee-validate';
import { required, email, min } from 'vee-validate/dist/rules';

extend('email', email);
extend('min', min);

extend('required', required);

export default {
  data() {
    return {
      account: '',
      password: '',
      subscribe: true,
    };
  },
  mounted() {
    // this.$store.commit('logout');
  },
  methods: {
    submit() {
      const objA = {
        account: this.account,
        password: this.password,
      };
      this.$store.dispatch('login', objA);
    },
  },
};
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
</style>
