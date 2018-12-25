import { ElectionContract } from '~/api';

export const state = () => ({
  candidates: [],
  voters: [],
  chairPerson: null,
  time: new Date(),
  isOpen: true,
  error: null,
});

export const getters = {
  candidates: (state) => state.candidates,
  time: (state) => state.time,
  isOpen: (state) => state.isOpen,
  chairPerson: (state) => state.chairPerson,
  error: (state) => state.error,
};

export const actions = {
  loadDuration({ commit }) {
    const contract = ElectionContract.getInstance().contract;
    return contract.start().then((res) => {
      console.log(res[0].toNumber());
      // commit('SET_TIME', res[0].toString());
    });
  },
  loadCandidates({ commit }) {
    commit('SET_CANDIDATES', []);
    const contract = ElectionContract.getInstance().contract;
    return contract.candidatesCount().then((res) => {
      const count = res[0].toNumber();
      for (let id = 1; id <= count; id++) {
        contract.candidates(id).then((data) => {
          commit('ADD_CANDIDATE', {
            id: data.id.toNumber(),
            name: data.name,
            voteCount: data.voteCount.toNumber(),
          });
        });
      }
    });
  },
  loadChairPerson({ commit }) {
    const contract = ElectionContract.getInstance().contract;
    return contract.chairperson().then((res) => {
      commit('SET_CHAIR_PERSON', res[0]);
    });
  },
  loadVoters({ commit }) {
    const contract = ElectionContract.getInstance().contract;
    // return contract.votersCount().then((res) => {
    //   const count = res[0].toNumber();
    //   for (let id = 1; id <= count; id++) {
    //     contract.voters(id).then((data) => {
    //       commit('ADD_VOTER', data);
    //     });
    //   }
    // });
  },
  grantAccess({ commit, rootState }, address) {
    const contract = ElectionContract.getInstance().contract;
    return contract.giveRightToVote(address, {
      from: rootState.currentUser.address,
    });
  },
  addCandidate({ commit, rootState }, candidateName) {
    const contract = ElectionContract.getInstance().contract;
    return contract.addCandidate(candidateName, {
      from: rootState.currentUser.address,
    });
  },
  vote({ commit, rootState }, candidateId) {
    commit('SET_ERROR', null);
    const contract = ElectionContract.getInstance().contract;
    return contract.vote(candidateId, {
      from: rootState.currentUser.address,
    }).catch((err) => {
      commit('SET_ERROR', err.message);
    });
  },
};

export const mutations = {
  SET_CANDIDATES(state, candidates) {
    state.candidates = candidates;
  },
  ADD_CANDIDATE(state, candidate) {
    state.candidates.push(candidate);
  },
  SET_VOTERS(state, voters) {
    state.voters = voters;
  },
  ADD_VOTER(state, voter) {
    state.voters.push(voter);
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_CHAIR_PERSON(state, address) {
    state.chairPerson = address;
  },
};
