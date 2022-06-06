import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import EmptyCard from 'main/common/empty-cards';
import CalendarModel, { CardModel } from 'main/models/calendar-model';
import { WriteCalendarFileModel } from 'main/models/ipc-models';
import CalendarService from '../services/calendar-service';

const intialCalendarState: CalendarModel = {
  name: '',
  dateCreated: '',
  dateModified: '',
  version: '',
  defaultCard: EmptyCard,
  familyCards: [],
  businessCards: [],
  clubCards: [],
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
      state.defaultCard = action.payload.defaultCard;
      state.familyCards = action.payload.familyCards;
      state.businessCards = action.payload.businessCards;
      state.clubCards = action.payload.clubCards;
    },
    setDefaultCard(state, action: PayloadAction<CardModel>) {
      state.defaultCard = action.payload;
    },
    setFamilyCards(state, action: PayloadAction<CardModel[]>) {
      state.familyCards = action.payload;
    },
    setBusinessCards(state, action: PayloadAction<CardModel[]>) {
      state.businessCards = action.payload;
    },
    setClubCards(state, action: PayloadAction<CardModel[]>) {
      state.clubCards = action.payload;
    },
    addCard(state, action: PayloadAction<WriteCalendarFileModel>) {
      state.familyCards = action.payload.calendar.familyCards;
      state.businessCards = action.payload.calendar.businessCards;
      state.clubCards = action.payload.calendar.clubCards;
      CalendarService.writeCalendarFile(
        action.payload.path,
        action.payload.password,
        action.payload.calendar
      );
    },
    resetCalendar(state) {
      state.name = intialCalendarState.name;
      state.dateCreated = intialCalendarState.dateCreated;
      state.dateModified = intialCalendarState.dateModified;
      state.version = intialCalendarState.version;
      state.defaultCard = intialCalendarState.defaultCard;
      state.familyCards = intialCalendarState.familyCards;
      state.businessCards = intialCalendarState.businessCards;
      state.clubCards = intialCalendarState.clubCards;
    },
  },
});

export const {
  setCalendar,
  setDefaultCard,
  setFamilyCards,
  setBusinessCards,
  setClubCards,
  addCard,
  resetCalendar,
} = calendarSlice.actions;

export default calendarSlice;
