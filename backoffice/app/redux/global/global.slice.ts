import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store';

interface GlobalSliceState {
  thing: boolean;
}

const initialState: GlobalSliceState = {
  thing: false,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleThing(state, action: PayloadAction<boolean>) {
      state.thing = action.payload;
    },
  },
});

export const selectGlobal = (state: RootState) => state.global;

export const { toggleThing } = globalSlice.actions;

export default globalSlice.reducer;
