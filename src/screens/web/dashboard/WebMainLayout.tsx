import * as React from 'react';
import { Center, Container, Flex,HStack,ScrollView } from 'native-base';
import Layout from '@src/containers/mobile/Layout';
import Sidebar from '@src/containers/web/Sidebar';
import RightSidebar from '@src/containers/web/RightSidebar';
import WebHeader from '@src/containers/web/WebHeader';


type Props = {
  children:
  | JSX.Element
  | JSX.Element[]
  | string
  | string[];
  navigation: unknown
};

const WebMainLayout = ({ children, navigation }: Props) => (
  <Layout>
    <Flex w="100%" h="100%" direction="column">
      <ScrollView>
        <Center mx="auto" maxW="1200px" w="100%" py="40px" px="15px">
          {/* Header Web */}
          <WebHeader navigation={navigation} />
          {/* Header Web */}
          {/* Body */}
          <Container maxW="100%" w="100%">
            <HStack pt="3" space="5" alignItems="flex-start">
              <Sidebar navigation={navigation} />
              {/* main Content */}
              <Center alignItems="flex-start" justifyContent="flex-start" w="600px">
                {children}
              </Center>
              {/* main Content */}
              {/* Right Sidebar */}
              <Center alignItems="flex-start" w="265px">
                <RightSidebar navigation={navigation} />
              </Center>
              {/* Right Sidebar */}
            </HStack>
          </Container>
          {/* Body */}
        </Center>
      </ScrollView>
    </Flex>
  </Layout>

);

export default WebMainLayout;