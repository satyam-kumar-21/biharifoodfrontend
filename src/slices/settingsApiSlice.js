import { apiSlice } from './apiSlice';

export const settingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => ({
        url: '/api/settings',
      }),
      providesTags: ['Settings'],
      keepUnusedDataFor: 5,
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: '/api/settings',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Settings'],
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApiSlice;
