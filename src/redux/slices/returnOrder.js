// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
  order: []
};

export const returnOrderSlice = createSlice({
  name: 'returnOrder',
  initialState,
  reducers: {
    addProduct(state, action) {
      state.order = state.order.push(action.payload)
    },
    removeProduct(state, action) {
      return state.order?.filter(item => item.id !== action.payload.id)
    },
    updateProduct(state, action) {
      return state.order.map(item => {
        item.quantity = action.payload.quantity
        return item
      })
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

export const { addProduct, removeProduct, updateProduct } = returnOrderSlice.actions;

export const returnOrderSelector = (state) => state.order;
