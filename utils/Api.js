import AsyncStorage from "@react-native-async-storage/async-storage";
import { decks } from "./_Data";

const KEY = "decks";

export const getDecks = async () => {
  try {
    const storeData = await AsyncStorage.getItem(KEY);

    if (storeData === null) {
      AsyncStorage.setItem(KEY, JSON.stringify(decks));
    }

    return storeData === null ? decks : JSON.parse(storeData);
  } catch (err) {
    console.log(err);
  }
};
export const getDeck = async (id) => {
  try {
    const sotreData = await AsyncStorage.getItem(KEY);
    return JSON.parse(sotreData)[id];
  } catch (e) {
    console.log(e);
  }
};

export const saveDeckTitle = async (title) => {
  try {
    await AsyncStorage.mergeItem(
      KEY,
      JSON.stringify({
        [title]: {
          title: title,
          questions: [],
        },
      })
    );
  } catch (e) {
    console.log(e);
  }
};

export const addCardToDeck = async (title, card) => {
  //card is an object of both answer and question
  const deck = getDeck(title);
  try {
    await AsyncStorage.mergeItem(
      KEY,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card),
        },
      })
    );
  } catch (e) {
    console.log(e);
  }
};

export const resetDecks = async () => {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(decks));
  } catch (err) {
    console.log(err);
  }
};

export const removeDeck = async (id) => {
  try {
    let data = await AsyncStorage.getItem(KEY);
    data = JSON.parse(data);
    data[id] = undefined;
    delete data[id];
    AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};
