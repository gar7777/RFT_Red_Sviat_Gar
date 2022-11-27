import { createSlice } from '@reduxjs/toolkit';
import { getLangfromLS, CurrentLang } from '../../../utilities/getLang';

type LangState = {
  lang: CurrentLang;
};

const langFromLS = getLangfromLS();

const initialUserState: LangState = {
  lang: langFromLS,
};

const langSlice = createSlice({
  name: 'lang',
  initialState: initialUserState,
  reducers: {
    setLang(state, action) {
      state.lang = action.payload;
    },
  },
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
