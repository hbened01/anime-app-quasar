export const setUserData = (store, payload) => {
  store.commit("SET_USER_DATA", payload);
};

export const setDataTopAnimeByPage = (store, payload) => {
  store.commit("SET_DATA_TOP_ANIME_BY_PAGE", payload);
};
