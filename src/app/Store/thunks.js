import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import axios for API calls

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    const { username, password } = credentials;
    try {
      const response = await axios.post(
        "http://176.120.16.221:7000/auth/login",
        {
          headers: {
            'mode': 'no-cors',
          },
          username,
          password,
        }
      );
      const token = response.data.token;
      const response2 = await axios.get(
        `http://176.120.16.221:7000/users/info/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'mode': 'no-cors',
            
          },
        }
      );
      console.log(response2.data.firstName);
      console.log(response2.data);

      
      return {
        token,
        firstName: response2.data.firstName, 
        lastName: response2.data.lastName,
        phoneNumber : response2.data.username,
        code : response2.data.code,
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
        "http://176.120.16.221:7000/auth/register",
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
        "http://176.120.16.221:7000/users/{code}",
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
