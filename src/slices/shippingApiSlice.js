import { apiSlice } from './apiSlice';

export const shippingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    calculateShipping: builder.mutation({
      query: (data) => ({
        url: '/api/shipping/calculate',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCalculateShippingMutation } = shippingApiSlice;
