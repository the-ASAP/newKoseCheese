import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { modalsSlice } from "redux/slices/modals";
import { cartSlice } from "redux/slices/cart";
import { favoriteSlice } from "redux/slices/favorite";
import { returnOrderSlice } from "redux/slices/returnOrder";
import { userSlice } from "./slices/user";

const makeStore = () =>
  configureStore({
    reducer: {
      [modalsSlice.name]: modalsSlice.reducer,
      [cartSlice.name]: cartSlice.reducer,
      [favoriteSlice.name]: favoriteSlice.reducer,
      [returnOrderSlice.name]: returnOrderSlice.reducer,
      [userSlice.name]: userSlice.reducer
    }
  });

export const wrapper = createWrapper(makeStore);