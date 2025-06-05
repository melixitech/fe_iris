import DashboardLayout from '@/pages/Main/MainLayout.vue';
// Components pages
const Buttons = () => import(/* webpackChunkName: "components" */ '@/pages/Components/Buttons.vue');
const GridSystem = () => import(/* webpackChunkName: "components" */ '@/pages/Components/GridSystem.vue');
const Panels = () => import(/* webpackChunkName: "components" */ '@/pages/Components/Panels.vue');
const SweetAlert = () => import(/* webpackChunkName: "components" */ '@/pages/Components/SweetAlert.vue');
const Notifications = () => import(/* webpackChunkName: "components" */ '@/pages/Components/Notifications.vue');
const Icons = () => import(/* webpackChunkName: "components" */ '@/pages/Components/Icons.vue');
const Typography = () => import(/* webpackChunkName: "components" */ '@/pages/Components/Typography.vue');

const cfg = [
  {
    category: {
      routerKey: 'componentsMenu',
      routerInfo: {
        path: '/components',
        component: DashboardLayout,
        redirect: '/components/buttons',
        name: 'Components',
      },
    },
    items: [
      {
        routerInfo: {
          path: 'buttons',
          name: 'Buttons',
          meta: {
            needLogin: true,
          },
          components: { default: Buttons },
        },
      },
      {
        routerInfo: {
          path: 'grid-system',
          name: 'Grid System',
          meta: {
            needLogin: true,
          },
          components: { default: GridSystem },
        },
      },
      {
        routerInfo: {
          path: 'panels',
          name: 'Panels',
          meta: {
            needLogin: true,
          },
          components: { default: Panels },
        },
      },
      {
        routerInfo: {
          path: 'sweet-alert',
          name: 'Sweet Alert',
          meta: {
            needLogin: true,
          },
          components: { default: SweetAlert },
        },
      },
      {
        routerInfo: {
          path: 'notifications',
          name: 'Notifications',
          meta: {
            needLogin: true,
          },
          components: { default: Notifications },
        },
      },
      {
        routerInfo: {
          path: 'icons',
          name: 'Icons',
          meta: {
            needLogin: true,
          },
          components: { default: Icons },
        },
      },
      {
        routerInfo: {
          path: 'typography',
          name: 'Typography',
          meta: {
            needLogin: true,
          },
          components: { default: Typography },
        },
      },
    ],
  },
];

function getRouterItems() {
  const rt = {};
  cfg.forEach((cat) => {
    const key = cat.category.routerKey;
    rt[key] = { ...cat.category.routerInfo };
    rt[key].children = cat.items.map((c) => {
      return c.routerInfo;
    });
  });
  return rt;
}
function getRouterItemsArray() {
  let a = getRouterItems();
  return Object.values(a).map((c) => c);
}

export default {
  getRouterItemsArray,
  getRouterItems,
  cfg: cfg,
};
