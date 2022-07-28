import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './src/navigations/RootStack';
import { LinearGradient } from 'expo-linear-gradient';
import { func } from './src/styles';
import * as Font from 'expo-font';
import colors from './src/styles/colors'
import { color } from 'native-base/lib/typescript/theme/styled-system';
const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};
const App = () => {
  
  const [appIsReady, setAppIsReady] = useState(false);

  const theme = extendTheme({
    colors: {
      primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: colors.primary,
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
        box: `rgba(${colors.box},0.8)`,
        darkbox: `rgba(${colors.darkbox},0.8)`,
        text: `${colors.text}`,
      },
      amber: {
        400: '#d97706',
      },
    },
    fontConfig: {
      Avenir: {
        400: {
          normal: 'avenir-medium'
        },
        600: {
          normal: 'avenir-demi'
        },
        700: {
          normal: 'avenir-bold'
        },
      }
    },
    fonts: {
      heading: 'Avenir',
      body: 'Avenir',
      mono: 'Avenir',
    },
    components: {
      Heading: {
        defaultProps: { fontSize: '2xl', fontWeight: '600', color: 'primary.text' },
      },
      Text: {
        defaultProps: { fontSize: 'md', fontWeight: '400', color: 'primary.text' },
      },
      Button: {
        defaultProps: { size: 'lg' },
      },
      Input: {
        defaultProps: {
          fontSize: 'md',
          bg: 'primary.darkbox',
          borderColor: 'primary.darkbox',
          style: {
            paddingLeft: 15,
          },
          _focus: {
            borderColor: `rgb(${colors.darkbox})`,
            style: {
              backgroundColor: `rgb(${colors.darkbox})`,
              paddingLeft: 16
            }
          },
        },
        baseStyle: {
          _light: {
            placeholderTextColor: colors.text,
          },
          _dark: {
            placeholderTextColor: colors.text
          },
        },
      }
    },
    config: {
      initialColorMode: 'dark',
    },
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        func.loadAssetsAsync;
        await Font.loadAsync({
          'avenir': require('./src/assets/fonts/AvenirNextCondensed.ttf'),
          'avenir-medium': require('./src/assets/fonts/AvenirNextCondensed-Medium.ttf'),
          'avenir-demi': require('./src/assets/fonts/AvenirNextCondensed-DemiBold.ttf'),
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
    <SafeAreaProvider>
      <NativeBaseProvider config={config} theme={theme}>
        <StatusBar />
        <RootStack />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );

};
export default App;
