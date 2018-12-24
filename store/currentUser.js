export const state = () => ({
  hasVoted: false,
  address: null,
});

export const getters = {
  hasVoted: (state) => state.hasVoted,
  address: (state) => state.address,
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
  SET_HAS_VOTES(state, hasVoted) {
    state.hasVoted = hasVoted;
  },
  SET_ADDRESS(state, address) {
    state.address = address;
  },
};
