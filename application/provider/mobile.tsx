import { NavigationProvider } from './navigation'
import { NativeBaseProvider, extendTheme } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect } from 'react';
import colors from 'applications/app/styles/colors'
import { LinearGradient } from 'expo-linear-gradient';
import { func } from 'applications/app/styles';
import * as Font from 'expo-font';

export function Provider({ children }: { children: React.ReactNode }) {

  const [appIsReady, setAppIsReady] = useState(false);

  const config = {
    dependencies: {
      'linear-gradient': LinearGradient
    }
  };

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
        secondary: colors.secondary,
        bdColor: 'rgba(148,160,183,0.64)',
        bdBox: `rgba(${colors.darkbox},1)`,
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
        defaultProps: {
          size: 'lg', bg: 'primary.500',
          _hover: { bg: colors.primary },
          _text: { color: 'primary.text' },
          _pressed: { bg: `${colors.secondary}` }
        }
      },
      Input: {
        defaultProps: {
          fontSize: 'md',
          bg: 'primary.darkbox',
          borderColor: 'primary.darkbox',
          _focus: {
            borderColor: `rgb(${colors.darkbox})`,
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
          'avenir': require('app/assets/fonts/AvenirNextCondensed.ttf'),
          'avenir-medium': require('app/assets/fonts/AvenirNextCondensed-Medium.ttf'),
          'avenir-demi': require('app/assets/fonts/AvenirNextCondensed-DemiBold.ttf'),
          'avenir-bold': {
            uri: require('app/assets/fonts/AvenirNextCondensedBold.ttf'),
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
    <NavigationProvider>
      <NativeBaseProvider config={config} theme={theme}>{children}</NativeBaseProvider>
    </NavigationProvider>
  )
}
