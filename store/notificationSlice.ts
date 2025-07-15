import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  visible: false,
  message: '',
  type: 'info', // can be 'info', 'success', 'error'
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type || 'info';
    },
    hideNotification: (state) => {
      state.visible = false;
      state.message = '';
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
