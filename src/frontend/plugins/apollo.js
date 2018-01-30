import { defaultManager } from '../service/apollo';

export const defaultClient = defaultManager;

export default {
  install(Vue) {
    Vue.prototype.$apollo = defaultManager;
  },
};
