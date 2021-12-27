import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import APIBitrix from 'api/APIBitrix';
import { popUpChangeModalState } from 'redux/slices/modals';
import { getHistory, addHistory } from 'redux/slices/history'

const initialState = {
    "date_from": "10.01.2020",
    "date_to": "10.01.2022",
    "status": "all",     // active, completed, all
    "page": 1,
    "limit": 5
};

export const historyAttrSlice = createSlice({
  name: 'historyAttr',
  initialState,
  reducers: {
    startPage(state) {
        state.page = 1 
    },
    incPage(state) {
      state.page = state.page + 1;
    },
    changeDateFrom(state, action) {
        state.date_from = action.payload
    },
    changeDateTo(state, action) {
        state.date_to = action.payload
    },
    changeDate(state, action) {
      if(action.payload.date_from) state.date_from = action.payload.date_from
      if(action.payload.date_to) state.date_to = action.payload.date_to
    },
    changeStatus(state, action) {
        state.status = action.payload
        state.page = 1
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

export const { startPage, incPage, changeDate, changeDateFrom, changeDateTo, changeStatus } = historyAttrSlice.actions;

export const historyAttrItemsSelector = (state) => state.historyAttr;

export const getNewHistory = createAsyncThunk('user/orders-history/items/', async(_, {dispatch, getState}) => {
    const { historyAttr } = getState()
    try {
        await APIBitrix.post('user/orders-history/items/', historyAttr).then((res) => {
            dispatch(getHistory(res.data))
        })
    }
    catch({message}) {
        dispatch(
            popUpChangeModalState({
              visible: true,
              text: message
            })
          );
    }
})


export const addNewHistory = createAsyncThunk('user/orders-history/items/', async(_, {dispatch, getState}) => {
    const { historyAttr } = getState()
    try {
        await APIBitrix.post('user/orders-history/items/', historyAttr).then((res) => {
            console.log(res)
            dispatch(addHistory(res.data?.orders))
        })
    }
    catch({message}) {
        dispatch(
            popUpChangeModalState({
              visible: true,
              text: message
            })
          );
    }
})