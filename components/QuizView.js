import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import TouchButton from "./Button";
import ViewPagerAndroid from "@react-native-community/viewpager";
import * as Notifications from "expo-notifications";
import {
  clearLocalNotification,
  setLocalNotification,
} from "../Notification/index";
import {
  gray,
  green,
  red,
  textGray,
  darkGray,
  white,
  ligtPurple,
  pink,
  lightGreen,
} from "../utils/Colors";

const Quiz = ({ navigation, deck }) => {
  const viewPager = useRef(null);
  //   const setPage = useCallback((page) => ref.current?.setPage(page));
  const answer = {
    correct: "correct",
    incorrect: "incorrect",
  };
  const screens = {
    question: "question",
    answer: "answer",
    result: "result",
  };
  const [incorrect, setIncorrect] = useState(0);
  const [correct, setCorrect] = useState(0);
  const { questions } = deck;
  const [questionCount, setQuestionCount] = useState(questions.length);
  const [screen, setScreen] = useState(screens.question);
  const [answered, setAnswered] = useState(Array(questions.length).fill(0));
  const [page, setPage] = useState(0);
  const [correctdisabled, setcorrectDisabled] = useState(false);
  const [Incorrectdisabled, setIncorrectDisabled] = useState(false);
  const handleNotifications = async () => {
    await clearLocalNotification();
    setLocalNotification();
  };
  useEffect(() => {
    handleNotifications(); //called and fixed notification inside the useEffect as in review
    // const subscription = Notifications.addNotificationReceivedListener(
    //   (notification) => {
    //     console.log(notification);
    //   }
    // );

    // setLocalNotification();
    if (correct > 0) {
      setTimeout(() => setIncorrectDisabled(false), 600);
    }
    if (incorrect > 0) {
      setTimeout(() => setcorrectDisabled(false), 600);
    }
    if (questionCount === correct + incorrect) {
      setScreen(screens.result);
    } else {
      setPage(page + 1);
      setScreen(screens.question);
    }
    // return () => subscription.remove();
  }, [correct + incorrect]);
  const handleSubmitAnswer = (response, page) => {
    setPage(page);

    if (response === answer.correct) {
      setCorrect((prevState) => prevState + 1);
    } else {
      setIncorrect((prevState) => prevState + 1);
      setAnswered((prevState) =>
        prevState.map((value, index) => (page === index ? 1 : value))
      );
    }
  };
  const handleChangingPage = () => {
    setScreen(screens.question);
  };
  const handleQuizRestart = () => {
    setIncorrect(0);
    setCorrect(0);
    setAnswered(Array(questions.length).fill(0));
    setScreen(screens.question);
  };
  if (questions.length === 0) {
    return (
      <View style={styles.pageStyle}>
        <View style={styles.block}>
          <Text style={[styles.count, { textAlign: "center" }]}>
            You cannot take a quiz because there are no cards,Please Add Some
            Cards and Try Again.
          </Text>
        </View>
      </View>
    );
  }
  if (screen === screens.result) {
    const percent = ((correct / questionCount) * 100).toFixed(0);
    return (
      <View style={styles.pageStyle}>
        <View style={styles.block}>
          <Text style={[styles.count, { textAlign: "center" }]}>
            You Completed the Quiz
          </Text>
          <Text style={{ textAlign: "center", justifyContent: "center" }}>
            {correct} / {questionCount} correct
          </Text>
        </View>
        <View style={styles.block}>
          <Text style={[styles.count, { textAlign: "center" }]}>
            Percentage correct
          </Text>
          <Text style={{ textAlign: "center", justifyContent: "center" }}>
            {percent}%
          </Text>
        </View>
        <View>
          <TouchButton
            btnStyle={{ backgroundColor: green, borderColor: white }}
            onPress={handleQuizRestart}
          >
            Restart Quiz
          </TouchButton>
          <TouchButton
            btnStyle={{ backgroundColor: gray, borderColor: textGray }}
            txtStyle={{ color: textGray }}
            onPress={() => {
              handleQuizRestart();
              navigation.goBack();
            }}
          >
            Back To Deck
          </TouchButton>
          <TouchButton
            btnStyle={{ backgroundColor: gray, borderColor: textGray }}
            txtStyle={{ color: textGray }}
            onPress={() => {
              handleQuizRestart();
              navigation.navigate("Home");
            }}
          >
            Home
          </TouchButton>
        </View>
      </View>
    );
  }
  return (
    <ViewPagerAndroid
      style={styles.container}
      scrollEnabled={true}
      onPageSelected={handleChangingPage}
      ref={viewPager}
    >
      {questions.map((question, index) => (
        <View style={styles.pageStyle} key={index}>
          <View style={styles.block}>
            <Text style={styles.count}>
              {index + 1} / {questions.length}
            </Text>
          </View>
          <View style={[styles.block, styles.questionContainer]}>
            <Text style={styles.questionText}>
              {screen === screens.question ? "Question" : "Answer"}
            </Text>
            <View style={styles.questionWrapper}>
              <Text style={styles.title}>
                {screen === screens.question
                  ? question.question
                  : question.answer}
              </Text>
            </View>
          </View>
          {screen === screens.question ? (
            <TouchButton
              txtStyle={{ color: white }}
              btnStyle={{ backgroundColor: ligtPurple, borderColor: white }}
              onPress={() => setScreen(screens.answer)}
            >
              Show Answer
            </TouchButton>
          ) : (
            <TouchButton
              txtStyle={{ color: white }}
              btnStyle={{ backgroundColor: pink, borderColor: white }}
              onPress={() => setScreen(screens.question)}
            >
              Show Question
            </TouchButton>
          )}
          <View>
            <TouchButton
              btnStyle={{ backgroundColor: green, borderColor: white }}
              onPress={() => {
                handleSubmitAnswer(answer.correct, index);
                setIncorrectDisabled(true);
              }}
              disabled={correctdisabled}
            >
              Correct
            </TouchButton>
            <TouchButton
              btnStyle={{ backgroundColor: red, borderColor: white }}
              onPress={() => {
                handleSubmitAnswer(answer.incorrect, index);
                setcorrectDisabled(true);
              }}
              disabled={Incorrectdisabled}
            >
              Incorrect
            </TouchButton>
          </View>
        </View>
      ))}
    </ViewPagerAndroid>
  );
};
const mapStateToprops = (state, { navigation }) => {
  const title = navigation.getParam("title");
  const deck = state[title];
  return {
    deck,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageStyle: {
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
  count: {
    fontSize: 24,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: darkGray,
    backgroundColor: lightGreen,
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 16,
    paddingRight: 16,
    flexGrow: 1,
  },
  questionWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  questionText: {
    textAlign: "center",
    fontSize: 25,
  },
});
export default withNavigation(connect(mapStateToprops)(Quiz));
