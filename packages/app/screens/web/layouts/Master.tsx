import * as React from 'react';
import { Center, Container, Flex, HStack, ScrollView } from 'native-base';
import { useWindowDimensions } from 'react-native';
import Sidebar from 'app/screens/web/layouts/Sidebar';
import RightSidebar from 'app/containers/web/right-sidebar/Index';
import Header from 'app/screens/web/layouts/Header';
import BackgroundLayout from 'app/screens/web/layouts/BackgroundLayout';
import HeaderWebMobile from './HeaderWebMobile';

type Props = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
    navigation: unknown
};

const Master = ({ children, navigation }: Props) => {
  const {width} = useWindowDimensions();
  return (
    <BackgroundLayout>
      <Flex w="100%" h="100%" direction="column">
        <ScrollView>
          <Flex mx="auto" maxW={width <= 1200 && width >= 970 ? '970px' : width <= 970  ? '725px' : '1200px'} w="100%" py="40px" px="15px">
            {width > 725 ? <Header width={width} navigation={navigation} /> : (
              <HeaderWebMobile />
            )}
            <Container position="relative" maxW="100%" w="100%">
              <HStack w="100%" pt="3" space="5" alignItems="flex-start">
                {width > 750 && <Sidebar navigation={navigation} />}
                <Center w="100%" alignItems="flex-start" justifyContent="flex-start" maxW={width > 750 ? '600px' : '100%'}>
                  {children}
                </Center>
                {width >= 970 && <Center position="sticky" top="2rem" alignItems="flex-start" maxW={width >= 1201 ? '265px' : '230px'}>
                  <RightSidebar navigation={navigation} />
                </Center>}
              </HStack>
            </Container>
          </Flex>
        </ScrollView>
      </Flex>
    </BackgroundLayout>
  )};

export default Master;