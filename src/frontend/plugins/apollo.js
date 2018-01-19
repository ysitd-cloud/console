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
      this.loadToken();
    } else {
      this.token = token;
    }
  }

  async getClient() {
    if (!this.client) {
      await this.createClient();
    }

    return this.client;
  }

  async createClient() {
    if (!this.endpoint) {
      await this.getEndpoint();
    }
    if (!this.token) {
      await this.loadToken();
    }
    const link = new HttpLink({
      uri: `${this.endpoint}/graphql`,
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    this.client = new ApolloClient({
      link,
      cache: this.cache,
    });
  }

  async getEndpoint() {
    return axios.get('/auth/endpoint')
      .then(({ data }) => {
        this.endpoint = data.endpoint;
      });
  }

  async renewClient() {
    await this.loadToken();
    await this.createClient();
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
