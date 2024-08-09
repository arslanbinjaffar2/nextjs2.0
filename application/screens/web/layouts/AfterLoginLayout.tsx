import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';

import IndexTemplate from 'application/components/templates/networkInterest/web/Index';

import { Box, Center, Container, Flex, HStack, ScrollView } from 'native-base'

import BackgroundLayout from '../layouts/BackgroundLayout';
import Header from '../layouts/Header';
import HeaderMobile from '../layouts/HeaderMobile';
import { useWindowDimensions } from 'react-native';
import { useRouter } from 'solito/router';
import UseAuthService from 'application/store/services/UseAuthService';
import { UseEventService } from 'application/store/services';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import ThingsToIncludeOnAllLayouts from 'application/components/atoms/common/ThingsToIncludeOnAllLayouts';
import usePostLoginFlowMiddleware from 'application/middlewares/usePostLoginFlowMiddleware';


type indexProps = {
  children:
  | JSX.Element
  | JSX.Element[]
  | string
  | string[];
}

const AfterLoginLayout = ({ children }: indexProps) => {
  const { width } = useWindowDimensions();

  const { push } = useRouter();

  const { getUser, onboarding, isLoggedIn } = UseAuthService();

  const { event, event_url } = UseEventService();

  React.useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };
    fetchUser();
  }, []);
  
  React.useEffect(() => {
      usePostLoginFlowMiddleware({ event, event_url, onboarding, push });
  }, [onboarding, isLoggedIn])

  return (
    <BackgroundLayout>
      <Flex w="100%" h="100%" direction="column">
        <ScrollView nativeID="body-scroll">
          <Flex mx="auto" maxW={width <= 1200 && width >= 970 ? '970px' : width <= 970 ? '725px' : '1200px'} w="100%" py="40px" px="15px">
            {width > 725 ? <Header width={width} /> : (
              <HeaderMobile />
            )}
            <Container position="relative" maxW="100%" w="100%">
              <HStack w="100%" pt="3" space="5" alignItems="flex-start">
                {width > 725 && <Center overflow="auto" position="sticky" top="2rem" alignItems="flex-start" w={width > 1200 ? '265px' : '70px'} />}
                <Center h={'100%'} w="100%" alignItems="flex-start" justifyContent="flex-start" maxW={(width > 750 ? '600px' : '100%')}>
                 {children}
                </Center>
              </HStack>
            </Container>
            <ThingsToIncludeOnAllLayouts />
          </Flex>
        </ScrollView>
      </Flex>
  </BackgroundLayout>
     
  );

};


export default AfterLoginLayout;
