import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../status";
import Cookies from 'js-cookie';



export const fetchUserlLogin = createAsyncThunk('users/login',
  async ({mail, pass, expiresInMins, expiresInDays},{rejectWithValue}) => {
    try {
      const response = await fetch('https://dummyjson.com/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: mail,
          password: pass,
          expiresInMins: expiresInMins, // optional, defaults to 60
        })
      });//end fetch
      const data = await response.json();
      // console.log(`response is `,response);
      // console.log(`data is` ,data);
      // return data
      
      if (response.ok) {
        // localStorage.setItem('token', data.token)
        // navigate("/profile");
        Cookies.set('token', data.token, { expires: expiresInDays })
        return data
      }
      else {
        throw new Error(data.message || 'Login failed');
      }
    }
    catch (error) {
      return rejectWithValue(error.message); // يتم إرجاع رسالة الخطأ عند الفشل
    }
  })

const initialState = {
  userData: null,
  isUserLogin: false,
  status: STATUS.IDLE,
  error: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut(state) {
      state.user = null
      state.status = STATUS.IDLE
      Cookies.remove('token')
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserlLogin.fulfilled, (state, action) => {
      console.log(`login succc is `,action.payload);
      state.status = STATUS.SUCCEEDED
      state.userData = action.payload
      state.isUserLogin = true
      state.error=null
    })
    builder.addCase(fetchUserlLogin.pending, (state, action) => {
      state.status = STATUS.LOADING
    })
    builder.addCase(fetchUserlLogin.rejected, (state, action) => {
      state.status = STATUS.FAILD
      state.error = action.payload
      console.log(`action payload is ${action.payload}`);
    })
  }
})
export const { logOut } = userSlice.actions;
export const getStatus = (state) => state.user.status 
export const getIsUserLogin = (state) => state.user.isUserLogin 
export const getError = (state) => state.user.error
export default userSlice.reducer

// export const getAllProducts = (state) => state.product.products;