import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import axios for API calls

// start auth

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    const { username, password } = credentials;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/auth/login`,
        {
          username,
          password,
        }
      );
      const token = response.data.token;

      const response2 = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/users`,
        { username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        token,
        firstName: response2.data[0].firstName,
        lastName: response2.data[0].lastName,
        phoneNumber: response2.data[0].username,
        code: response2.data[0].code,
        email: response2.data[0].email,
        gender: response2.data[0].gender,
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

export const editUser = createAsyncThunk(
  "auth/editUser",
  async ({ code, firstName, lastName, gender, email, active }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token.token;

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/users/editUserSite/${code}`,
        {
          firstName,
          lastName,
          email,
          gender,
          active,
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
        return thunkAPI.rejectWithValue("error");
      } else {
        return thunkAPI.rejectWithValue(error);
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

// start header

export const headerList = createAsyncThunk(
  "header/headerList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/header/find`
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

// end header

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

export const fetchPrivateImage = createAsyncThunk(
  "image/fetchPrivateImage",
  async ({ filename }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/system/download/${filename}`,
        {}, // No body is needed for this request
        {
          headers: {
            Authorization: token.token ? `Bearer ${token.token}` : "",
          },
          responseType: "blob",
        }
      );

      const imageObjectURL = URL.createObjectURL(response.data);

      return imageObjectURL;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("Error from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Something went wrong, please try again later"
        );
      }
    }
  }
);

// end send media

// start Product

export const list = createAsyncThunk("product/list", async (thunkAPI) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/product/list`
    );
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

export const ProductGetByCode = createAsyncThunk(
  "product/ProductGetByCode",
  async (code, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/product/${code}`
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

// end product

// start HomePage Video
export const homePageVideoList = createAsyncThunk(
  "homePage/homePageVideoList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/video/list`
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

// end HomePage video

// start HomePage Honors
export const homePageHonorsList = createAsyncThunk(
  "honors/homePageHonorsList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/honors/list`
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

// end HomePage Honors

// start exhibition

export const homePageExhibitionList = createAsyncThunk(
  "exhibition/homePageExhibitionList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/exhibition/list`
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

// end exhibition

// start blog
export const homePageBlogList = createAsyncThunk(
  "blogs/homePageBlogList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/blogs/listPaginated`
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
// end blog

// start banner
export const homePageBannerList = createAsyncThunk(
  "banner/homePageBannerList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/banner/list`
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

// end banner

// start order

export const sendNewMessage = createAsyncThunk(
  "order/sendNewMessage",
  async ({ code, newMessageSend }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/order/chat/${code}`,
        {
          chat: newMessageSend,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token.token}` : "",
          },
        }
      );
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

export const chatImageSend = createAsyncThunk(
  "order/chatImageSend",
  async ({ code, chatImage }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token.token;

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/order/chatImage/${code}`,
        {
          chatImage,
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

export const getUserProduct = createAsyncThunk(
  "userOrders/getUserProduct",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/order/findById`,
        {
          headers: {
            Authorization: token ? `Bearer ${token.token}` : "",
          },
        }
      );

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
  async ({ code, sendingFinalData }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token.token;
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/order/document/${code}`,
        {
          document: sendingFinalData,
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

export const sendingAdressStep = createAsyncThunk(
  "order/sendingAdressStep",
  async ({ code, finalData }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token.token;
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/order/document/${code}`,
        {
          delivery: finalData,
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

export const increaseStep = createAsyncThunk(
  "order/increaseStep",
  async ({ code, step }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token.token;
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/order/step/${code}/${step}`,
        {},
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

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async ({ code }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token.token;
    try {
      const secondResponse = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/order/status/${code}/5`,
        {},
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/order/deleteById/${code}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const data = response.data;
      const secondDataCome = secondResponse.data;

      return {
        firstData: data,
        secondData: secondDataCome,
      };
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

// start contact
export const submitContactForm = createAsyncThunk(
  "contact/submitContactForm",
  async ({ name, phone, message }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACK_END_SERVER}/contact`,
        { name, phone, message }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue(
          error.response.data?.message ||
            "شما امروز بیش از حد مجاز پیام ارسال کرده‌اید. لطفاً فردا مجدداً تلاش کنید."
        );
      }
      return thunkAPI.rejectWithValue(
        "مشکلی پیش آمد، لطفاً دوباره تلاش کنید"
      );
    }
  }
);
// end contact
