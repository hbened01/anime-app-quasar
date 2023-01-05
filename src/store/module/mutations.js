export const SET_USER_DATA = (state, payload) => {
  const { user, userId, name } = payload;
  state.user = user;
  state.userId = userId;
  state.username = name;
};

export const SET_DATA_TOP_ANIME_BY_PAGE = (state, payload) => {
  state.databaseAnimeTop = [...payload.data, ...state.databaseAnimeTop];
};

export const SET_PAGINATION_DATA = (state, payload) => {
  state.pagination = payload;
};

export const SET_CURRENT_PAGE = (state, payload) => {
  state.pagination.current_page = payload;
};
