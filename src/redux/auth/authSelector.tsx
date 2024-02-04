const getIsRefreshing = (state: any) => state.auth.isRefreshing;

const getIsLoggedIn = (state: any) => state.auth.isLoggedIn;

const getName = (state: any) => state.auth.user.username;

const getEmail = (state: any) => state.auth.user.email;

//
const getidentifier = (state: any) => state.auth.identifier;
//
const selectJwt = (state: any) => state.auth.jwt;
const authSelector = {
  getIsLoggedIn,
  getIsRefreshing,
  getName,
  getEmail,
  selectJwt,
  getidentifier,
};

export default authSelector;
