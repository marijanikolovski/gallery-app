const selectActiveUser = (state) => state.auth.activeUser;

const selectToken = (state) => state.auth.token;

export { selectActiveUser, selectToken };
