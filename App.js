import React, { useState } from 'react';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Login from "./components/Login";

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

  return <Login />;
}
