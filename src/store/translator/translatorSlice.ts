import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { translatorInitialState } from "./types";
import { objectType } from '../../types/types';
import { STORAGENAME } from '../../constants'

const initialState: translatorInitialState = {
  words: [],
  countAnswer: [],
  countInitialTest: 0,
};

export const translatorSlice = createSlice({
  name: "translator",
  initialState,
  reducers: {
    addNewWords: (state, action: PayloadAction<objectType>) => {
      state.words.push(action.payload);
    },
    addNewRating: (state, action: PayloadAction<string>) => {
      state.countAnswer.push(action.payload);
    },
    increment: (state) => {
      state.countInitialTest += 1;
    },
    getWordsListFromLocalStorage: (state) => {
      const wordsList = localStorage.getItem(STORAGENAME.WORDSLIST);
      state.words = wordsList ? JSON.parse(wordsList) : [];
    },
    addWordsListToLocalStorage: (state) => {
      localStorage.setItem(STORAGENAME.WORDSLIST, JSON.stringify(state.words));
    },
    getResultsFromLocalStorage: (state) => {
      const results = localStorage.getItem(STORAGENAME.RESULTS);
      state.countAnswer = results ? JSON.parse(results) : [];
    },
    addResultsToLocalStorage: (state) => {
      localStorage.setItem(STORAGENAME.RESULTS, JSON.stringify(state.countAnswer));
    },
    removeResultsFromLocalStorage: (state) => {
      localStorage.removeItem(STORAGENAME.RESULTS);
      state.countAnswer = [];
    },
  },
});

export const {
  addNewWords,
  addNewRating,
  increment,
  getWordsListFromLocalStorage,
  addWordsListToLocalStorage,
  getResultsFromLocalStorage,
  addResultsToLocalStorage,
  removeResultsFromLocalStorage,
} = translatorSlice.actions;
