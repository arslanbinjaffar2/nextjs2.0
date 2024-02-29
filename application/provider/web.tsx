import { NavigationProvider } from './navigation'
import { Icon, NativeBaseProvider, extendTheme } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';
import React, { useState, useEffect } from 'react';
import { getColorScheme } from 'application/styles/colors'
import { LinearGradient } from 'expo-linear-gradient';
import { func } from 'application/styles';
import * as Font from 'expo-font';
import { createParam } from 'solito';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';
import Head from 'next/head';
import Ionicons from '@expo/vector-icons/Ionicons';
import { usePathname } from 'next/navigation';

function hex2rgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [Math.abs(r), Math.abs(g), Math.abs(b)]
}

type ScreenParams = { event: string }

const { useParam } = createParam<ScreenParams>()

export function Provider({ children, env }: { children: React.ReactNode, env: any }) {

    const [appIsReady, setAppIsReady] = useState(false);

    const [nativebaseTheme, setNativebaseTheme] = useState<any>(null);

    const [event_url] = useParam('event')

    const { FetchEvent, event } = UseEventService()

    const { updateEnv, _env } = UseEnvService()

    const pathname = usePathname();

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

    useEffect(() => {
      if(Object.keys(event).length > 0){
          const colors =   getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
        const rgb = hex2rgb(event?.settings?.primary_color ?? '#343d50');
           const theme = extendTheme({
            colors: {
                primary: {
                    50: event?.settings?.primary_color,
                    100: event?.settings?.primary_color,
                    200: event?.settings?.primary_color,
                    300: event?.settings?.primary_color,
                    400: event?.settings?.primary_color,
                    500: event?.settings?.primary_color,
                    600: event?.settings?.primary_color,
                    700: event?.settings?.primary_color,
                    800: event?.settings?.primary_color,
                    900: event?.settings?.primary_color,
                    box: `rgba(${colors.darkbox},0.3)`,
                    darkbox: `rgba(0,0,0,0.2)`,
                    primarycolor : `rgba(${[...rgb]},0.2)`,
                    boxTransparent: `rgba(${colors.box},0.5)`,
                    text: `${colors.text}`,
                    bordercolor: `${colors.text}`,
                    secondary: event?.settings?.secondary_color,
                    bdColor: 'rgba(148,160,183,0.64)',
                    bdBox: `rgba(${colors.darkbox},1)`,
                },
                secondary: {
                    50: event?.settings?.secondary_color,
                    100: event?.settings?.secondary_color,
                    200: event?.settings?.secondary_color,
                    300: event?.settings?.secondary_color,
                    400: event?.settings?.secondary_color,
                    500: event?.settings?.secondary_color, 
                    600: event?.settings?.secondary_color ,
                    700: event?.settings?.secondary_color ,
                    800: event?.settings?.secondary_color ,
                    900: event?.settings?.secondary_color ,
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
                        _hover: { bg: event?.settings?.primary_color },
                        _text: { color: 'primary.text' },
                        _pressed: { bg: `${colors.secondary}`, color: '#fff' }
                    }
                },
                Checkbox: {
                    defaultProps: {
                        colorScheme: 'secondary',
                        bg: 'white',
                        color: 'white',
                        _checked: {
                            _icon: {color: 'white'}
                        }
                      
                    },
                },
                Radio: {
                    defaultProps: {
                        colorScheme: 'secondary',
                        bg: 'white'
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
                            placeholderTextColor: 'rgba(0,0,0,.5)'
                        },
                        _dark: {
                            placeholderTextColor: 'rgba(255,255,255,.5)'
                        },
                    },
                }
            },
            config: {
                initialColorMode: event?.settings?.app_text_mode == 'dark' ? 'light' : 'dark',
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

    useEffect(() => {
     document?.getElementById('body-scroll')?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [pathname])
    if (!appIsReady || Object.keys(event).length === 0 || !_env.api_base_url || nativebaseTheme == null) {
        return null;
    }

    return (
        <NavigationProvider>
            <>
                <Head>
                    <title>{event.name}</title>
                    <meta
                    name="description"
                    content={event.name}
                    />
                    {event?.settings?.fav_icon !== "" && <link rel="icon" type="image/x-icon"  href={`${_env.eventcenter_base_url}/assets/event/branding/${event.settings?.fav_icon}`} />}
                </Head>
                <NativeBaseProvider config={config} theme={nativebaseTheme}>{children}</NativeBaseProvider>
            </>
        </NavigationProvider>
    )
}
