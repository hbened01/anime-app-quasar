export const SET_USER_DATA = (state, payload) => {
  const { user, userId, name } = payload;
  state.user = user;
  state.userId = userId;
  state.username = name;
};
