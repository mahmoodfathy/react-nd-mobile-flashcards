import React, { useEffect } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducers/index";
import Navigation from "./utils/AppNavigation";
import { setLocalNotification } from "./Notification/index";

// //react-native start
export default function App() {
  useEffect(() => {
    setLocalNotification();
  }, []);
  const store = createStore(reducer, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
