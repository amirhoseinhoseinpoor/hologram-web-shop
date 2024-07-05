import { createSlice} from '@reduxjs/toolkit';
import {login , logout , updateBannerContent ,updateBlogcontent} from './thunks'

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


const contentInitialState = {
  loading: false,
   data: [],
   error: '',
};
  

const contentSlice = createSlice({
    name: 'content',
    initialState :contentInitialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(updateBannerContent.pending, (state) => {
        state.loading = true;
        state.error = null; // Update banner data on success
      })
       
        .addCase(updateBannerContent.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload; // Update banner data on success
        })
        .addCase(updateBannerContent.rejected, (state , action) => {
          state.loading = false;
          state.error = action.payload || 'Something went wrong';
        })
        .addCase(updateBlogcontent.pending, (state, action) => {
          state.loading = true;
          state.error = null; // Update banner data on success
        })
        .addCase(updateBlogcontent.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload; // Update banner data on success
        })
        .addCase(updateBlogcontent.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Something went wrong';
        })
      
    },
  });
  export const contentSliceV = contentSlice.reducer;
  export const UrlsContent = (state) => state.content.data;
  export const loadingContent = (state) => state.content.loading;

  export const errorcontent = (state) => state.content.error;