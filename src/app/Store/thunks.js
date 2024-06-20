import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios for API calls


export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    const { username, password } = credentials;
      try {
          const response = await axios.post('https://reqres.in/api/login', {
            // mode: 'no-cors',
            username,
            password,
          });
          const token = response.data.token; // Assuming successful login returns a token
          console.log(token);
          return token;
      } catch (error) {
          return thunkAPI.rejectWithValue( error.message);
      }
  }
);

export const updateBannerContent = createAsyncThunk(
  'admin/updateBanner',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('/api/admin/banner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Assuming successful update returns updated banner data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
  try {
      await axios.post('/api/logout'); // Assuming logout endpoint exists
  } catch (error) {
      console.error('Logout error:', error);
  }
});
