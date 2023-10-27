import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import Header from 'application/screens/mobile/layouts/headers/Header';
import { Center, VStack, ScrollView, Divider, Heading, HStack } from 'native-base';
import { useState } from 'react';
import DetailTemplate from 'application/components/templates/qa/mobile/Detail'

const Index = ({ navigation }: any) => {

  const [scroll, setScroll] = useState(false);

  return (
    <Master navigation={navigation}>
      <Header minimal={scroll} navigation={navigation} />
      <Center w={'100%'} px={15}>
      <DetailTemplate/>
      </Center>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
