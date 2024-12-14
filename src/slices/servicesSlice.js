import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api';

// Async actions
export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
    // Get the access token from localStorage (or sessionStorage)
    const token = localStorage.getItem('access_token');

    const response = await axios.get('/api/services/', {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        }
    });
    return response.data;
});

export const addService = createAsyncThunk('services/addService', async (newService) => {
    // Get the access token from localStorage (or sessionStorage)
    const token = localStorage.getItem('access_token');

    const response = await axios.post('/api/services/', newService, {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        }
    });
    return response.data;
});

// Redux slice
const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        services: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addService.fulfilled, (state, action) => {
                state.services.push(action.payload);
            });
    },
});

export default servicesSlice.reducer;
