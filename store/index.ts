import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationSlice';
import appSlice from "./slices"
export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    app: appSlice,
  },
});
