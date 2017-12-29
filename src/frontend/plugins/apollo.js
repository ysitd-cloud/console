import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import axios from 'axios';

/* global window */
class Apollo {
  constructor() {
    this.cache = new InMemoryCache();
    const token = window.sessionStorage.getItem('accessToken');
    if (!token) {
      axios.post('/auth/api')
        .then(({ data }) => {
          this.token = data.token;
          window.sessionStorage.setItem('accessToken', data.token);
        });
    } else {
      this.token = token;
    }
    axios.get('/auth/endpoint')
      .then(({ data }) => {
        this.endpoint = data.endpoint;
      });
  }

  getClient() {
    if (!this.client) {
      this.createClient();
    }

    return this.client;
  }

  createClient() {
    const link = new HttpLink({
      uri: `${this.endpoint}/graphql`,
    });
    this.client = new ApolloClient({
      link,
      cache: this.cache,
    });
  }

  async renewClient() {
    await this.loadToken();
    this.createClient();
    return this.client;
  }

  loadToken() {
    return axios.post('/auth/api')
      .then(({ data }) => {
        this.token = data.token;
        window.sessionStorage.setItem('accessToken', data.token);
      });
  }
}

export default {
  install(Vue) {
    Vue.prototype.$apollo = new Apollo();
  },
};
