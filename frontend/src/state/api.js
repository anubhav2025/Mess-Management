import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { USERS_URL } from "../constants";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Performance",
    "Dashboard",
    "MenuItems",
    "FilteredComplaints",
  ],
  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    // register: builder.mutation({
    // 	query: (data) => ({
    // 		url: `${USERS_URL}`,
    // 		method: "POST",
    // 		body: data,
    // 	}),
    // }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    getUser: builder.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getMenuItems: builder.query({
      query: (messId) => ({
        url: `${BASE_URL}/api/mess/menu/menuItems/${messId}/array`,
        method: "GET",
      }),
      providesTags: ["MenuItems"],
    }),
    getFilteredComplaints: builder.query({
      query: (messId) => ({
        url: `${BASE_URL}/api/mess/complaints/latest/${messId}`,
        method: "GET",
      }),
      providesTags: ["FilteredComplaints"], // Tag for caching purposes
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetDashboardQuery,
  useLoginMutation,
  useLogoutMutation,
  useGetMenuItemsQuery,
  useGetFilteredComplaintsQuery,
  // useRegisterMutation,
  // useProfileMutation,
  // useGetUsersQuery,
  // useDeleteUserMutation,
  // useUpdateUserMutation,
  // useGetUserDetailsQuery,
};
