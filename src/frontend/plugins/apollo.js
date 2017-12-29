import { ApolloClient } from 'apollo-client';

export default {
  install(Vue, options) {
    Vue.apollo = new ApolloClient(options);
  },
};
