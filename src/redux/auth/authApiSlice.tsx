import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { authApi } from "./authAPI";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["jwt"],
};

const initialState = {
  user: {
    username: null,
    email: null,
    id: null,
  },
  identifier: null,
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
        (state, action) => {
          state.user.email = action.payload.email;
          state.user.username = action.payload.username;
          state.user.id = action.payload.id;

          state.jwt = action.payload.jwt;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user.email = action.payload.email;
        //
        state.identifier = action.payload.identifier;
        //
        state.user.username = action.payload.username;
        state.user.id = action.payload.id;
        state.jwt = action.payload.jwt;
        state.isLoggedIn = true;
      });
  },
});

const persisteAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer
);

export const { clearjwt } = authSlice.actions;
export default persisteAuthReducer;
