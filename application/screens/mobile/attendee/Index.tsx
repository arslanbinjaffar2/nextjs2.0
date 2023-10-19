import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import Header from 'application/screens/mobile/layouts/headers/Header';
import { Center } from 'native-base';
import IndexTemplate from 'application/components/templates/attendees/mobile/index';

const Index = ({ navigation }: any) => {

  return (
    <Master navigation={navigation}>
      <Header minimal={false} navigation={navigation} />
      <Center w={'100%'} px={15}>
        <IndexTemplate speaker={0} screen='attendees' />
      </Center>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
