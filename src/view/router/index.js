import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default function () {
  return new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', component: () => import('../pages/Home.vue') },
    ],
  });
}
