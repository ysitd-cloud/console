import Vue from 'vue';
import { RestLink } from 'apollo-link-rest';
import { InMemoryCache } from 'apollo-cache-inmemory';
import apolloPlugin from './plugins/apollo';

Vue.use(apolloPlugin, {
  link: new RestLink({ uri: '/' }),
  cache: new InMemoryCache(),
});
