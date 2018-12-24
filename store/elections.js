export const state = () => ({
  items: [],
});

export const getters = {
  items: (state) => state.items,
};

export const actions = {
  getItems({commit}) {
    commit('SET_ITEMS', data);
  },
};

export const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  },
};
