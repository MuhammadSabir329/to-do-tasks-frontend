import { configureStore } from "@reduxjs/toolkit";
import listsSlice from "./listsSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    lists: listsSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;