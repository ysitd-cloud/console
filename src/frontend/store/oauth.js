export default {
  namespaced: true,
  state: {
    accessToken: '',
  },
  mutations: {
    updateAccessToken(state, token) {
      state.accessToken = token;
    },
  },
  actions: {
    refreshToken({ commit }, { accessToken }) {
      commit('updateAccessToken', accessToken);
    },
  },
};
