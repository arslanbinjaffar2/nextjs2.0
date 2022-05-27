/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { gStyle, images } from '../../../styles';
import Layout from '../../../containers/Layout';
import { Center, Container } from 'native-base';

const SplashScreen = ({ navigation }) => {
  return (
    <Layout>
      <Container flex={1} p="0">
      <Center  flex={1}  p="20">
          <Image source={images.Logo} style={{ width: 240, height: 52, alignSelf: 'center' }} />
        </Center>
      </Container>
   
    </Layout>
  );
};

SplashScreen.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
};

export default SplashScreen;
