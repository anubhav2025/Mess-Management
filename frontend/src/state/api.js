import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { USERS_URL } from "../constants";

export const api = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	reducerPath: "adminApi",
	tagTypes: [
		"User",
		"Products",
		"Customers",
		"Transactions",
		"Geography",
		"Sales",
		"Admins",
		"Performance",
		"Dashboard",
		"MenuItems",
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
		// profile: builder.mutation({
		// 	query: (data) => ({
		// 		url: `${USERS_URL}/profile`,
		// 		method: "PUT",
		// 		body: data,
		// 	}),
		// }),
		// getUsers: builder.query({
		// 	query: () => ({
		// 		url: USERS_URL,
		// 	}),
		// 	providesTags: ["User"],
		// 	keepUnusedDataFor: 5,
		// }),
		// deleteUser: builder.mutation({
		// 	query: (userId) => ({
		// 		url: `${USERS_URL}/${userId}`,
		// 		method: "DELETE",
		// 	}),
		// }),
		// getUserDetails: builder.query({
		// 	query: (id) => ({
		// 		url: `${USERS_URL}/${id}`,
		// 	}),
		// 	keepUnusedDataFor: 5,
		// }),
		// updateUser: builder.mutation({
		// 	query: (data) => ({
		// 		url: `${USERS_URL}/${data.userId}`,
		// 		method: "PUT",
		// 		body: data,
		// 	}),
		// 	invalidatesTags: ["User"],
		// }),
		getUser: builder.query({
			query: (id) => `general/user/${id}`,
			providesTags: ["User"],
		}),
		getProducts: builder.query({
			query: () => "client/products",
			providesTags: ["Products"],
		}),
		getCustomers: builder.query({
			query: () => "client/customers",
			providesTags: ["Customers"],
		}),
		getMenuItems: builder.query({
			query: (messId) => ({
				url: `${BASE_URL}/api/mess/menu/menuItems/${messId}/array`,
				method: "GET",
			}),
			providesTags: ["MenuItems"],
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
	// useRegisterMutation,
	// useProfileMutation,
	// useGetUsersQuery,
	// useDeleteUserMutation,
	// useUpdateUserMutation,
	// useGetUserDetailsQuery,
} = api;
