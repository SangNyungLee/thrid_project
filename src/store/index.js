import { createSlice, configureStore } from "@reduxjs/toolkit";

const categoryState = {
  category: 0,
};

const myCategoryState = createSlice({
  name: "category",
  initialState: categoryState,
  reducers: {
    recent(state) {
      state.category = 0;
    },
    music(state) {
      state.category = 10;
    },
    game(state) {
      state.category = 20;
    },
    movie(state) {
      state.category = 24;
    },
  },
});

const store = configureStore({
  reducer: { category: myCategoryState.reducer },
});

export const changeCategory = myCategoryState.actions;

export default store;
