export const state = () => ({
  items: [],
});

export const getters = {
  items: (state) => state.items,
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
