import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  defaultBusiness,
  defaultClub,
  defaultFamily,
} from '../models/model-defaults';
import {
  BusinessCardModel,
  CalendarModel,
  ClubCardModel,
  FamilyCardModel,
} from '../models/redux-models';

const intialCalendarState: CalendarModel = {
  name: '',
  dateCreated: '',
  dateModified: '',
  version: '',
  defaultFamilyCard: defaultFamily,
  familyCards: [],
  defaultBusinessCard: defaultBusiness,
  businessCards: [],
  defaultClubCard: defaultClub,
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
      state.defaultFamilyCard = action.payload.defaultFamilyCard;
      state.familyCards = action.payload.familyCards;
      state.defaultBusinessCard = action.payload.defaultBusinessCard;
      state.businessCards = action.payload.businessCards;
      state.defaultClubCard = action.payload.defaultClubCard;
      state.clubCards = action.payload.clubCards;
    },
    setDefaultFamily(state, action: PayloadAction<FamilyCardModel>) {
      state.defaultFamilyCard = action.payload;
    },
    setDefaultBusiness(state, action: PayloadAction<BusinessCardModel>) {
      state.defaultBusinessCard = action.payload;
    },
    setDefaultClub(state, action: PayloadAction<ClubCardModel>) {
      state.defaultClubCard = action.payload;
    },
    setFamilyCards(state, action: PayloadAction<FamilyCardModel[]>) {
      state.familyCards = action.payload;
    },
    setBusinessCards(state, action: PayloadAction<BusinessCardModel[]>) {
      state.businessCards = action.payload;
    },
    setClubCards(state, action: PayloadAction<ClubCardModel[]>) {
      state.clubCards = action.payload;
    },
    resetCalendar(state) {
      state.name = intialCalendarState.name;
      state.dateCreated = intialCalendarState.dateCreated;
      state.dateModified = intialCalendarState.dateModified;
      state.version = intialCalendarState.version;
      state.defaultFamilyCard = intialCalendarState.defaultFamilyCard;
      state.familyCards = intialCalendarState.familyCards;
      state.defaultBusinessCard = intialCalendarState.defaultBusinessCard;
      state.businessCards = intialCalendarState.businessCards;
      state.defaultClubCard = intialCalendarState.defaultClubCard;
      state.clubCards = intialCalendarState.clubCards;
    },
  },
});

export const {
  setCalendar,
  setDefaultFamily,
  setDefaultBusiness,
  setDefaultClub,
  setFamilyCards,
  setBusinessCards,
  setClubCards,
  resetCalendar,
} = calendarSlice.actions;

export default calendarSlice;
