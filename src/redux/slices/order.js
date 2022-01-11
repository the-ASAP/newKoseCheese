import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import APIBitrix from 'api/APIBitrix';
import {
  cartChangeModalState,
  popUpChangeModalState,
  successPurchasePopupChangeState
} from 'redux/slices/modals';

const initialState = {
  formData: {
    data: {
      user_data: {
        phone: null,
        name: null,
        surname: null,
        email: null
      },
      payments: ['Наличный расчет']
    }
  },
  confirm: []
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getFormData(state, action) {
      state.formData = action.payload;
      //   state.totalPrice = action.payload.reduce(
      //     (acc, current) => acc + current.price * current.quantity,
      //     0
      //   );
    },
    purchaseConfirm(state, action) {
      state.confirm = action.payload;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.some
    })
  }
});

const { getFormData, purchaseConfirm } = orderSlice.actions;

export const getOrderFormData = createAsyncThunk(
  'order/form-data/',
  async (_, { dispatch, getState }) => {
    const {
      user: { id, isLogged }
    } = getState();
    await APIBitrix.post('order/form-data/', {
      fuser_id: id
      //   user_id: isLoged ? id : 0
    }).then((res) => {
      dispatch(getFormData(res));
    });
  }
);

export const setConfirmOrder = createAsyncThunk('order/confirm/', async (data, { getState }) => {
  const {
    user: { id, isLogged }
  } = getState();
  await APIBitrix.post('order/confirm/', {
    fuser_id: id,
    ...data
  }).then(({ data: res }) => {
    purchaseConfirm(res);
    // if (res.url) {
    //   window.location.replace(res.url);
    // } else {
    //   window.location.replace(`/?bxOrderId=${res.order_id}&`);
    // }
  });
});

export const orderFormDataSelector = (state) => state.order.formData;
export const orderConfirmSelector = (state) => state.order.confirm;
