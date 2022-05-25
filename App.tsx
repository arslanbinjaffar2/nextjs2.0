import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import RootStack from './src/navigations/RootStack';
import { func } from './src/styles';

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        func.loadAssetsAsync;
        
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
      <StatusBar style="auto" />
      <RootStack />
    </React.Fragment>
  );
};
export default App;
