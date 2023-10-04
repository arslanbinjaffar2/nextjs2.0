import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import Header from 'application/screens/mobile/layouts/headers/Header';
import { Center } from 'native-base';
import { useState } from 'react';
import IndexTemplate from 'application/components/templates/sponsors/mobile/Index';
import { useIsFocused } from '@react-navigation/native';
import UseSponsorService from 'application/store/services/UseSponsorService';

const Index = ({ navigation }: any) => {

  const [scroll, setScroll] = useState(false);

  const isFocused = useIsFocused();

  const { FetchSponsors } = UseSponsorService();

  React.useEffect(() => {
    if (isFocused) {
      FetchSponsors({ category_id: 0, query: '' });
    }
  }, [isFocused]);


  return (
    <Master navigation={navigation}>
      <Header minimal={scroll} navigation={navigation} />
      <Center w={'100%'} px={15}>
        <IndexTemplate />
      </Center>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
