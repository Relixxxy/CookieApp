import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getGameAcc, saveAccRequest } from "services/api";
// import { toast } from "react-toastify";

export const setGameAcc = createAsyncThunk(
  "user/setGameAcc",
  async (_, { rejectWithValue }) => {
    try {
      const gameAcc = await getGameAcc();
      return gameAcc;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const saveAcc = createAsyncThunk(
  "user/saveAcc",
  async (acc, { rejectWithValue }) => {
    try {
      const gameAcc = await saveAccRequest(acc);
      return gameAcc;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUsersList = createAsyncThunk(
  "user/getUsersList",
  async (_, { rejectWithValue }) => {
    try {
      const users = await getAllUsers();
      return users;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialUpgrades = [
  {
    name: "Hand Mate",
    amount: 0,
    basePrice: 15,
    baseValue: 0.1,
    gameAccountId: null,
    id: null,
    image: null,
    level: 1,
  },
];

export const gameAccSlice = createSlice({
  name: "cookie",
  initialState: {
    clickUpgrade: {
      basePrice: 100,
      baseValue: 1,
      gameAccountId: null,
      id: null,
      image: null,
      level: 1,
      name: "Click",
      upgradeInfoId: 1,
    },
    clicks: 0,
    cookies: 0,
    id: null,
    networth: 0,
    upgrades: initialUpgrades,
    usersList: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addCookie(state, { payload }) {
      state.cookies = payload + state.cookies;
      state.networth = payload + state.networth;
      state.clicks = 1 + state.clicks;
    },
    buyUpgrade(state, { payload }) {
      const el = state.upgrades.find((el) => el.id === payload.id);
      el.amount = payload.amount;
      el.price = payload.price;
      state.cookies = state.cookies - payload.prevPrice;
    },
  },
  extraReducers: (builder) => {
    //==================SetGameAcc==================
    builder.addCase(setGameAcc.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(setGameAcc.fulfilled, (state, { payload }) => {
      state.isLoading = false;

      if (!payload) return;
      // console.log(payload);

      state.clicks = payload.clicks;
      state.cookies = payload.cookies;
      state.id = payload.id;
      state.upgrades = payload.upgrades;
      state.networth = payload.networth;
      state.clickUpgrade = payload.clickUpgrade;
    });
    builder.addCase(setGameAcc.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    });
    //==================SaveGameAcc==================
    builder.addCase(saveAcc.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(saveAcc.fulfilled, (state, { payload }) => {
      state.isLoading = false;

      if (!payload) return;
    });
    builder.addCase(saveAcc.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    });
    //==================GetUsersList==================
    builder.addCase(getUsersList.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getUsersList.fulfilled, (state, { payload }) => {
      state.isLoading = false;

      if (!payload) return;

      state.usersList = payload;
      // console.log(payload);
    });
    builder.addCase(getUsersList.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    });
  },
});

export const { addCookie, addClicks, buyUpgrade } = gameAccSlice.actions;

//Selector
export const getClickPerCookie = (state) => state.gameAcc.clickUpgrade;
export const getTotalClicks = (state) => state.gameAcc.clicks;
export const getUpgrades = (state) => state.gameAcc.upgrades;
export const getCookies = (state) => state.gameAcc.cookies;
export const getAcc = (state) => state.gameAcc;
export const getUserList = (state) => state.gameAcc.usersList;
export const getNetWorth = (state) => state.gameAcc.networth;
