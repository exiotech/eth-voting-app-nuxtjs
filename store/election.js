export const state = () => ({
  candidates: [{
    id: 1,
    name: 'User 1',
  }, {
    id: 2,
    name: 'User 2',
  }, {
    id: 3,
    name: 'User 3',
  }, {
    id: 4,
    name: 'User 4',
  }, {
    id: 5,
    name: 'User 5',
  }],
  time: new Date(),
  isOpen: true
});

export const getters = {
  candidates: (state) => state.candidates,
  time: (state) => state.time,
  isOpen: (state) => state.isOpen,
};

export const actions = {
  getCandidates({commit}) {
    // ----
    commit('SET_CANDIDATES', data);
  },
  vote({ commit }, candidateId) {

  },
};

export const mutations = {
  SET_CANDIDATES(state, candidates) {
    state.candidates = candidates;
  },
};
