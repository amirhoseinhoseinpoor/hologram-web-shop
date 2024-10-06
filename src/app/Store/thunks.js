import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import axios for API calls

// start auth

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    const { username, password } = credentials;
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/auth/login`, {
        username,
        password,
      });
      const token = response.data.token;

      console.log(token);

      const response2 = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/users`,
        {username},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        
      );

      console.log(response2);

      return {
        token,
        firstName: response2.data[0].firstName,
        lastName: response2.data[0].lastName,
        phoneNumber: response2.data[0].username,
        code: response2.data[0].code,
      };
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("شماره همراه یا پسورد اشتباه است");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید"
        );
      }
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (credentials, thunkAPI) => {
    const { firstName, lastName, username, password } = credentials;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/auth/register`,
        {
          firstName,
          lastName,
          username,
          password,
          roleIds: [1],
        }
      );
      const signUpSattus = response.data.message;
      console.log(signUpSattus);
      return signUpSattus;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("شما قبلا ثبت نام کرده اید");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید"
        );
      }
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (credentials, thunkAPI) => {
    const { firstName, lastName, username, password } = credentials;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/users/{code}`,
        {
          firstName,
          lastName,
          username,
          password,
          roleIds: [1],
        }
      );
      const signUpSattus = response.data.message;
      console.log(signUpSattus);
      return signUpSattus;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("شما قبلا ثبت نام کرده اید");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید"
        );
      }
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post("/api/logout"); // Assuming logout endpoint exists
  } catch (error) {
    console.error("Logout error:", error);
  }
});

// end auth

// start send media
export const uploadFile = createAsyncThunk(
  "product/uploadFile ",
  async ({ file, tag, type, isPublic }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("files", file);
      formData.append("tag", tag);
      formData.append("type", type);
      formData.append("isPublic", isPublic);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/upload`,
        formData,
        {
          headers: {
            Authorization: token.token ? `Bearer ${token.token}` : "",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data[0].fileName) {
        alert("افزودن عکس با موفقیت انجام شد");
      }

      return response.data[0].fileName;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("خطا در افزودن media");
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید"
        );
      }
    }
  }
);

// end send media

// start Product

export const list = createAsyncThunk("product/list", async (thunkAPI) => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/product/list`);
    const data = response.data;

    return data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return thunkAPI.rejectWithValue("ارور سمت من");
    } else {
      return thunkAPI.rejectWithValue("مشکلی به وجود امده لطفا بعدا تلاش کنید");
    }
  }
});

// end product

// start order

export const getUserProduct = createAsyncThunk(
  "order/getUserProduct",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_END_SERVER}/order/findById`, {
        headers: {
          Authorization: token ? `Bearer ${token.token}` : "",
        },
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید"
        );
      }
    }
  }
);

export const sendFirstStep = createAsyncThunk(
  "order/sendFirstStep",
  async (formData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token.token;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/order/request`,
        formData,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const data = response.data;

      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید"
        );
      }
    }
  }
);

export const sendingSecondStep = createAsyncThunk(
  "order/sendingSecondStep",
  async ({code ,  sendingFinalData}, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token.token;
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/order/document/${code}`,
        {
          document : sendingFinalData,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const data = response.data;

      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید"
        );
      }
    }
  }
);

// end order

export const updateBannerContent = createAsyncThunk(
  "content/updateBannerContent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/json/ExhibitionPage.json");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateBlogcontent = createAsyncThunk(
  "content/updateBlogcontent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/json/Blog.json");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
