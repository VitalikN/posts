import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApiUser = createApi({
  reducerPath: "postsApiUser",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/",

    prepareHeaders: (headers, { getState }) => {
      const jwt = (getState() as { auth: { jwt: string } }).auth.jwt;

      if (jwt) {
        headers.set("authorization", `Bearer ${jwt}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPost: builder.query({
      query: (id) => `posts/${id}`,
      providesTags: (id) => [{ type: "Posts", id }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});
export const { useGetPostQuery, useDeletePostMutation } = postsApiUser;
