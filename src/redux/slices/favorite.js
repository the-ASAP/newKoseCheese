import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  items: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite(state, action) {
      if (!state.items.some(product => product.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromFavorite(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    getFavorite(state, action) {
      state.items = action.payload
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
  addToFavorite,
  removeFromFavorite,
  getFavorite
} = favoriteSlice.actions;

export const favoriteItemsSelector = (state) => state.favorite.items;

