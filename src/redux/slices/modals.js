import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  cart: false,
  favorite: false,
  subscribe: false,
  letter: false,
  menu: false,
  privacy: false,
  newPhonePopup: false,
  popup: {
    visible: false,
    text: ""
  },
  successPurchase: {
    visible: false,
    order: "",
    mail: ""
  }
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    cartChangeModalState(state, action) {
      state.cart = action.payload;
    },
    favoriteChangeModalState(state, action) {
      state.favorite = action.payload;
    },
    subscribeChangeModalState(state, action) {
      state.subscribe = action.payload;
    },
    letterChangeModalState(state, action) {
      state.letter = action.payload;
    },
    menuChangeModalState(state, action) {
      state.menu = action.payload;
    },
    privacyChangeModalState(state, action) {
      state.privacy = action.payload;
    },
    popUpChangeModalState(state, action) {
      state.popup = action.payload;
    },
    newPhonePopupChangeState(state,action) {
      state.newPhonePopup = action.payload;
    },
    successPurchasePopupChangeState(state,action) {
      state.successPurchase = action.payload;
    },
    closeAllModals() {
      return {...initialState}
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
  cartChangeModalState,
  favoriteChangeModalState,
  letterChangeModalState,
  subscribeChangeModalState,
  menuChangeModalState,
  privacyChangeModalState,
  popUpChangeModalState,
  closeAllModals,
  newPhonePopupChangeState,
  successPurchasePopupChangeState
} = modalsSlice.actions;

export const cartModalSelector = (state) => state.modals.cart;
export const favoriteModalSelector = (state) => state.modals.favorite;
export const subscribeModalSelector = (state) => state.modals.subscribe;
export const letterModalSelector = (state) => state.modals.letter;
export const menuModalSelector = (state) => state.modals.menu;
export const privacyModalSelector = (state) => state.modals.privacy;
export const popUpModalSelector = (state) => state.modals.popup;
export const newPhonePopUpSelector = (state) => state.modals.newPhonePopup;
export const successPurchaseSelector = (state) => state.modals.successPurchase;

