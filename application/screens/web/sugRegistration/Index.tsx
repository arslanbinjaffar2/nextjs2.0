import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';

import IndexTemplate from 'application/components/templates/subRegistration/web/Index';

import { Center, Container, Flex, HStack, ScrollView } from 'native-base';

import BackgroundLayout from '../layouts/BackgroundLayout';
import Header from '../layouts/Header';
import { useWindowDimensions } from 'react-native';
import { useRouter } from 'solito/router';
import UseAuthService from 'application/store/services/UseAuthService';
import { UseEventService } from 'application/store/services';


type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
  const { width } = useWindowDimensions();

  const { push } = useRouter();

  const { isLoggedIn } = UseAuthService();

  const { event, modules, loadModules, loadSettingsModules } = UseEventService();

  const access_token_exists =  Boolean(localStorage.getItem(`access_token`));
  
  React.useEffect(() => {
    if (isLoggedIn === false || access_token_exists === false) {
      push(`/${event.url}/auth/login`)
    }
  }, [])
  
  return (
    <BackgroundLayout>
      <Flex w="100%" h="100%" direction="column">
        <ScrollView nativeID="body-scroll"
         
        >
          <Flex mx="auto" maxW={width <= 1200 && width >= 970 ? '970px' : width <= 970 ? '725px' : '1200px'} w="100%" py="40px" px="15px">
            {width > 725 ? <Header width={width} /> : (
              <Header />
            )}
            <Container position="relative" maxW="100%" w="100%">
              <HStack w="100%" pt="3" space="5" alignItems="flex-start">
                <Center overflow="auto" position="sticky" top="2rem" alignItems="flex-start" w={width > 1200 ? '265px' : '70px'} />
                <Center h={'100%'} w="100%" alignItems="flex-start" justifyContent="flex-start" maxW={(width > 750 ? '600px' : '100%')}>
                  <IndexTemplate />
                </Center>
               
              </HStack>
            </Container>
          </Flex>
        </ScrollView>
      </Flex>
  </BackgroundLayout>
     
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
