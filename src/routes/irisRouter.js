import Vue from 'vue';
import Router from 'vue-router';
// import DashboardLayout from 'src/pages/Layout/DashboardLayout.vue';
// import DashboardLayout from './../pages/Starter/SampleLayout.vue';
import DashboardLayout from '../pages/Main/MainLayout.vue';
import Starter from './../pages/Main/MainPage.vue';
import AuthLayout from 'src/pages/Pages/AuthLayout.vue';
// GeneralViews
import NotFound from 'src/pages/GeneralViews/NotFoundPage.vue';
import store from '../store/store';

Vue.use(Router);

const Login = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Login.vue');
const Register = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Register.vue');

let authPages = {
  path: '/',
  component: AuthLayout,
  name: 'Authentication',
  children: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
  ],
};

const routerA = new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
    },
    authPages,
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          meta: {
            isLogin: true,
          },
          components: { default: Starter },
        },
        {
          path: 'search_by_bet',
          name: 'search_by_bet',
          components: { default: Starter },
          meta: {
            permission: 'SearchByBetID',
          },
        },
        {
          path: 'search_by_player',
          name: 'search_by_player',
          components: { default: Starter },
          meta: {
            permission: 'SearchByPlayer',
          },
        },
      ],
    },
    { path: '*', component: NotFound },
  ],
  linkActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

routerA.beforeEach((to, from, next) => {
  console.log(to.meta);
  if (!to?.meta?.permission && !to?.meta?.isLogin) {
    next();
    return true;
  }
  const fnName = to.meta.permission;
  let flg = false;
  if (
    !store.state?.userInfo?.permissions ||
    store.state.userInfo.permissions.length == 0
  ) {
    console.log(3);
    location.hash = '/Login';
    return { name: 'Login' };
  }

  if (to.meta.isLogin && store._wrappedGetters.isLogin) flg = true;
  store.state.userInfo.permissions.forEach((c) => {
    if (c.functionName == fnName && c.permission?.read == true) {
      flg = true;
    }
  });
  if (flg) {
    console.log(1);
    next();
  } else {
    console.log(2);
    location.hash = '/Login';
  }
  return true;
});

export default routerA;
