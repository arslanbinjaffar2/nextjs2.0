/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { StatusBar} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import RootStack from './src/navigations/RootStack';
import { func } from './src/styles';
import * as Font from 'expo-font';

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  });
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
    <NativeBaseProvider theme={theme}>
      <StatusBar  />
      <RootStack />
    </NativeBaseProvider>
  );
};
export default App;
