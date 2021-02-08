import {
  RECIEVE_DECK,
  ADD_CARD,
  ADD_DECK,
  REMOVE_DECK,
  RESET_STORE,
} from "../actions/index";
import { decks as firstDeck } from "../utils/_Data";

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECIEVE_DECK:
      return {
        ...state,
        ...action.decks,
      };

    case ADD_CARD:
      const { card, Title } = action;
      return {
        ...state,
        [Title]: {
          ...state[Title],
          questions: [...state[Title].questions.concat(card)],
        },
      };

    case ADD_DECK:
      const { title } = action;
      return {
        ...state,
        [title]: {
          title,
          questions: [],
        },
      };

    case REMOVE_DECK:
      const { id } = action;
      const { [id]: value, ...remainingDecks } = state;
      return remainingDecks; //have to check this
    case RESET_STORE:
      return firstDeck;
    default:
      return state;
  }
}
