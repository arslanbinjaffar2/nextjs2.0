import * as React from 'react';
import { Center, Container, Flex, HStack, ScrollView } from 'native-base';
import { useWindowDimensions } from 'react-native';
import LeftBar from 'application/screens/web/layouts/LeftBar';
import LeftBarProfile from 'application/screens/web/layouts/LeftBarProfile';
import RightBar from 'application/screens/web/layouts/RightBar';
import BackgroundLayout from 'application/screens/web/layouts/BackgroundLayout';
import Header from 'application/screens/web/layouts/Header';
import HeaderMobile from 'application/screens/web/layouts/HeaderMobile';
import UseAuthService from 'application/store/services/UseAuthService';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router'
import WebLoading from 'application/components/atoms/WebLoading';
import ScrollCloseToBottom from 'application/utils/ScrollCloseToBottom';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseSubRegistrationService from 'application/store/services/UseSubRegistrationService';
import UseNotificationService from 'application/store/services/UseNotificationService';
import { useRouter as UseNextRouter } from 'next/router';
import SocketHandler from 'application/provider/Socket/SocketHandler';
import ToastContainer from 'application/components/atoms/toast';
import ThingsToIncludeOnAllLayouts from 'application/components/atoms/common/ThingsToIncludeOnAllLayouts';
import usePostLoginFlowMiddleware from 'application/middlewares/usePostLoginFlowMiddleware';

type Props = {
  children:
  | JSX.Element
  | JSX.Element[]
  | string
  | string[];
  section?: string
};

const Master = ({ children, section }: Props) => {

  const { width } = useWindowDimensions();

  const { event, modules, loadModules, loadSettingsModules,event_url } = UseEventService();

  const { getUser, response, isLoggedIn } = UseAuthService();

  const { scroll, setScrollCounter, loading } = UseLoadingService();

  const { FetchNotifications } = UseNotificationService();

  const { skip, page_scroll } = UseSubRegistrationService();

  const { push } = useRouter();

  const nextRouter = UseNextRouter();

  React.useEffect(() => {
    const fetchUser = async () => {
      await getUser();
    };
    fetchUser();
}, []);

  React.useEffect(() => {
    usePostLoginFlowMiddleware({ event, loadSettingsModules, isLoggedIn, response, push });
  }, [response, isLoggedIn])
  
  const access_token_exists = Boolean(localStorage.getItem(`access_token_${event_url}`));


  React.useEffect(() => {
    if (response.redirect === "login" || access_token_exists === false) {
      localStorage.setItem(`requested_url_${event_url}`, nextRouter.asPath);
      push(`/${event.url}/auth/login`);
    }else{
        const requested_url = localStorage.getItem(`requested_url_${event_url}`);
        if (requested_url) {localStorage.removeItem(`requested_url_${event_url}`);
         if(requested_url.split('/').pop() !== 'editprofile'){
           push(requested_url);
         }
        }
    }
  }, [response])
  

  React.useEffect(() => {
    if (modules.length === 0 && isLoggedIn && event.id) {
      loadModules();
      loadSettingsModules();
      FetchNotifications();
    }
  }, [modules, event, isLoggedIn])
  
  const { height } = useWindowDimensions()
  return (
    <BackgroundLayout>
      {modules.length === 0 ? (
        <WebLoading />
      ) : (
        <>
          <Flex w="100%" h={[height - 10,"100%"]} direction="column">
            <ScrollView scrollEnabled={page_scroll} nativeID="body-scroll"
              onScroll={({ nativeEvent }) => {
               
                if (ScrollCloseToBottom(nativeEvent) && !loading) {
                  setScrollCounter(scroll + 1);
                }
                let scrollHeight = nativeEvent.contentOffset.y
                let _id = document?.getElementById('ebs-master-left-bar');
                let _id2 = document?.getElementById('ebs-master-right-bar');
                if (_id){ 
                if (scrollHeight > _id?.offsetHeight) {
                  _id.style.position = 'sticky';
                  _id.style.top = '-100%';
                } else {
                  _id.style.position = 'static';
                  _id.style.top = '0';
                }}
                if (_id2){ 
                if (scrollHeight > (_id2?.offsetHeight)) {
                  _id2.style.position = 'sticky';
                  _id2.style.top = '-100%';
                } else {
                  _id2.style.position = 'static';
                  _id2.style.top = '0';
                }}

              }}
              scrollEventThrottle={400}
            >
              <Flex mx="auto" maxW={width <= 1200 && width >= 970 ? '970px' : width <= 970 ? '725px' : '1200px'} w="100%" py="40px" px="15px">
                {width > 725 ? <Header width={width} /> : (
                  <HeaderMobile />
                )}
                <Container position="relative" maxW="100%" w="100%">
                  <HStack w="100%" pt="3" space="5" alignItems="flex-start">
                    {width > 750 && (
                      <>
                        {nextRouter.asPath.includes('settings') ? (
                          <LeftBarProfile />
                        ) : (
                          <LeftBar />
                        )}
                      </>
                    )}
                    <Center h={'100%'} w="100%" alignItems="flex-start" justifyContent="flex-start" maxW={nextRouter.asPath.includes('settings') || nextRouter.asPath.includes('attendees/my-registration') ? (width >= 1201 ? '900px' : '850px') : (width > 750 ? '600px' : '100%')}>
                      {children}
                    </Center>
                    {width >= 970 && !nextRouter.asPath.includes('attendees/my-registration') && !nextRouter.asPath.includes('settings') && <Center nativeID='ebs-master-right-bar' top="2rem" alignItems="flex-start" w={'100%'} maxW={width >= 1201 ? '265px' : '230px'}>
                      <RightBar />
                    </Center>}
                  </HStack>
                </Container>
                <ThingsToIncludeOnAllLayouts />
              </Flex>
            </ScrollView>
          </Flex>
          <SocketHandler/>
          <ToastContainer/>

        </>
      )}

    </BackgroundLayout>
  )
};

export default Master;