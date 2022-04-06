import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  headerMessage: string;
  comparisons: number;
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: { headerMessage: '*Waiting*', comparisons: 0 } as UIState,
  reducers: {
    setHeader: (state, action: PayloadAction<string>) => {
      state.headerMessage = action.payload;
    }
  }
});

export const { setHeader } = uiSlice.actions;

export default uiSlice.reducer;