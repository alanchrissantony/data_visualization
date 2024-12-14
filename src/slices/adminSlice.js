import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for sending OTP for admin login
export const sendAdminOtp = createAsyncThunk(
  'user/sendAdminOtp',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/accounts/admin/send-otp/', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for verifying OTP for admin login
export const verifyAdminOtp = createAsyncThunk(
  'user/verifyAdminOtp',
  async (otpData, { rejectWithValue, getState }) => {
    try {
      // Get the stored access token from the state
      const { adminInfo } = getState().user;  // assuming the adminInfo contains token after successful login

      const response = await axios.post('http://localhost:8000/api/accounts/admin/verify-otp/',otpData,
      );

      // Return the admin data (or token, depending on the response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    adminInfo: null,  // Store admin data and token here
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.adminInfo = null;  // Clear admin data and token
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendAdminOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendAdminOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendAdminOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyAdminOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAdminOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.adminInfo = action.payload; // Store admin data and token after successful login
        state.error = null;
      })
      .addCase(verifyAdminOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;
