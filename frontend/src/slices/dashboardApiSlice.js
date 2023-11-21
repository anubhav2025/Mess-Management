import { apiSlice } from "./apiSlice";

export const dashboardApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getDashboard: builder.query({
         query: () => "api/dashboard/student",
         providesTags: ["Dashboard"],
      }),
   }),
});

export const {
   useGetDashboardQuery,
} = dashboardApiSlice;
