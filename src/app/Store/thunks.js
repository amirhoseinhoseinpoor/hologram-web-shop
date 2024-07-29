import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios for API calls



export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    const { username, password } = credentials;
      try {
          const response = await axios.post('http://217.60.251.31:7000/auth/login', {
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



export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
  try {
      await axios.post('/api/logout'); // Assuming logout endpoint exists
  } catch (error) {
      console.error('Logout error:', error);
  }
});



export const updateBannerContent = createAsyncThunk(
  'content/updateBannerContent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/json/ExhibitionPage.json');

      return response.data;
    } catch (error) {
      return  rejectWithValue(error.response.data);
    }
  }
);


export const updateBlogcontent = createAsyncThunk(
  'content/updateBlogcontent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/json/Blog.json');

      return response.data;
    } catch (error) {
      return  rejectWithValue(error.response.data);
    }
  }
);