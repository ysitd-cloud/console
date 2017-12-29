import Vue from 'vue';
import Vuetify from 'vuetify';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import createRouter from './router';
import createStore from './store';
import apolloPlugin from './plugins/apollo';

Vue.use(Vuetify, {
  theme: {
    primary: '#44A148',
  },
});

export default function (isClient = false) {
  const router = createRouter();
  const store = createStore();

  sync(store, router);

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  });

  if (isClient) {
    Vue.use(apolloPlugin);
  }

  return { app, router, store };
}
