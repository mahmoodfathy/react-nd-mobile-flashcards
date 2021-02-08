import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import DeckDetail from "../components/DeckDetail";
import {
  darkGray,
  white,
  green,
  lightGreen,
  deepPurple,
  darkgreen,
} from "./Colors";
import DeckList from "../components/DeckList";
import { Icon } from "react-native-elements";
import NewDeck from "../components/NewDeck";
import NewCard from "../components/NewQuestion";
import Quiz from "../components/QuizView";

const routeConfigs = {
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="cards-outline"
          type="material-community"
          size={30}
          color={tintColor}
        />
      ),
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="add" type="material" color={tintColor} />
      ),
    },
  },
};
const tabNavigatorConfig = {
  navigationOptions: {
    headerShown: false,
  },
  defaultNavigationOptions: {
    bounces: true,
  },
  tabBarOptions: {
    activeTintColor: deepPurple,
    style: {
      height: 60,
      backgroundColor: white,
      shadowColor: "rgba(0,0,0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
      borderTopWidth: 1,
      borderTopColor: darkGray,
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: "bold",
    },
    tabStyle: {
      marginTop: 5,
      marginBottom: 3,
    },
    showIcon: true,
  },
};
const Tabs = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);
const Navigator = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: deepPurple,
      headerStyle: {
        backgroundColor: darkgreen,
      },
      title: "Deck Details",
    },
  },
  AddCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: deepPurple,
      headerStyle: {
        backgroundColor: darkgreen,
      },
      headerTitleStyle: {
        justifyContent: "center",
        textAlign: "center",
      },
      title: "Add Card",
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: deepPurple,
      headerStyle: {
        backgroundColor: darkgreen,
      },
    },
  },
});

export default Navigator;
