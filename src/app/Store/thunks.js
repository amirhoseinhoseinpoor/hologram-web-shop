import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Import axios for API calls

const API_URL = process.env.NEXT_PUBLIC_BACK_END_SERVER;

const authHeader = (token) => ({
  Authorization: token ? `Bearer ${token}` : "",
});

// start auth

const OTP_ERROR_MESSAGES = {
  "Please wait before requesting another OTP.":
    "لطفا یک دقیقه صبر کنید و دوباره تلاش کنید",
  "Failed to send OTP.": "ارسال پیامک کد تایید ناموفق بود",
  "Invalid CAPTCHA": "لطفا ربات نیستید را تایید کنید.",
};

const SERVER_ERROR_MESSAGE = "مشکلی به وجود امده لطفا بعدا تلاش کنید";

const otpErrorMessage = (error, fallback) => {
  if (error.response?.status !== 400) return SERVER_ERROR_MESSAGE;
  const message = error.response.data?.message;
  return OTP_ERROR_MESSAGES[message] || fallback || message;
};

const fetchUserInfo = async (token, username) => {
  const response = await axios.post(
    `${API_URL}/users`,
    { username },
    { headers: authHeader(token) },
  );
  const user = response.data[0];

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.username,
    code: user.code,
    email: user.email,
    gender: user.gender,
  };
};

// Step 1 of login: the backend checks the password and sends the OTP.
export const sendLoginOtp = createAsyncThunk(
  "auth/sendLoginOtp",
  async ({ username, password, captchaResponse }, thunkAPI) => {
    try {
      await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
        captchaResponse,
      });
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        otpErrorMessage(error, "شماره همراه یا رمز عبور اشتباه است"),
      );
    }
  },
);

// Step 2 of login: the OTP is exchanged for the session token.
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, otp }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login-otp`, {
        username,
        otp,
      });
      const token = response.data.token;

      return { token, ...(await fetchUserInfo(token, username)) };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        otpErrorMessage(error, "کد تایید اشتباه یا منقضی شده است"),
      );
    }
  },
);

export const registerWithOtp = createAsyncThunk(
  "auth/registerWithOtp",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        credentials,
      );
      const token = response.data.token;

      return { token, ...(await fetchUserInfo(token, credentials.username)) };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "ثبت نام انجام نشد",
      );
    }
  },
);

// OTP for registration only; login OTPs are sent by sendLoginOtp.
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async ({ username, type }, thunkAPI) => {
    try {
      await axios.post(`${API_URL}/auth/send-otp`, { username, type });
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        otpErrorMessage(error, error.response?.data?.message),
      );
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async ({ username }, thunkAPI) => {
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { username });
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        otpErrorMessage(error, "ارسال کد تایید ناموفق بود"),
      );
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ username, otp, password }, thunkAPI) => {
    try {
      await axios.post(`${API_URL}/auth/reset-password`, {
        username,
        otp,
        password,
      });
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        otpErrorMessage(error, "کد تایید اشتباه یا منقضی شده است"),
      );
    }
  },
);

// Validates a restored session against the backend and refreshes the profile.
export const refreshSession = createAsyncThunk(
  "auth/refreshSession",
  async (_, thunkAPI) => {
    const { token, phoneNumber } = thunkAPI.getState().auth;
    if (!token || !phoneNumber) return thunkAPI.rejectWithValue("no session");

    try {
      return await fetchUserInfo(token, phoneNumber);
    } catch {
      return thunkAPI.rejectWithValue("session refresh failed");
    }
  },
);

export const editUser = createAsyncThunk(
  "auth/editUser",
  async ({ code, firstName, lastName, gender, email, active }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      const response = await axios.patch(
        `${API_URL}/users/editUserSite/${code}`,
        {
          firstName,
          lastName,
          email,
          gender,
          active,
        },
        {
          headers: authHeader(token),
        },
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
  },
);

// end auth

// start header

export const headerList = createAsyncThunk(
  "header/headerList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/header/find`,
      );
      const data = response.data;

      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);

// end header

// start send media
export const uploadFile = createAsyncThunk(
  "product/uploadFile ",
  async ({ file, tag, type, isPublic }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append("tag", tag);
      formData.append("type", type);
      formData.append("isPublic", isPublic);
      formData.append("files", file);

      const response = await axios.post(
        `${API_URL}/system/upload`,
        formData,
        {
          headers: authHeader(token),
        },
      );

      return response.data[0].fileName;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("خطا در افزودن media");
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);

export const fetchPrivateImage = createAsyncThunk(
  "image/fetchPrivateImage",
  async ({ filename }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      const response = await axios.post(
        `${API_URL}/system/download/${filename}`,
        {}, // No body is needed for this request
        {
          headers: authHeader(token),
          responseType: "blob",
        },
      );

      const imageObjectURL = URL.createObjectURL(response.data);

      return imageObjectURL;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("Error from server");
      } else {
        return thunkAPI.rejectWithValue(
          "Something went wrong, please try again later",
        );
      }
    }
  },
);

