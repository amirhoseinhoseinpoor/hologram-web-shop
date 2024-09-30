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
        "http://localhost:7000/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,            
          },
          data : {
            username : username,
          },
          
        }
      );
      
      console.log(response2.data);
      
      return {
        token,
        firstName: response2.data[0].firstName, 
        lastName: response2.data[0].lastName,
        phoneNumber : response2.data[0].username,
        code : response2.data[0].code,
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
        "http://localhost:7000/system/upload",
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
    const response = await axios.get("http://localhost:7000/product/list");
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
