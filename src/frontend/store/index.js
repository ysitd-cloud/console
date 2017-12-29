import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import user from './user';
import env from './env';

Vue.use(Vuex);

export default function () {
  return new Store({
    state: {},
    actions: {},
    mutations: {},
    modules: {
      user,
      env,
    },
  });
}
