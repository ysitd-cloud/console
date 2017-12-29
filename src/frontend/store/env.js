export default {
  namespaced: true,
  state: {
    endpoint: '',
    token: '',
  },
  mutations: {
    updateToken(state, token) {
      state.token = token;
    },
    updateEndpoint(state, endpoint) {
      state.endpoint = endpoint;
    },
  },
  actions: {
    updateToken({ commit }, token) {
      commit('updateToken', token);
    },
    updateEndpoint({ commit }, token) {
      commit('updateEndpoint', token);
    },
  },
  getters: {},
};
