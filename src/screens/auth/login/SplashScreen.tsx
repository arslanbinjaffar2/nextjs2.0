import * as React from 'react';
import PropTypes from 'prop-types';
import {Image, ScrollView, Text, View } from 'react-native';
import { gStyle, images } from '../../../styles';

const SplashScreen = ({ navigation }) => {

  return (
    <View style={gStyle.mainContainer}>
      <ScrollView contentContainerStyle={gStyle.container}>
        <Text style={gStyle.textBox}>Home content area</Text>
        <Image
          style={{ alignSelf: 'center', height: 40, width: 40 }}
          source={images.Logo}
        />
      </ScrollView>
    </View>
  );
};

SplashScreen.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

export default SplashScreen;
