/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from 'react';
import { StatusBar} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import RootStack from './src/navigations/RootStack';
import { func } from './src/styles';
import * as Font from 'expo-font';

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {

    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        func.loadAssetsAsync;
        await Font.loadAsync({
          'avenir': require('./src/assets/fonts/AvenirNextCondensed.ttf'),
          'avenir-bold': {
            uri: require('./src/assets/fonts/AvenirNextCondensedBold.ttf'),
            display: Font.FontDisplay.FALLBACK,
          },
        });


      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    void prepare();
  }, []);
  if (!appIsReady) {
    return null;
  }
  return (
    <React.Fragment>
      <StatusBar  />
      <RootStack />
    </React.Fragment >
  );
};
export default App;
