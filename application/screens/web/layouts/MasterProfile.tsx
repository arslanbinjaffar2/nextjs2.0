import * as React from 'react';
import { Center, Container, Flex, HStack, ScrollView } from 'native-base';
import { useWindowDimensions } from 'react-native';
import LeftBarProfile from 'application/screens/web/layouts/LeftBarProfile';
import BackgroundLayout from 'application/screens/web/layouts/BackgroundLayout';
import Header from 'application/screens/web/layouts/Header';
import UseAuthService from 'application/store/services/UseAuthService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router'
import WebLoading from 'application/components/atoms/WebLoading';
import ScrollCloseToBottom from 'application/utils/ScrollCloseToBottom';
import UseLoadingService from 'application/store/services/UseLoadingService';

type Props = {
  children:
  | JSX.Element
  | JSX.Element[]
  | string
  | string[];
};

const MasterProfile = ({ children }: Props) => {

  const { width } = useWindowDimensions();

  const { event, modules, loadModules, loadSettingsModules } = UseEventService();

  const { getUser, response, isLoggedIn } = UseAuthService();

  const { scroll, setScrollCounter, loading } = UseLoadingService();

  const { push } = useRouter();

  React.useEffect(() => {
    getUser();
  }, [])

  React.useEffect(() => {
    if (response.redirect === "login") {
      push(`/${event.url}/auth/login`)
    }
  }, [response])

  React.useEffect(() => {
    if (modules.length === 0 && isLoggedIn && event.id) {
      loadModules();
      loadSettingsModules();
    }
  }, [modules, event, isLoggedIn])

  return (
    <BackgroundLayout>
      {modules.length === 0 ? (
        <WebLoading />
      ) : (
        <Flex w="100%" h="100%" direction="column">
          <ScrollView nativeID="body-scroll"
            onScroll={({ nativeEvent }) => {
              if (ScrollCloseToBottom(nativeEvent) && !loading) {
                setScrollCounter(scroll + 1);
              }
            }}
            scrollEventThrottle={400}
          >
            <Flex mx="auto" maxW={width <= 1200 && width >= 970 ? '970px' : width <= 970 ? '725px' : '1200px'} w="100%" py="40px" px="15px">
              {width > 725 ? <Header width={width} /> : (
                <Header />
              )}
              <Container position="relative" maxW="100%" w="100%">
                <HStack w="100%" pt="3" space="5" alignItems="flex-start">
                  {width > 750 && <LeftBarProfile />}
                  <Center h={'100%'} w="100%" alignItems="flex-start" justifyContent="flex-start" maxW={width > 750 ? '910px' : '100%'}>
                    {children}
                  </Center>
                </HStack>
              </Container>
            </Flex>
          </ScrollView>
        </Flex>
      )}

    </BackgroundLayout>
  )
};

export default MasterProfile;