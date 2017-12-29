import Vue from 'vue';
import { InMemoryCache } from 'apollo-cache-inmemory';
import apolloPlugin from './plugins/apollo';

Vue.use(apolloPlugin, {
  cache: new InMemoryCache(),
});
