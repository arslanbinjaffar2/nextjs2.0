import * as React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import { gStyle, images } from '../styles';

const Layout = ({ children }) => (
  <View style={gStyle.mainContainer}>
    <ImageBackground blurRadius={8} style={{ flex: 1, justifyContent: 'center' }} resizeMode='cover' source={images.SplashImage}>
      <View style={{ ...gStyle.flex1, ...gStyle.bgContainer }}>
        <ScrollView contentContainerStyle={gStyle.flex1}>
          {children}
        </ScrollView>
      </View>
    </ImageBackground>
  </View>
);

export default Layout;