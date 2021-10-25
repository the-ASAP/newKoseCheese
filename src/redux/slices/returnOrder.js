import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  order: {}
};

export const returnOrderSlice = createSlice({
  name: "returnOrder",
  initialState,
  reducers: {
    addOrderToReturn(state, action) {
      state.order = {
        ...action.payload
      };
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

export const { addOrderToReturn } = returnOrderSlice.actions;

export const returnOrderSelector = (state) => state.order;

