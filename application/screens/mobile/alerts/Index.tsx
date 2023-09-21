import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/mobile/layouts/Master';

import Header from 'application/screens/mobile/layouts/headers/Header';

import { Center } from 'native-base';

import IndexTemplate from 'application/components/templates/alerts/mobile/Index';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const [scroll, setScroll] = React.useState(false);

  return (
    <Master navigation={navigation}>
      <Header minimal={scroll} navigation={navigation} />
      <Center w={'100%'} px={15}>
        <IndexTemplate/>
      </Center>
    </Master>
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
