import { NavigationProvider } from './navigation'
import { NativeBaseProvider, extendTheme } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect } from 'react';
import { getColorScheme } from 'application/styles/colors'
import { LinearGradient } from 'expo-linear-gradient';
import { func } from 'application/styles';
import * as Font from 'expo-font';
import { createParam } from 'solito';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';

type ScreenParams = { event: string }

const { useParam } = createParam<ScreenParams>()

export function Provider({ children, env }: { children: React.ReactNode, env: any }) {

    const [appIsReady, setAppIsReady] = useState(false);

    const [nativebaseTheme, setNativebaseTheme] = useState<any>(null);

    const [event_url] = useParam('event')

    const { FetchEvent, event } = UseEventService()

    const { updateEnv, _env } = UseEnvService()

    useEffect(() => {
        if (event_url !== undefined && _env.api_base_url) {
            FetchEvent(event_url)
        }
    }, [FetchEvent, event_url, _env.api_base_url])

    useEffect(() => {
        updateEnv(env);
    }, [])

    const config = {
        dependencies: {
            'linear-gradient': LinearGradient
        }
    };

    // const theme = extendTheme({
    //     colors: {
    //         primary: {
    //             50: '#E3F2F9',
    //             100: '#C5E4F3',
    //             200: '#A2D4EC',
    //             300: '#7AC1E4',
    //             400: '#47A9DA',
    //             500: colors.primary,
    //             600: '#007AB8',
    //             700: '#006BA1',
    //             800: '#005885',
    //             900: '#003F5E',
    //             box: `rgba(${colors.box},0.8)`,
    //             darkbox: `rgba(${colors.darkbox},0.8)`,
    //             boxTransparent: `rgba(${colors.box},0.5)`,
    //             text: `${colors.text}`,
    //             secondary: colors.secondary,
    //             bdColor: 'rgba(148,160,183,0.64)',
    //             bdBox: `rgba(${colors.darkbox},1)`,
    //         },
    //         amber: {
    //             400: '#d97706',
    //         },
    //     },
    //     fonts: {
    //         heading: 'Avenir',
    //         body: 'Avenir',
    //         mono: 'Avenir',
    //     },
    //     components: {
    //         Heading: {
    //             defaultProps: { fontSize: '2xl', fontWeight: '600', color: 'primary.text' },
    //         },
    //         Text: {
    //             defaultProps: { fontSize: 'md', fontWeight: '400', color: 'primary.text' },
    //         },
    //         Button: {
    //             defaultProps: {
    //                 size: 'lg', bg: 'primary.500',
    //                 _hover: { bg: colors.primary },
    //                 _text: { color: 'primary.text' },
    //                 _pressed: { bg: `${colors.secondary}` }
    //             }
    //         },
    //         Input: {
    //             defaultProps: {
    //                 fontSize: 'md',
    //                 bg: 'primary.darkbox',
    //                 borderColor: 'primary.darkbox',
    //                 _focus: {
    //                     borderColor: `rgb(${colors.darkbox})`,
    //                 },
    //             },
    //             baseStyle: {
    //                 _light: {
    //                     placeholderTextColor: colors.text,
    //                 },
    //                 _dark: {
    //                     placeholderTextColor: colors.text
    //                 },
    //             },
    //         }
    //     },
    //     config: {
    //         initialColorMode: 'dark',
    //     },
    // });
    
    useEffect(() => {
      if(Object.keys(event).length > 0){
          const colors =   getColorScheme('#343d50');
    
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
                    boxTransparent: `rgba(${colors.box},0.5)`,
                    text: `${colors.text}`,
                    secondary: colors.secondary,
                    bdColor: 'rgba(148,160,183,0.64)',
                    bdBox: `rgba(${colors.darkbox},1)`,
                },
                amber: {
                    400: '#d97706',
                },
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
    
            setNativebaseTheme(theme);
      }
    }, [event]);
    

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                func.loadAssetsAsync;
                await Font.loadAsync({
                    'MaterialIcons': require('react-native-vector-icons/Fonts/MaterialIcons.ttf'),
                    'SimpleLineIcons': require('react-native-vector-icons/Fonts/SimpleLineIcons.ttf'),
                    'AntDesign': require('react-native-vector-icons/Fonts/AntDesign.ttf'),
                    'Ionicons': require('react-native-vector-icons/Fonts/Ionicons.ttf'),
                    'Entypo': require('react-native-vector-icons/Fonts/Entypo.ttf'),
                    'FontAwesome': require('react-native-vector-icons/Fonts/FontAwesome.ttf'),
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

    if (!appIsReady || Object.keys(event).length === 0 || !_env.api_base_url || nativebaseTheme == null) {
        return null;
    }

    console.log(event.settings, 'event....')


    return (
        <NavigationProvider>
            <NativeBaseProvider config={config} theme={nativebaseTheme}>{children}</NativeBaseProvider>
        </NavigationProvider>
    )
}
