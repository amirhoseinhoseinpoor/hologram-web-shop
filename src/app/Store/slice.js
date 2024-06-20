import { createSlice} from '@reduxjs/toolkit';
import {login , logout , updateBannerContent} from './thunks'

const authinitialState = {
  token: null,
  loading: false,
  error: null,
};



const authSlice = createSlice({
  name: 'auth',
  initialState : authinitialState,
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


// export default authSlice.reducer;
export const authSliceV = authSlice.reducer;
export const token = (state) => state.auth.token;
export const loading = (state) => state.auth.loading;
export const error = (state) => state.auth.error;


const AdminInitialState = {
    banner: null,
};
  

const adminSlice = createSlice({
    name: 'admin',
    initialState :AdminInitialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
       
        .addCase(updateBannerContent.fulfilled, (state, action) => {
          state.banner = action.payload; // Update banner data on success
        })
      
    },
  });
  
  export const adminsliceV = adminSlice.reducer;
  export const banner = (state) => state.admin.banner;