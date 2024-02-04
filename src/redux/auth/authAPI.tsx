import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import store from "../store";

// type RootState = ReturnType<typeof store.getState>;
const { baseUrl } = process.env;
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:1337/api/auth/`,
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "local/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "local",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
