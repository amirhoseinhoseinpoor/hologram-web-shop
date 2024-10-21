import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  signUp,
  forgetPassword,
  logout,
  // updateBannerContent,
  // updateBlogcontent,
  list,
  homePageHonorsList,
  homePageExhibitionList,
  headerList,
} from "./thunks";

const authinitialState = {
  token: null,
  firstName: null,
  lastName: null,
  phoneNumber : null,
  code : null,
  signUpSattus : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authinitialState,
  reducers: {
    resetToken: (state) => {
      state.token = null;
    },
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.phoneNumber = action.payload.phoneNumber;
        state.code = action.payload.code;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.signUpSattus = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.signUpSattus = action.payload;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
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
        state.error = action.payload || "Login failed";
      });
  },
});

// export default authSlice.reducer;
export const authSliceV = authSlice.reducer;
export const token = (state) => state.auth.token;
export const firstName = (state) => state.auth.firstName;
export const lastName = (state) => state.auth.lastName;
export const phoneNumber = (state) => state.auth.phoneNumber;
export const code = (state) => state.auth.code;
export const { resetToken } = authSlice.actions;
export const signUpSattus = (state) => state.auth.signUpSattus;
export const loading = (state) => state.auth.loading;
export const error = (state) => state.auth.error;


// start product slice

const peoductinitialState = {
  productListData: null,
  // uploadedFiles: {},
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState: peoductinitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(list.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(list.fulfilled, (state, action) => {
        state.loading = false;
        state.productListData = action.payload;
      })
      .addCase(list.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const productSliceV = productSlice.reducer;
export const productListData = (state) => state.product.productListData;

// end product slice


// start Honors Slice

const honorsinitialState = {
  honorsListData: null,
  loading: false,
  error: null,
};

const honorsSlice = createSlice({
  name: "honors",
  initialState: honorsinitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(homePageHonorsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(homePageHonorsList.fulfilled, (state, action) => {
        state.loading = false;
        state.honorsListData = action.payload;
      })
      .addCase(homePageHonorsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const honorsSliceV = honorsSlice.reducer;
export const honorsListData = (state) => state.honors.honorsListData;


// end Honors Slice

// start Exhibition slice 
const exhibitioninitialState = {
  exhibitionListData: null,
  loading: false,
  error: null,
};

const exhibitionSlice = createSlice({
  name: "exhibition",
  initialState: exhibitioninitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(homePageExhibitionList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(homePageExhibitionList.fulfilled, (state, action) => {
        state.loading = false;
        state.exhibitionListData = action.payload;
      })
      .addCase(homePageExhibitionList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const exhibitionSliceV = exhibitionSlice.reducer;
export const exhibitionListData = (state) => state.exhibition.exhibitionListData;

// end exhibition slice 

// start header slice 
const headerinitialState = {
  headerListData: null,
  loading: false,
  error: null,
};

const headerSlice = createSlice({
  name: "header",
  initialState: headerinitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(headerList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(headerList.fulfilled, (state, action) => {
        state.loading = false;
        state.headerListData = action.payload;
      })
      .addCase(headerList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const headerSliceV = headerSlice.reducer;
export const headerListData = (state) => state.header.headerListData;


// end header slice 







const makeOrderinitialState = {
  childValue: null,
};

export const makeOrderSlice = createSlice({
  name: "makeOrder",
  initialState: makeOrderinitialState,
  reducers: {
    setChildValue: (state, action) => {
      state.childValue = action.payload;
    },
  },
});

export const { setChildValue } = makeOrderSlice.actions;
export const makeOrderSliceV = makeOrderSlice.reducer;
export const childValue = (state) => state.makeOrder.childValue;
