import { apiSlice } from './apiSlice';

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({
        url: '/api/contacts',
      }),
      providesTags: ['Contact'],
      keepUnusedDataFor: 5,
    }),
    createContact: builder.mutation({
      query: (data) => ({
        url: '/api/contacts',
        method: 'POST',
        body: data,
      }),
    }),
    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `/api/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
    markContactAsRead: builder.mutation({
      query: (contactId) => ({
        url: `/api/contacts/${contactId}/read`,
        method: 'PUT',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useMarkContactAsReadMutation,
} = contactApiSlice;
