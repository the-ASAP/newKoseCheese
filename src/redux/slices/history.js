import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  count: 0,
  orders: []
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    getHistory(state, action) {
      state.count = action.payload.count;
      state.orders = action.payload.orders
    },
    addHistory(state, action) {
      state.orders.push(...action.payload)
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

export const { getHistory, addHistory } = historySlice.actions;

export const historyItemsSelector = (state) => state.history;