// end send media

// start Product

export const list = createAsyncThunk("product/list", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      `${API_URL}/product/list`,
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
        `${API_URL}/product/${code}`,
      );
      const data = response.data;

      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);

// end product

// start HomePage Video
export const homePageVideoList = createAsyncThunk(
  "homePage/homePageVideoList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/video/list`,
      );
      const data = response.data;
      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);

// end HomePage video

// start HomePage Honors
export const homePageHonorsList = createAsyncThunk(
  "honors/homePageHonorsList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/honors/list`,
      );
      const data = response.data;
      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);

// end HomePage Honors

// start exhibition

export const homePageExhibitionList = createAsyncThunk(
  "exhibition/homePageExhibitionList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/exhibition/list`,
      );
      const data = response.data;
      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);

// end exhibition

// start blog
export const homePageBlogList = createAsyncThunk(
  "blogs/homePageBlogList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/blogs/listPaginated`,
      );
      const data = response.data;

      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);
// end blog

// start banner
export const homePageBannerList = createAsyncThunk(
  "banner/homePageBannerList",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_URL}/banner/list`,
      );
      const data = response.data;

      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);

// end banner

// start order

export const sendNewMessage = createAsyncThunk(
  "order/sendNewMessage",
  async ({ code, newMessageSend }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      const response = await axios.patch(
        `${API_URL}/order/chat/${code}`,
        {
          chat: newMessageSend,
        },
        {
          headers: authHeader(token),
        },
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);

export const chatImageSend = createAsyncThunk(
  "order/chatImageSend",
  async ({ code, chatImage }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      const response = await axios.patch(
        `${API_URL}/order/chatImage/${code}`,
        {
          chatImage,
        },
        {
          headers: authHeader(token),
        },
      );
      const data = response.data;
      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);

export const getUserProduct = createAsyncThunk(
  "userOrders/getUserProduct",
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;

    try {
      const response = await axios.get(
        `${API_URL}/order/findById`,
        {
          headers: authHeader(token),
        },
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);

export const sendFirstStep = createAsyncThunk(
  "order/sendFirstStep",
  async (formData, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    try {
      const response = await axios.post(
        `${API_URL}/order/request`,
        formData,
        {
          headers: authHeader(token),
        },
      );

      const data = response.data;

      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);

export const sendingSecondStep = createAsyncThunk(
  "order/sendingSecondStep",
  async ({ code, sendingFinalData }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    try {
      const response = await axios.patch(
        `${API_URL}/order/document/${code}`,
        {
          document: sendingFinalData,
        },
        {
          headers: authHeader(token),
        },
      );

      const data = response.data;

      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);

export const sendingAdressStep = createAsyncThunk(
  "order/sendingAdressStep",
  async ({ code, finalData }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    try {
      const response = await axios.patch(
        `${API_URL}/order/document/${code}`,
        {
          delivery: finalData,
        },
        {
          headers: authHeader(token),
        },
      );

      const data = response.data;

      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);

export const increaseStep = createAsyncThunk(
  "order/increaseStep",
  async ({ code, step }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    try {
      const response = await axios.patch(
        `${API_URL}/order/step/${code}/${step}`,
        {},
        {
          headers: authHeader(token),
        },
      );
      const data = response.data;
      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue("ارور سمت من");
      } else {
        return thunkAPI.rejectWithValue(
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async ({ code }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    try {
      const secondResponse = await axios.patch(
        `${API_URL}/order/status/${code}/5`,
        {},
        {
          headers: authHeader(token),
        },
      );

      const response = await axios.delete(
        `${API_URL}/order/deleteById/${code}`,
        {
          headers: authHeader(token),
        },
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
          "مشکلی به وجود امده لطفا بعدا تلاش کنید",
        );
      }
    }
  },
);

// end order

// start contact
export const submitContactForm = createAsyncThunk(
  "contact/submitContactForm",
  async ({ name, phone, message }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/contact`,
        { name, phone, message },
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return thunkAPI.rejectWithValue(
          error.response.data?.message ||
            "شما امروز بیش از حد مجاز پیام ارسال کرده‌اید. لطفاً فردا مجدداً تلاش کنید.",
        );
      }
      return thunkAPI.rejectWithValue("مشکلی پیش آمد، لطفاً دوباره تلاش کنید");
    }
  },
);
// end contact
