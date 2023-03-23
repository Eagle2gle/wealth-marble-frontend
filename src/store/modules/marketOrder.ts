import { HYDRATE } from 'next-redux-wrapper';

import { createSlice, createAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type MarketOrderState = {
  sell: {
    price: number;
    quantity: number;
  };
  buy: {
    price: number;
    quantity: number;
  };
};

const hydrate = createAction<MarketOrderState>(HYDRATE);
const initialState: MarketOrderState = {
  sell: {
    price: 0,
    quantity: 0,
  },
  buy: {
    price: 0,
    quantity: 0,
  },
};
const marketOrderSlice = createSlice({
  name: 'marketOrder',
  initialState,
  reducers: {
    increaseSellPrice: (state) => {
      state.sell.price += 1;
    },
    decreaseSellPrice: (state) => {
      state.sell.price -= 1;
    },
    increaseBuyPrice: (state) => {
      state.buy.price += 1;
    },
    decreaseBuyPrice: (state) => {
      state.buy.price -= 1;
    },
    increaseSellQuantity: (state) => {
      state.sell.quantity += 1;
    },
    decreaseSellQuantity: (state) => {
      state.sell.quantity -= 1;
    },
    increaseBuyQuantity: (state) => {
      state.buy.quantity += 1;
    },
    decreaseBuyQuantity: (state) => {
      state.buy.quantity -= 1;
    },
    addSellPriceByNumber: (state, action: PayloadAction<number>) => {
      state.sell.price += action.payload;
    },
    addBuyPriceByNumber: (state, action: PayloadAction<number>) => {
      state.buy.price += action.payload;
    },
    setSellPriceByNumber: (state, action: PayloadAction<number>) => {
      state.sell.price = action.payload;
    },
    setBuyPriceByNumber: (state, action: PayloadAction<number>) => {
      state.buy.price = action.payload;
    },
    addSellQuantityByNumber: (state, action: PayloadAction<number>) => {
      state.sell.quantity += action.payload;
    },
    addBuyQuantityByNumber: (state, action: PayloadAction<number>) => {
      state.buy.quantity += action.payload;
    },
    setSellQuantityByNumber: (state, action: PayloadAction<number>) => {
      state.sell.quantity = action.payload;
    },
    setBuyQuantityByNumber: (state, action: PayloadAction<number>) => {
      state.buy.quantity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      console.log('HYDRATE market order', action.payload);
      if (
        !action.payload.buy.price ||
        !action.payload.buy.quantity ||
        !action.payload.sell.price ||
        !action.payload.sell.quantity
      ) {
        return state;
      }
      state.buy.price = action.payload.buy.price;
      state.buy.quantity = action.payload.buy.quantity;
      state.sell.price = action.payload.sell.price;
      state.sell.quantity = action.payload.sell.quantity;
    });
  },
});

export const {
  addSellPriceByNumber,
  decreaseSellPrice,
  increaseSellPrice,
  setSellPriceByNumber,
  addBuyPriceByNumber,
  decreaseBuyPrice,
  increaseBuyPrice,
  setBuyPriceByNumber,
  addBuyQuantityByNumber,
  addSellQuantityByNumber,
  decreaseBuyQuantity,
  decreaseSellQuantity,
  increaseBuyQuantity,
  increaseSellQuantity,
  setBuyQuantityByNumber,
  setSellQuantityByNumber,
} = marketOrderSlice.actions;

export const marketDecreaseMap = {
  sell: {
    price: decreaseSellPrice,
    quantity: decreaseSellQuantity,
  },
  buy: {
    price: decreaseBuyPrice,
    quantity: decreaseBuyQuantity,
  },
};
export const marketIncreaseMap = {
  sell: {
    price: increaseSellPrice,
    quantity: increaseSellQuantity,
  },
  buy: {
    price: increaseBuyPrice,
    quantity: increaseBuyQuantity,
  },
};
export const marketSetMap = {
  sell: {
    price: setSellPriceByNumber,
    quantity: setSellQuantityByNumber,
  },
  buy: {
    price: setBuyPriceByNumber,
    quantity: setBuyQuantityByNumber,
  },
};

export default marketOrderSlice;
