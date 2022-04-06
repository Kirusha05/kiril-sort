import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mainTheme } from "../theme";

export type ObjectArray = { value: number; color: string }[];

interface ArrayState {
  array: ObjectArray;
  swaps: number;
  comparisons: number;
}

const arraySlice = createSlice({
  name: "array",
  initialState: { array: [], swaps: 0, comparisons: 0 } as ArrayState,
  reducers: {
    setArray: (state, action: PayloadAction<ObjectArray>) => {
      state.array = action.payload;
    },
    swapElements: (
      state,
      action: PayloadAction<{ idx1: number; idx2: number }>
    ) => {
      const { idx1, idx2 } = action.payload;
      [state.array[idx1], state.array[idx2]] = [
        state.array[idx2],
        state.array[idx1],
      ];
      state.swaps++;
    },
    moveElement: (
      state,
      action: PayloadAction<{ itemIdx: number; toIdx: number }>
    ) => {
      const { itemIdx, toIdx } = action.payload;
      const item = state.array[itemIdx];
      state.array.splice(itemIdx, 1);
      state.array.splice(toIdx, 0, item);
      state.swaps++;
    },
    goodPair: (
      state,
      action: PayloadAction<{
        idx1: number;
        idx2: number;
        deactivateAll?: boolean;
        justChecking?: boolean;
      }>
    ) => {
      const { idx1, idx2, deactivateAll, justChecking } = action.payload;
      if (deactivateAll)
        state.array.forEach((el) => (el.color = mainTheme.mainColor));
      state.array[idx1].color = mainTheme.correctPosColor;
      state.array[idx2].color = mainTheme.correctPosColor;
      if (justChecking) state.comparisons++;
    },
    wrongPair: (
      state,
      action: PayloadAction<{
        idx1: number;
        idx2: number;
        deactivateAll?: boolean;
      }>
    ) => {
      const { idx1, idx2, deactivateAll } = action.payload;
      if (deactivateAll)
        state.array.forEach((el) => (el.color = mainTheme.mainColor));
      state.array[idx1].color = mainTheme.wrongPosColor;
      state.array[idx2].color = mainTheme.wrongPosColor;
    },
    allSorted: (state) => {
      state.array = state.array.map((element) => ({
        ...element,
        color: mainTheme.fullySortedColor,
      }));
    },
    resetInfo: (state) => {
      state.comparisons = 0;
      state.swaps = 0;
    },
  },
});

export const {
  setArray,
  swapElements,
  moveElement,
  goodPair,
  wrongPair,
  allSorted,
  resetInfo,
} = arraySlice.actions;

export default arraySlice.reducer;
