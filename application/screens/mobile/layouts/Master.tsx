import * as React from 'react';
import { ImageBackground, View } from 'react-native';
import { gStyle, images } from 'application/styles';
import UseAuthService from 'application/store/services/UseAuthService';
import AsyncStorageClass from 'application/utils/AsyncStorageClass';
import UseEventService from 'application/store/services/UseEventService';
import { useRoute } from '@react-navigation/native';
import in_array from "in_array";
import MobileLoading from 'application/components/atoms/MobileLoading';
import { useIsFocused } from '@react-navigation/native';

type Props = {
  children:
  | JSX.Element
  | JSX.Element[]
  | string
  | string[];
  navigation: any
};

const Master = ({ children, navigation }: Props) => {

  const { response, loadToken, isLoggedIn, getUser } = UseAuthService();

  const { FetchEventByCode, event, modules,event_url } = UseEventService();

  const [process, setProcess] = React.useState(false);

  const route: any = useRoute();

  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (response.redirect === "login") {
      navigation.navigate('auth', {
        params: {
          screen: 'login'
        }
      })
    } else if (response.redirect === "dashboard") {
      navigation.navigate('app', {
        params: {
          screen: 'dashboard'
        }
      })
    } else if (response.redirect === "choose-provider") {
      navigation.navigate('auth', {
        screen: 'choose-provider',
        params: {
          id: response.data.authentication_id,
        }
      })
    } else if (response.redirect === "verification") {
      navigation.navigate('auth', {
        screen: 'verification',
        params: {
          id: response.data.authentication_id,
        }
      })
    } else if (response.redirect === "reset-password") {
      navigation.navigate('auth', {
        screen: 'reset-password',
        params: {
          token: response.data.token,
        }
      })
    }
  }, [response.redirect])

  React.useEffect(() => {
    if (event.id) {
      AsyncStorageClass.getItem(`access_token_${event_url}`).then((token: string) => {
        loadToken(Boolean(token));
        setProcess(true);
      });
    }
  }, [event.id])

  React.useEffect(() => {
    AsyncStorageClass.getItem('eventbuizz-active-event-id').then((event_id: any) => {
      if (Object.keys(event).length === 0 && event_id) {
        FetchEventByCode(event_id)
      }
    });
  }, []);

  React.useEffect(() => {
    if (process) {
      if (event.id && isLoggedIn) {
        if (in_array(route.name, ['login', 'reset-password-request', 'choose-provider', 'verification', 'reset-password', 'email-login', 'events', 'welcome'])) {
          navigation.navigate('app', {
            params: {
              screen: 'dashboard'
            }
          })
        }
      } else if (event.id && !isLoggedIn && !in_array(route.name, ['login', 'reset-password-request', 'choose-provider', 'verification', 'reset-password', 'email-login', 'events', 'welcome'])) {
        navigation.navigate('auth', {
          params: {
            screen: 'login'
          }
        })
      } else if (!event.id) {
        navigation.navigate(`welcome`)
      }
    }
  }, [process]);

  React.useEffect(() => {
    if (isFocused && isLoggedIn) {
      getUser();
    }
  }, [isFocused]);

  return (
    <>
      <View style={gStyle.mainContainer}>
        <ImageBackground blurRadius={8} style={{ flex: 1, justifyContent: 'center' }} resizeMode='cover' source={images.SplashImage}>
          <View style={{ ...gStyle.flex1, ...gStyle.bgContainer }}>
            {modules.length === 0 && isLoggedIn ? (
              <MobileLoading />
            ) : (
              <>{children}</>
            )}
          </View>
        </ImageBackground>
      </View>
    </>
  )
}

export default Master;