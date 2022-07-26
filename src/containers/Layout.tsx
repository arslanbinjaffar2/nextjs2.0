import * as React from 'react';
import {Platform, ImageBackground, View } from 'react-native';
import { gStyle, images } from '@src/styles';

const Layout = ({ children }) => (
  <React.Fragment>
    {Platform.OS !== 'web' && <View style={gStyle.mainContainer}>
      <ImageBackground blurRadius={8} style={{ flex: 1, justifyContent: 'center' }} resizeMode='cover' source={images.SplashImage}>
        <View style={{ ...gStyle.flex1, ...gStyle.bgContainer }}>
          {children}
        </View>
      </ImageBackground>
    </View>}
    {Platform.OS === 'web' && 
    <React.Fragment>
      <ImageBackground blurRadius={8} style={{ position: 'fixed', width: '100%', height: '100%' }} resizeMode='cover' source={images.SplashImage}>
        <View style={{ ...gStyle.flex1, ...gStyle.bgContainer }} />
      </ImageBackground>
      {children}
    </React.Fragment>}
  </React.Fragment>
);

export default Layout;