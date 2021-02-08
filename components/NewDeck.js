import React, { useState } from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { saveDeckTitle } from "../utils/Api";
import { addDeck } from "../actions/index";
import { gray, green, white, textGray } from "../utils/Colors";
import TouchButton from "./Button";

const NewDeck = ({ addDeck, navigation }) => {
  const [text, setText] = useState("");
  const handleChange = (text) => {
    setText(text);
  };
  const handleSubmit = () => {
    addDeck(text);
    saveDeckTitle(text);
    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: "Home" }),
        NavigationActions.navigate({
          routeName: "DeckDetail",
          params: { title: text },
        }),
      ],
    });
    navigation.dispatch(resetAction);

    setText("");
  };
  return (
    <View style={styles.container}>
      <View style={{ height: 60 }} />
      <View style={styles.block}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
      </View>
      <View style={[styles.block]}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={handleChange}
          placeholder="Please Enter a deck name...."
          autoFocus={true}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      </View>
      <TouchButton
        btnStyle={{ backgroundColor: green, borderColor: white }}
        onPress={handleSubmit}
        disabled={text === ""}
      >
        Create Deck
      </TouchButton>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: gray,
  },
  block: {
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: textGray,
    backgroundColor: white,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40,
    marginBottom: 20,
  },
});

export default connect(null, { addDeck })(NewDeck);
