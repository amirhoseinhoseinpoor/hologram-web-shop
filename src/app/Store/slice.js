import { createSlice} from '@reduxjs/toolkit';
import {login ,logout} from './thunks'

const initialState = {
  token: null,
  loading: false,
  error: null,
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(login.pending, (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase(login.fulfilled, (state, action) => {
              state.loading = false;
              state.token = action.payload;
          })
          .addCase(login.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message;
          })
          .addCase(logout.pending, (state) => {
              state.loading = true;
              state.error = null;
          })
          .addCase(logout.fulfilled, (state) => {
              state.loading = false;
              state.token = null;
          })
          .addCase(logout.rejected, (state) => {
              state.loading = false;
              state.error = action.payload || 'Login failed';
          });
  },
});


export default authSlice.reducer;