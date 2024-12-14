// slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for user registration
export const registerUser  = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/accounts/register/', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:8000/api/accounts/login/', userData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


// Async thunk for OTP verification
export const verifyOtp = createAsyncThunk(
  'user/verifyOtp',
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/accounts/verify-otp/', otpData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for OTP verification
export const verifySignin = createAsyncThunk(
  'user/verifySignin',
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/accounts/verify-signin/', otpData);
      return response.data; // Assuming the response contains user data or a success message
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    userInfo: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
            state.userInfo = null;
        }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser .pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerUser .fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(registerUser .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false; // You can store any relevant data if needed
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false; // You can store user info or a success message
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifySignin.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(verifySignin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload; // You can store user info or a success message
      })
      .addCase(verifySignin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const {logout} = userSlice.actions; 
export default userSlice.reducer;