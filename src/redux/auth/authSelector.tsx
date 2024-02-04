const getIsRefreshing = (state: any) => state.auth.isRefreshing;

const getIsLoggedIn = (state: any) => state.auth.isLoggedIn;

const getName = (state: any) => state.auth.user.username;

const getEmail = (state: any) => state.auth.user.email;

const selectJwt = (state: any) => state.auth.jwt;

const authSelector = {
  getIsLoggedIn,
  getIsRefreshing,
  getName,
  getEmail,
  selectJwt,
};

export default authSelector;
