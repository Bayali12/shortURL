import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type NotificationKind = 'error' | 'success';

type Notification = {
  message: string;
  kind: NotificationKind;
};

type NotificationState = {
  notifications: Array<Notification>;
};

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications = [...state.notifications, action.payload];
    },
    removeNotification: (state) => {
      state.notifications = state.notifications.slice(1);
    },
  },
});

export const notificationsReducer = notificationSlice.reducer;
export const { addNotification, removeNotification } =
  notificationSlice.actions;
