import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import DeckView from "./DeckView";
import { gray, green, deepPurple } from "../utils/Colors";
import { handleInitialData } from "../actions/index";
import { connect } from "react-redux";

const DeckList = ({ decks, navigation, handleInitialData }) => {
  useEffect(() => {
    handleInitialData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Flashcards</Text>
      {Object.values(decks).map((deck) => {
        return (
          <TouchableOpacity
            key={deck.title}
            onPress={() =>
              navigation.navigate("DeckDetail", { title: deck.title })
            }
          >
            <DeckView id={deck.title} />
          </TouchableOpacity>
        );
      })}
      <View style={{ marginBottom: 30 }} />
    </ScrollView>
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
  title: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 30,
    color: deepPurple,
  },
});

const mapStateToProps = (state) => ({ decks: state });

export default connect(mapStateToProps, { handleInitialData })(DeckList);
