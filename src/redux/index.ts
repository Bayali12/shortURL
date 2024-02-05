import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth';
import { notificationsReducer } from './slices/notifications';
import { linksReducer } from './slices/links';

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationsReducer,
    links: linksReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
