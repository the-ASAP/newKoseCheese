import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import APIBitrix from "api/APIBitrix";
import { cartChangeModalState, popUpChangeModalState, successPurchasePopupChangeState } from "redux/slices/modals";


const initialState = {
  items: [],
  totalPrice: 0
};


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      state.items.push(action.payload);
      state.totalPrice += parseInt(action.payload.price, 10) * action.payload.quantity;
    },
    removeProduct(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      state.totalPrice -= action.payload.price * action.payload.quantity;
    },
    incProductCount(state, action) {
      const product = state.items.find(item => item.id === action.payload.id);
      product.quantity += 1;
      state.totalPrice += parseInt(product.price, 10);
    },
    decProductCount(state, action) {
      const product = state.items.find(item => item.id === action.payload.id);
      product.quantity -= 1;
      state.totalPrice -= parseInt(product.price, 10);
    },
    putProducts(state, action) {
      state.items = action.payload;
      state.totalPrice = action.payload.reduce((acc, current) => acc + current.price * current.quantity, 0);
    },
    purchaseOrder(state) {
      state.items = [];
      state.totalPrice = 0;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.some
    })
  }
});


const {
  addProduct,
  removeProduct,
  incProductCount,
  decProductCount,
  purchaseOrder,
  putProducts
} = cartSlice.actions;

export const cartItemsSelector = (state) => state.cart.items;
export const totalPriceSelector = (state) => state.cart.totalPrice;


export const reqAddToCart = createAsyncThunk(
  "cart/reqAddToCart",
  async (productData, { dispatch, getState }) => {
    const { user } = getState();
    try {
      await APIBitrix.post("basket/add/", {
        fuser_id: user.id,
        product_id: productData.id,
        quantity: productData.quantity
      }).then(res => {
        if (res.code === 200) {
          dispatch(putProducts(res.data));
          dispatch(cartChangeModalState(true));
        } else {
          throw new Error("Ошибка при добавлении товара. Попробуйте обновить страницу и добавить товар еще раз");
        }
      });
    } catch ({ message }) {
      dispatch(popUpChangeModalState({
        visible: true,
        text: message
      }));
    }
  }
);

export const reqIncProductCount = createAsyncThunk(
  "cart/reqIncProductCount",
  async (productData, { dispatch, getState }) => {
    const { user } = getState();
    try {
      await APIBitrix.post("basket/increment/", {
        fuser_id: user.id,
        product_id: productData.id,
        quantity: 1
      })
        .then(res => {
          if (res.code === 200) {
            dispatch(putProducts(res.data));
          } else {
            throw new Error("Ошибка при изменении количества. Попробуйте обновить страницу и изменить еще раз");
          }
        });
    } catch ({ message }) {
      dispatch(popUpChangeModalState({
        visible: true,
        text: message
      }));
    }
  }
);


export const reqDecProductCount = createAsyncThunk(
  "cart/reqDecProductCount",
  async (productData, { dispatch, getState }) => {
    const { user } = getState();
    try {
      await APIBitrix.post("basket/decrement/", {
        fuser_id: user.id,
        product_id: productData.id,
        quantity: -1
      })
        .then(res => {
          if (res.code === 200) {
            dispatch(putProducts(res.data));
          } else {
            throw new Error("Ошибка при изменении количества. Попробуйте обновить страницу и изменить еще раз");
          }
        });
    } catch ({ message }) {
      dispatch(popUpChangeModalState({
        visible: true,
        text: message
      }));
    }
  }
);


export const reqRemoveFromCart = createAsyncThunk(
  "cart/reqRemoveFromCart",
  async (productData, { getState, dispatch }) => {
    const { user } = getState();
    try {
      await APIBitrix.post("basket/remove/", {
        fuser_id: user.id,
        item_id: productData.item_id
      }).then(res => {
        if (res.code === 200) {
          dispatch(putProducts(res.data));
        } else {
          throw new Error("Произошла ошибка при удалении товара. Попробуйте обновить страницу и удалить товар еще раз");
        }
      });
    } catch ({ message }) {
      dispatch(popUpChangeModalState({
        visible: true,
        text: message
      }));
    }
  }
);


export const reqGetProducts = createAsyncThunk(
  "cart/reqGetProducts",
  async (_, { dispatch, getState }) => {
    const { user } = getState();
    try {
      await APIBitrix.post("basket/items/", {
        fuser_id: user.id
      }).then(res => {
        if (res.code === 200) {
          dispatch(putProducts(res.data || []));
        } else {
          throw new Error("Произошла ошибка при загрузке товаров. Попробуйте обновить страницу");
        }
      });
    } catch ({ message }) {
      dispatch(popUpChangeModalState({
        visible: true,
        text: message
      }));
    }
  }
);


export const reqPurchaseOrder = createAsyncThunk(
  "cart/reqAddToCart",
  async (productData, { dispatch, getState }) => {
    const { user: { id, isLogged } } = getState();
    await APIBitrix.post("basket/order/", {
      fuser_id: id,
      user_id: isLogged ? id : 0
    }).then(res => {
      console.log(res);
      dispatch(purchaseOrder());
      dispatch(successPurchasePopupChangeState({
        visible: true,
        order: 123,
        mail: "kamaPulya@mail.ru"
      }))
    });
  }
);


