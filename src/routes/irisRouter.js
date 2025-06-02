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
const Lock = () =>
  import(/* webpackChunkName: "pages" */ 'src/pages/Pages/Lock.vue');

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
    {
      path: '/lock',
      name: 'Lock',
      component: Lock,
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
      meta: {
        permissions: ['dashboard', 'profile', 'user', 'game'],
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          components: { default: Starter },
          meta: {
            permissions: ['dashboard'],
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
  if (!to?.meta?.permissions) {
    next();
    return true;
  }
  const permissions = to.meta.permissions;
  let flg = false;
  if (!store.state?.userInfo?.permissions) {
    console.log(3);
    location.hash = '/Login';
    return { name: 'Login' };
  }
  permissions.forEach((c) => {
    if (store.state.userInfo.permissions.includes(c)) flg = true;
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
