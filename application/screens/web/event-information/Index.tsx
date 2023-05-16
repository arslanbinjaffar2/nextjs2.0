import * as React from 'react';
import PropTypes from 'prop-types';
import { Container, HStack, Icon, Image, Input, Spacer, Text } from 'native-base';
import Master from 'application/screens/web/layouts/Master';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseInfoService from 'application/store/services/UseInfoService';
import Listing from 'application/components/templates/event_info/Listing';
import { useRouter } from 'next/router'
import BannerView from 'application/components/atoms/banners/RectangleView';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const router = useRouter();

  const alias: any = router.query['event-info'];

  const { FetchInfo, info } = UseInfoService();

  React.useEffect(() => {
    //FetchInfo(alias);
  }, [alias])

  return (
    <Master navigation={navigation}>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" w="100%" space="3" alignItems="center">
          <Text fontSize="2xl">
            {
              (() => {
                if (alias === 'practical-info') {
                  return 'Practical information'
                } else if (alias === 'additional-info') {
                  return 'Additional information'
                } else if (alias === 'general-info') {
                  return 'General information'
                }
              })()
            }
          </Text>
          <Spacer />
          <Input rounded="10" w="60%" bg="primary.box" borderWidth={0} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
        </HStack>
        <Listing rounded={10} />
        <BannerView />
      </Container>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
