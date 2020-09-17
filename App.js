import React, { useState } from 'react';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import Router from "./navigation/Router";

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
            <PersistGate loading={null} persistor={persistor}>
                <Router />
            </PersistGate>
        </Provider>
    );
}
