export const getState = (state) => {
  return state;
};

export const getUserInfo = (state) => {
  return { user: state.user, userId: state.userId, username: state.username };
};
