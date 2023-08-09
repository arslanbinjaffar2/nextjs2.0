import { NavigationProvider } from './navigation'
import { NativeBaseProvider, extendTheme } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect } from 'react';
import colors from 'application/styles/colors'
import { LinearGradient } from 'expo-linear-gradient';
import { func } from 'application/styles';
import * as Font from 'expo-font';
import UseEnvService from 'application/store/services/UseEnvService';
import ThemeColors from 'application/utils/ThemeColors';

export function Provider({ children, env }: { children: React.ReactNode, env: any }) {

  const [appIsReady, setAppIsReady] = useState(false);

  const { updateEnv, _env } = UseEnvService()

  useEffect(() => {
    updateEnv(env);
  }, [])

  const config = {
    dependencies: {
      'linear-gradient': LinearGradient
    }
  };

  const theme = extendTheme({
    colors: ThemeColors,
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
          'avenir': require('application/assets/fonts/AvenirNextCondensed.ttf'),
          'avenir-medium': require('application/assets/fonts/AvenirNextCondensed-Medium.ttf'),
          'avenir-demi': require('application/assets/fonts/AvenirNextCondensed-DemiBold.ttf'),
          'avenir-bold': {
            uri: require('application/assets/fonts/AvenirNextCondensedBold.ttf'),
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

  if (!appIsReady || !_env.api_base_url) {
    return null;
  }

  return (
    <NavigationProvider>
      <NativeBaseProvider config={config} theme={theme}>{children}</NativeBaseProvider>
    </NavigationProvider>
  )
}
