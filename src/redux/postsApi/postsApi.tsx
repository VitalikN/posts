import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api",
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
      providesTags: ["Posts"],
    }),
  }),
});

export const { useGetAllPostsQuery } = postsApi;
