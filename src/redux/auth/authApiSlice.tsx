import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { authApi } from "./authAPI";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["jwt", "user"],
};

const initialState = {
  user: {
    username: null,
    email: null,
    id: null,
  },
  jwt: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearjwt: (state) => {
      state.jwt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.user.email = payload.user.email;
          state.user.username = payload.user.username;
          state.user.id = payload.user.id;
          state.jwt = payload.jwt;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user.email = payload.user.email;
          state.user.username = payload.user.username;
          state.user.id = payload.user.id;
          state.jwt = payload.jwt;
          state.isLoggedIn = true;
        }
      );
  },
});

const persisteAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer
);

export const { clearjwt } = authSlice.actions;
export default persisteAuthReducer;
