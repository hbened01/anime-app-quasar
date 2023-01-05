export const setUserData = (store, payload) => {
  store.commit("SET_USER_DATA", payload);
};

export const setDataTopAnimeByPage = (store, payload) => {
  store.commit("SET_DATA_TOP_ANIME_BY_PAGE", payload);
};

export const setPaginationData = (store, payload) => {
  store.commit("SET_PAGINATION_DATA", payload);
};

export const setCurrentPage = (store, payload) => {
  store.commit("SET_CURRENT_PAGE", payload);
};
