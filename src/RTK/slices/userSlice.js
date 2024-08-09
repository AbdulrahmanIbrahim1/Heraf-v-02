import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../status";
import Cookies from 'js-cookie';

export const fetchUserLogin = createAsyncThunk('users/login',
  async ({ mail, pass, expiresInMins, expiresInDays }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: mail,
          password: pass,
          expiresInMins: expiresInMins, // optional, defaults to 60
        })
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set('token', data.token, { expires: expiresInDays });
        return data;
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshToken = createAsyncThunk('user/refresh', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://dummyjson.com/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: `${Cookies.get('token')}`,
        expiresInMins: 30, // optional, defaults to 60
      })
    });

    const data = await response.json();
    if (response.ok) {
      Cookies.set('token', data.token, { expires: 30 / (60 * 24) }); // example to set 30 mins
      return data;
    } else {
      throw new Error(data.message || 'Refresh failed');
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  userData: null,
  isUserLogin: false,
  status: STATUS.IDLE,
  error: null,
  refreshStatus: STATUS.IDLE,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state) {
      state.userData = null;
      state.isUserLogin = false;
      state.status = STATUS.IDLE;
      Cookies.remove('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.userData = action.payload;
        state.isUserLogin = true;
        state.error = null;
      })
      .addCase(fetchUserLogin.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.refreshStatus = STATUS.SUCCEEDED;
        state.userData = { ...state.userData, token: action.payload.token };
      })
      .addCase(refreshToken.pending, (state) => {
        state.refreshStatus = STATUS.LOADING;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.refreshStatus = STATUS.FAILED;
        state.error = action.payload;
      });
  }
});

export const { logOut } = userSlice.actions;
export const getStatus = (state) => state.user.status;
export const getIsUserLogin = (state) => state.user.isUserLogin;
export const getError = (state) => state.user.error;
export const getRefreshStatus = (state) => state.user.refreshStatus;
export default userSlice.reducer;
