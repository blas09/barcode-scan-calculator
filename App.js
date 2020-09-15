import React, { useState } from 'react';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Register from "./components/Register";
import Login from "./components/Login";
import { init } from './helpers/db';

init()
    .then(() => {
        console.log('db created.');
    }).catch((error) => {
        console.log('db creation failed.');
        console.log(error);
    });

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

  return <Register />;
}
