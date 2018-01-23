import Vue from 'vue';
import VueRouter from 'vue-router';
import Meta from 'vue-meta';

Vue.use(VueRouter);
Vue.use(Meta);

export default function () {
  return new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('../pages/Home.vue') },
      { name: 'app.list', path: '/app', component: () => import('../pages/app/list/wrapper') },
      { name: 'app.create', path: '/app/create', component: () => import('../pages/app/create/page.js') },
      {
        name: 'app.get', path: '/app/:id', component: () => import('../pages/app/get/Page.vue'), props: true,
      },
      { name: 'account.get', path: '/account', component: () => import('../pages/account/get/wrapper') },
    ],
  });
}
