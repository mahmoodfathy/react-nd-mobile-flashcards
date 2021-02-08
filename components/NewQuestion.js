import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import TouchButton from "./Button";
import { addCardToDeck as addCardToDeckApi } from "../utils/Api";
import { addCardToDeck } from "../actions/index";
import { connect } from "react-redux";
import { gray, green } from "../utils/Colors";

const NewCard = ({ navigation, addCardToDeck, title }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const handleSubmit = () => {
    const card = {
      question,
      answer,
    };
    addCardToDeckApi(title, card);
    addCardToDeck(title, card);
    setQuestion("");
    setAnswer("");
    navigation.goBack();
  };
  const handleQuestionChange = (question) => {
    setQuestion(question);
  };
  const handleAnswerChange = (answer) => {
    setAnswer(answer);
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.block}>
          <Text style={styles.title}>Add a question</Text>
        </View>
        <View style={[styles.block]}>
          <TextInput
            style={styles.input}
            value={question}
            onChangeText={(text) => handleQuestionChange(text)}
            placeholder="Question"
            autoFocus={true}
            returnKeyType="next"
            // onSubmitEditing={() => answerTextInput.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={[styles.block]}>
          <TextInput
            style={styles.input}
            value={answer}
            onChangeText={(text) => handleAnswerChange(text)}
            placeholder="Answer"
            // ref={(input) => {
            //   this.answerTextInput = input;
            // }}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
        </View>
        <TouchButton
          btnStyle={{ backgroundColor: green, borderColor: "#fff" }}
          onPress={handleSubmit}
          disabled={question === "" || answer === ""}
        >
          Submit
        </TouchButton>
      </View>
      <View style={{ height: "30%" }} />
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
    justifyContent: "space-around",
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
    borderColor: "gray",
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40,
  },
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam("title");
  return {
    title,
  };
};
export default connect(mapStateToProps, { addCardToDeck })(NewCard);
