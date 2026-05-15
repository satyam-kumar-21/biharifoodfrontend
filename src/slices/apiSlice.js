import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
import { logout } from './authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Clear auth state
    api.dispatch(logout());

    // Redirect to login with session-expired flag
    // Only redirect if not already on login/register page
    const currentPath = window.location.pathname;
    if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
      const redirect = encodeURIComponent(currentPath + window.location.search);
      window.location.href = `/login?session=expired&redirect=${redirect}`;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Product', 'Order', 'User', 'Category', 'Settings'],
  endpoints: (builder) => ({}),
});
