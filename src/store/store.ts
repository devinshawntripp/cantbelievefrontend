import appReducer from "./slices/app-slice";
import blogReducer from "./slices/blog-slice";
import { configureStore } from "@reduxjs/toolkit";
// import { getDefaultMiddleware } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    app: appReducer,
    blog: blogReducer,
    // middleware: getDefaultMiddleware({
    //     serializableCheck: false
    // })
  },
});
