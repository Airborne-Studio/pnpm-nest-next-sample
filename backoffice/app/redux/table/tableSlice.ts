import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

interface UserData {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  address?: string;
  phoneNumber?: string;
  age?: number;
  description?: string;
}

interface TableState {
  data: UserData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TableState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchUserData = createAsyncThunk(
  'table/fetchUserData',
  async () => {
    const response = await axios.get<UserData[]>(`${BASE_URL}/users`);
    return response.data;
  }
);

export const addUserData = createAsyncThunk(
  'table/addUserData',
  async (userData: UserData) => {
    if (userData.age !== undefined) {
      userData.age = parseInt(userData.age.toString(), 10);
    }

    const response = await axios.post<UserData>(`${BASE_URL}/users`, userData);
    return response.data;
  }
);

export const editUserData = createAsyncThunk(
  'table/editUserData',
  async (userData: UserData) => {
    if (userData.age !== undefined) {
      userData.age = parseInt(userData.age.toString(), 10);
    }
    const response = await axios.post<UserData>(
      `${BASE_URL}/users/${userData.id}/update`,
      userData
    );
    return response.data;
  }
);

export const deleteUserData = createAsyncThunk(
  'table/deleteUserData',
  async (userId: string) => {
    const response = await axios.delete<string>(`${BASE_URL}/users/${userId}`);
    return response.data;
  }
);

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user data';
      })
      .addCase(addUserData.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(editUserData.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteUserData.fulfilled, (state, action) => {
        state.data = state.data.filter((user) => user.id !== action.payload);
      });
  },
});

export default tableSlice.reducer;
