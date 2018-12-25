import { ElectionContract } from '~/api';

export const state = () => ({
  hasVoted: false,
  address: null,
  voterData: {},
});

export const getters = {
  hasVoted: (state) => state.hasVoted,
  address: (state) => state.address,
  voterData: (state) => state.voterData,
};

export const actions = {
  loadVoterData({ commit, state }) {
    const contract = ElectionContract.getInstance().contract;
    return contract.voters(state.address).then((data) => {
      commit('SET_VOTER_DATA', {
        weight: data.weight.toNumber(),
        voted: data.voted,
        vote: data.vote.toNumber(),
        delegate: data.delegate,
      });
    });
  },
};

export const mutations = {
  SET_HAS_VOTES(state, hasVoted) {
    state.hasVoted = hasVoted;
  },
  SET_ADDRESS(state, address) {
    state.address = address;
  },
  SET_VOTER_DATA(state, data) {
    state.voterData = data;
  },
};
