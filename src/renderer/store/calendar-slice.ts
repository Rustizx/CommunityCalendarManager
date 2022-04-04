import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalendarModel, FamilyModel } from '../models/redux-models';

const intialCalendarState: CalendarModel = {
  name: '',
  dateCreated: '',
  dateModified: '',
  version: '',
  families: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: intialCalendarState,
  reducers: {
    setCalendar(state, action: PayloadAction<CalendarModel>) {
      state.name = action.payload.name;
      state.dateCreated = action.payload.dateCreated;
      state.dateModified = action.payload.dateModified;
      state.version = action.payload.version;
      state.families = action.payload.families;
    },
    setCalendarFamilies(state, action: PayloadAction<FamilyModel[]>) {
      state.families = action.payload;
    },
    resetCalendar(state) {
      state.name = intialCalendarState.name;
      state.dateCreated = intialCalendarState.dateCreated;
      state.dateModified = intialCalendarState.dateModified;
      state.version = intialCalendarState.version;
      state.families = intialCalendarState.families;
    },
  },
});

export const { setCalendar, setCalendarFamilies, resetCalendar } =
  calendarSlice.actions;

export default calendarSlice;
