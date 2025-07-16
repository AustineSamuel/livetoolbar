import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotificationType = 'info' | 'success' | 'error';
export type NotificationMessage = string;

interface NotificationState {
  visible: boolean;
  message: NotificationMessage;
  type: NotificationType;
}

interface NotificationPayload {
  message: NotificationMessage;
  type?: NotificationType;
}

const initialState: NotificationState = {
  visible: false,
  message: '',
  type: 'info',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<NotificationPayload>) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type ?? 'info';
    },
    hideNotification: (state) => {
      state.visible = false;
      state.message = '';
      state.type = 'info';
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
