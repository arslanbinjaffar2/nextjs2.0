/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { gStyle, images } from '../../../styles';
import Layout from '../../../containers/Layout';

const SplashScreen = ({ navigation }) => {
  return (
    <Layout>
      <View style={{ ...gStyle.flex1, ...gStyle.justifyCenter }}>
        <Image source={images.Logo} style={{ width: 240, height: 52, alignSelf: 'center' }} />
      </View>
    </Layout>
  );
};

SplashScreen.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
};

export default SplashScreen;
