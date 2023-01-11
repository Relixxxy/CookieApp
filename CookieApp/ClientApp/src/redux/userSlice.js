import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginRequest, signUpRequest } from "services/api";

export const signUp = createAsyncThunk(
  "user/signUp",
  async (formData, { rejectWithValue }) => {
    try {
      const userData = await signUpRequest(formData);
      userData?.token && localStorage.setItem("token", userData.token);
      return userData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logIn = createAsyncThunk(
  "user/logIn",
  async (formData, { rejectWithValue }) => {
    try {
      const userData = await loginRequest(formData);
      userData?.token && localStorage.setItem("token", userData.token);
      return userData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    id: null,
    token: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //SignUp
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.login;
      state.token = payload.token;
      state.id = payload.id;
      console.log(payload);
    });
    builder.addCase(signUp.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    });
    //LogIn
    builder.addCase(logIn.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logIn.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.login;
      state.token = payload.token;
      state.id = payload.id;
      console.log(payload);
    });
    builder.addCase(logIn.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    });
  },
});

//Selectors
export const getIsLoading = (state) => state.user.isLoading;
export const getError = (state) => state.user.error;
export const getUser = (state) => state.user.user;
