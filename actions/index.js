import { getDecks } from "../utils/Api";

export const ADD_DECK = "ADD_DECK";
export const RECIEVE_DECK = "RECIEVE_DECK";
export const REMOVE_DECK = "REMOVE_DECK";
export const RESET_STORE = "RESET_STORE";
export const ADD_CARD = "ADD_CARD";

export const addDeck = (title) => {
  return {
    type: ADD_DECK,
    title,
  };
};
export const recieveDeck = (decks) => {
  return {
    type: RECIEVE_DECK,
    decks,
  };
};
export const removeDeck = (id) => {
  return {
    type: REMOVE_DECK,
    id,
  };
};
export const addCardToDeck = (Title, card) => {
  return {
    type: ADD_CARD,
    Title,
    card,
  };
};
export const resetStore = () => {
  return {
    type: RESET_STORE,
  };
};

export const handleInitialData = () => {
  return async (dispatch) => {
    const decks = await getDecks();
    dispatch(recieveDeck(decks));
  };
};
