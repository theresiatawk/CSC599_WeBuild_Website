import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
  }),
  endpoints: (build) => ({
    postLogin: build.mutation({
      query: (body) => ({
        url: `/user/login`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { usePostLoginMutation } = loginApi;