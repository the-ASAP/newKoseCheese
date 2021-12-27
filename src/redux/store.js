import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { modalsSlice } from 'redux/slices/modals';
import { cartSlice } from 'redux/slices/cart';
import { orderSlice } from 'redux/slices/order';
import { favoriteSlice } from 'redux/slices/favorite';
import { returnOrderSlice } from 'redux/slices/returnOrder';
import { userSlice } from './slices/user';
import { historySlice } from 'redux/slices/history'
import { historyAttrSlice } from 'redux/slices/historyAttr'

const makeStore = () =>
  configureStore({
    reducer: {
      [modalsSlice.name]: modalsSlice.reducer,
      [cartSlice.name]: cartSlice.reducer,
      [orderSlice.name]: orderSlice.reducer,
      [favoriteSlice.name]: favoriteSlice.reducer,
      [returnOrderSlice.name]: returnOrderSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [historySlice.name]: historySlice.reducer,
      [historyAttrSlice.name]: historyAttrSlice.reducer
    }
  });

export const wrapper = createWrapper(makeStore);
