import { createSlice } from "@reduxjs/toolkit";
import { shuffleCardFn } from "../utils/utils";

const initialState = {
  cards: shuffleCardFn(),
  turns: 0,
  clickOne: null,
  clickTwo: null,
  cardsDisabled: false,
  timer: 0,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    shuffleCards: (state) => {
      state.cards = shuffleCardFn();
      state.turns = 0;
      state.timer = 0;
      state.clickOne = null;
      state.clickTwo = null;
    },
    cardClick: (state, action) => {
      if (!state.cardsDisabled) {
        if (state.clickOne) {
          state.clickTwo = action.payload;
        } else {
          state.clickOne = action.payload;
        }
      }
    },
    matchCards: (state) => {
      state.cards = state.cards.map((card) =>
        card.src === state.clickOne.src || card.src === state.clickTwo.src
          ? { ...card, matched: true }
          : card
      );
    },
    resetClicks: (state) => {
      state.clickOne = null;
      state.clickTwo = null;
      state.cardsDisabled = false;
      state.turns += 1;
    },
    setCardsDisabled: (state, action) => {
      state.cardsDisabled = action.payload;
    },
    incrementTimer: (state) => {
      state.timer += 1;
    },
  },
});

export const {
  shuffleCards,
  cardClick,
  matchCards,
  resetClicks,
  setCardsDisabled,
  incrementTimer,
} = gameSlice.actions;

export default gameSlice.reducer;
