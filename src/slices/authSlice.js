import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('auth')
  ? JSON.parse(localStorage.getItem('auth'))
  : null;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state = action.payload;
      localStorage.setItem('auth', JSON.stringify(action.payload));
      return state;
    },
    logout: (state) => {
      state = null;
      localStorage.removeItem('auth');
      return state;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
