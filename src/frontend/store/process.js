class State {
  constructor(id, message, type) {
    this.id = id;
    this.message = message;
    this.type = type;
  }
}

const ADD_STATE = 'ADD_STATE';
const REMOVE_STATE = 'REMOVE_STATE';

export default {
  namespaced: true,
  state: {
    states: [],
  },
  getters: {
    current(state) {
      const { states } = state;
      return states[states.length - 1];
    },
    display(state) {
      return state.states.length > 0;
    },
  },
  mutations: {
    [ADD_STATE](state, current) {
      state.states = [...state.states, current];
    },
    [REMOVE_STATE](state, id) {
      state.states = state.states.filter(e => e.id !== id);
    },
  },
  actions: {
    createState({ commit }, opt) {
      let type = 'info';
      let message;
      if (typeof opt === 'string') {
        message = opt;
      } else {
        const msg = opt.message;
        const realType = opt.type;
        type = realType;
        message = msg;
      }
      const key = `${message}-${Date.now()}`;
      commit(ADD_STATE, new State(key, message, type));
      return key;
    },
    finishState({ commit }, key) {
      commit(REMOVE_STATE, key);
    },
    endCurrent({ commit, getters }) {
      commit(REMOVE_STATE, getters.current.id);
    },
  },
};
