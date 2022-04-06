import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  fuserId: null,
  phone: '',
  discount: [],
  email: null,
  name: '',
  points: [],
  username: '',
  user_id: null,
  isLogged: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action) {
      return { ...state, ...action.payload }
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.some
    })
  }
});

export const { setUserInfo } = userSlice.actions;

export const isLoggedSelector = (state) => state.user.isLogged;
export const userInfoSelector = (state) => state.user;
export const userIdSelector = (state) => state.user_id;
