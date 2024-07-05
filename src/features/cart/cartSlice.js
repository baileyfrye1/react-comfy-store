import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0.1,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || initialState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;

      const cartItem = state.cartItems.find(
        (item) => item.cartId === product.cartId,
      );

      if (cartItem) {
        cartItem.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += product.amount;

      state.cartTotal += product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.success('Item added to cart');
    },
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(initialState));
      return initialState;
    },
    removeItem: (state, action) => {
      const { cartId } = action.payload;

      const product = state.cartItems.find((item) => item.cartId === cartId);

      state.cartItems = state.cartItems.filter(
        (item) => item.cartId !== cartId,
      );

      state.numItemsInCart -= product.amount;

      state.cartTotal -= product.price * product.amount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.error('Item Removed From Cart');
    },
    editItem: (state, action) => {
      const { cartId, amount } = action.payload;

      const product = state.cartItems.find((item) => item.cartId === cartId);

      state.numItemsInCart += amount - product.amount;

      state.cartTotal += product.price * (amount - product.amount);

      product.amount = amount;

      cartSlice.caseReducers.calculateTotals(state);

      toast.success('Cart Updated');
    },
    calculateTotals: (state) => {
      state.tax = state.cartTotal * 0.1;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
