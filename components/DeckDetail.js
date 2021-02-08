import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import DeckView from "./DeckView";
import { gray, textGray, green, white, red, darkGray } from "../utils/Colors";
import { connect } from "react-redux";
import { removeDeck } from "../actions/index";
import { removeDeck as removeDeckApi } from "../utils/Api";

const DeckDetail = React.memo(({ navigation, removeDeck, deck }) => {
  const disabled = false;
  const disabledButton = disabled ? styles.disabled : {};
  const disabledButtonText = disabled ? styles.textDisabled : {};
  const handleRemove = (id) => {
    removeDeckApi(id);
    removeDeck(id);
    //reroute to home after deleting
    navigation.navigate("Decks");
  };

  if (!deck) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DeckView id={deck.title} />
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: white, borderColor: textGray },
              disabledButton,
            ]}
            onPress={() =>
              navigation.navigate("AddCard", { title: deck.title })
            }
            disabled={disabled}
          >
            <Text
              style={[
                styles.buttonText,
                { color: textGray },
                disabledButtonText,
              ]}
            >
              Add Card
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: green, borderColor: white },
              disabledButton,
            ]}
            onPress={() => navigation.navigate("Quiz", { title: deck.title })}
            disabled={disabled}
          >
            <Text
              style={[styles.buttonText, { color: white }, disabledButtonText]}
            >
              Start Quiz
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => handleRemove(deck.title)}>
            <Text style={[styles.btnText, { color: red }]}>Delete Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: white,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "red",
    borderRadius: 5,
    justifyContent: `center`,
    alignItems: `center`,
    borderWidth: 1,
    borderColor: "#999",
  },
  disabled: {
    backgroundColor: gray,
    borderColor: darkGray,
  },
  textDisabled: {
    color: darkGray,
  },
  btnText: {
    fontSize: 20,
  },
  btnContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});
const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam("title", "");
  const deck = state[title];

  return {
    deck,
  };
};

export default connect(mapStateToProps, { removeDeck })(DeckDetail);
