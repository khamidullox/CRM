import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Language } from "../components/interface";

let dataFormLocalStorge = () => {
  try {
    const storedLang = localStorage.getItem("lang");
    return storedLang ? JSON.parse(storedLang) : { lang: "en" };
  } catch (error) {
    console.error("Error retrieving language from localStorage:", error);
    return { lang: "en" };
  }
};

const initialState: Language = dataFormLocalStorge();
export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    enLang: (state) => {
      state.lang = "en";
      langSlice.caseReducers.setLocal(state);
    },
    ruLang: (state) => {
      state.lang = "ru";
      langSlice.caseReducers.setLocal(state);
    },
    setLocal: (state) => {
      localStorage.setItem("lang", JSON.stringify(state));
    },
  },
});

export const { enLang, ruLang } = langSlice.actions;
export default langSlice.reducer;
