import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  fuserId: null,
  id: null,
  userInfo: {},
  userPhone: '',
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserId(state, action) {
      state.id = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setUserPhone(state, action) {
      state.userPhone = action.payload;
    },
    setLogged(state, action) {
      state.isLogged = action.payload;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.some
      };
    }
  }
});

export const {
  addUserId,
  setUserInfo,
  setUserPhone,
  setLogged
} = userSlice.actions;

export const userIdSelector = (state) => state.user.id;
export const userInfoSelector = state => state.user.userInfo;
export const userPhoneSelector = state => state.user.userPhone;
export const isLoggedSelector = state => state.user.isLogged;

