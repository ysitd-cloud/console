import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

class Apollo {
  constructor(options) {
    this.cache = options.cache || new InMemoryCache();
    this.clients = 'link' in options && options.link ? { default: new ApolloClient(options) } : {};
  }

  addClient(name, link) {
    const client = new ApolloClient({
      link,
      cache: this.cache,
    });

    this.clients[name] = client;
  }

  getClient(name) {
    return this.clients[name];
  }

  removeClient(name) {
    delete this.clients[name];
  }
}

export default {
  install(Vue, options) {
    Vue.prototype.$apollo = new Apollo(options);
  },
};
