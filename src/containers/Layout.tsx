import * as React from 'react';
import { ImageBackground, View } from 'react-native';
import { gStyle, images } from '../styles';

const Layout = ({ children }) => (
  <View style={gStyle.mainContainer}>
    <ImageBackground blurRadius={8} style={{ flex: 1, justifyContent: 'center' }} resizeMode='cover' source={images.SplashImage}>
      <View style={{ ...gStyle.flex1, ...gStyle.bgContainer }}>
        {children}
      </View>
    </ImageBackground>
  </View>
);

export default Layout;