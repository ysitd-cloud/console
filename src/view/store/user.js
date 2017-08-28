
export default {
  namespaced: true,
  state: {
    id: '',
    displayName: '',
    photos: [],
  },
  mutations: {
    update(state, { id, displayName, photos }) {
      state.id = id;
      state.displayName = displayName;
      state.photos = photos;
    },
  },
  actions: {
    update({ commit }, user) {
      commit('update', user);
    },
  },
};
