import React, { useState } from 'react';

import { createStore, combineReducers } from "redux";

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import barcodeReducer from "./store/reducers/barcode.reducer";
import { Provider } from 'react-redux';
import Router from "./navigation/Router";

const rootReducer = combineReducers({
    barcode: barcodeReducer,
});

const store = createStore(rootReducer);

const fetchFonts = () => {
    return Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
      return (
          <AppLoading
              startAsync={fetchFonts}
              onFinish={() => setIsReady(true)}
          />
      );
  }

  return (
      <Provider store={store}>
          <Router />
      </Provider>
  );
}
