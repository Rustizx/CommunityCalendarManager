import { configureStore } from '@reduxjs/toolkit';
import calendarSlice from './calendar-slice';
import generalSlice from './general-slice';

const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    general: generalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
