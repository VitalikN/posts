import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApiUser = createApi({
  reducerPath: "postsApiUser",
  tagTypes: ["Posts"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/posts",

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
      query: (id) => `/${id}?populate=*`,
      providesTags: (id) => [{ type: "Posts", id }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
    addPost: builder.mutation({
      query: (formData) => ({
        url: `/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: (formData) => ({
        url: `/${formData.id}`,
        method: "PUT",
        body: formData.data,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});
export const {
  useGetPostQuery,
  useDeletePostMutation,
  useAddPostMutation,
  useUpdatePostMutation,
} = postsApiUser;
