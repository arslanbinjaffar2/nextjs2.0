import * as React from 'react';
import { Center, Container, Flex, HStack, ScrollView } from 'native-base';
import { useWindowDimensions } from 'react-native';
import LeftBar from 'application/screens/web/layouts/LeftBar';
import RightBar from 'application/screens/web/layouts/RightBar';
import BackgroundLayout from 'application/screens/web/layouts/BackgroundLayout';
import Header from 'application/screens/web/layouts/Header';
import UseAuthService from 'application/store/services/UseAuthService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router'

type Props = {
  children:
  | JSX.Element
  | JSX.Element[]
  | string
  | string[];
};

const Master = ({ children }: Props) => {

  const { width } = useWindowDimensions();

  const { event } = UseEventService();

  const { getUser, response } = UseAuthService();

  const { push } = useRouter();

  React.useEffect(() => {
    getUser();
  }, [])

  React.useEffect(() => {
    if (response.redirect === "login") {
      push(`/${event.url}/auth/login`)
    }
  }, [response])

  return (
    <BackgroundLayout>
      <Flex w="100%" h="100%" direction="column">
        <ScrollView>
          <Flex mx="auto" maxW={width <= 1200 && width >= 970 ? '970px' : width <= 970 ? '725px' : '1200px'} w="100%" py="40px" px="15px">
            {width > 725 ? <Header width={width} /> : (
              <Header />
            )}
            <Container position="relative" maxW="100%" w="100%">
              <HStack w="100%" pt="3" space="5" alignItems="flex-start">
                {width > 750 && <LeftBar />}
                <Center w="100%" alignItems="flex-start" justifyContent="flex-start" maxW={width > 750 ? '600px' : '100%'}>
                  {children}
                </Center>
                {width >= 970 && <Center position="sticky" top="2rem" alignItems="flex-start" maxW={width >= 1201 ? '265px' : '230px'}>
                  <RightBar />
                </Center>}
              </HStack>
            </Container>
          </Flex>
        </ScrollView>
      </Flex>
    </BackgroundLayout>
  )
};

export default Master;