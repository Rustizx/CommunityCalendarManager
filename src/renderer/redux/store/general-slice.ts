import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GeneralModel } from 'main/models/store-models';

const intialGeneralState: GeneralModel = {
  isFileLoaded: false,
  path: '',
  password: '',
  error: '',
};

const generalState = createSlice({
  name: 'general',
  initialState: intialGeneralState,
  reducers: {
    setGeneral(state, action: PayloadAction<GeneralModel>) {
      state.isFileLoaded = action.payload.isFileLoaded;
      state.path = action.payload.path;
      state.password = action.payload.password;
      state.error = action.payload.error;
    },
    setGeneralIsFileLoaded(state, action: PayloadAction<boolean>) {
      state.isFileLoaded = action.payload;
    },
    setGeneralPath(state, action: PayloadAction<string>) {
      state.path = action.payload;
    },
    setGeneralPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setGeneralError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetGeneral(state) {
      state.isFileLoaded = intialGeneralState.isFileLoaded;
      state.path = intialGeneralState.path;
      state.password = intialGeneralState.password;
      state.error = intialGeneralState.error;
    },
  },
});

export const {
  setGeneral,
  setGeneralIsFileLoaded,
  setGeneralPath,
  setGeneralPassword,
  setGeneralError,
  resetGeneral,
} = generalState.actions;

export default generalState;
