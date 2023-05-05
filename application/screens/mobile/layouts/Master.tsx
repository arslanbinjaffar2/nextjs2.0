import * as React from 'react';
import { ImageBackground, View } from 'react-native';
import { gStyle, images } from 'application/styles';
import UseAuthService from 'application/store/services/UseAuthService';

type Props = {
  children:
  | JSX.Element
  | JSX.Element[]
  | string
  | string[];
  navigation: any
};

const Master = ({ children, navigation }: Props,) => {

  const { response } = UseAuthService();

  React.useEffect(() => {
    if (response.redirect === "login") {
      navigation.navigate(`login`)
    } else if (response.redirect === "dashboard") {
      navigation.navigate(`dashboard`)
    } else if (response.redirect === "choose-provider") {
      navigation.navigate(`choose-provider`, {
        id: response.data.authentication_id
      });
    } else if (response.redirect === "verification") {
      navigation.navigate(`verification`, {
        id: response.data.authentication_id
      });
    } else if (response.redirect === "reset-password") {
      navigation.navigate(`reset-password`, {
        token: response.data.token
      });
    }
  }, [response.redirect])

  return (
    <>
      <View style={gStyle.mainContainer}>
        <ImageBackground blurRadius={8} style={{ flex: 1, justifyContent: 'center' }} resizeMode='cover' source={images.SplashImage}>
          <View style={{ ...gStyle.flex1, ...gStyle.bgContainer }}>
            {children}
          </View>
        </ImageBackground>
      </View>
    </>
  )
}

export default Master;