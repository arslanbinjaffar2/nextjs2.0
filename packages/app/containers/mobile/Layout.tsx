import * as React from 'react';
import { ImageBackground, View } from 'react-native';
import { gStyle, images } from 'app/styles';

type Props = {
  children:
  | JSX.Element
  | JSX.Element[]
  | string
  | string[];
};

const Layout = ({ children }: Props) => (
  <>
    <View style={gStyle.mainContainer}>
      <ImageBackground blurRadius={8} style={{ flex: 1, justifyContent: 'center' }} resizeMode='cover' source={{ uri: images.SplashImage }}>
        <View style={{ ...gStyle.flex1, ...gStyle.bgContainer }}>
          {children}
        </View>
      </ImageBackground>
    </View>
  </>
);

export default Layout;