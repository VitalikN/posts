import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import persisteAuthReducer from "./auth/authApiSlice";
import { authApi } from "./auth/authAPI";
import { postsApi } from "./postsApi/postsApi";
import { postsApiUser } from "./postsApiUser/postsApiUser";

const store = configureStore({
  reducer: {
    auth: persisteAuthReducer,

    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [postsApiUser.reducerPath]: postsApiUser.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, postsApi.middleware, postsApiUser.middleware),
});

export const persistor = persistStore(store);

export default store;
