import { EventEmitter } from 'events';
import axios from 'axios';
import * as moment from 'moment';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { Observable } from 'rxjs';

function tokenExpire(time) {
  return moment().diff(moment(time), 'hours') > 1;
}

/* global window */
export default class ClientManager extends EventEmitter {
  constructor() {
    super();
    this.cache = new InMemoryCache();
    const token = window.sessionStorage.getItem('accessToken');
    const issue = window.sessionStorage.getItem('tokenIssue');
    if (!token || !issue || tokenExpire(issue)) {
      this.loadToken();
    } else {
      this.issue = moment(issue);
      this.token = token;
    }

    this.client$ = Observable.create((observer) => {
      this.on('changeClient', (client) => {
        observer.next(client);
      });
    });
  }

  isClientReady() {
    return this.client && !tokenExpire(this.issue);
  }

  async getClient() {
    if (!this.isClientReady()) {
      await this.createClient();
    }

    return this.client;
  }

  getClientObservable() {
    if (!this.isClientReady()) {
      this.createClient();
    }
    return this.client$;
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
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
        mutate: {
          errorPolicy: 'all',
        },
      },
    });
    this.emit('changeClient', this.client);
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
        this.issue = moment();
        window.sessionStorage.setItem('accessToken', data.token);
        window.sessionStorage.setItem('tokenIssue', this.issue.format());
      });
  }
}
