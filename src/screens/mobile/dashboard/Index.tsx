import * as React from 'react';
import PropTypes from 'prop-types';
import Layout from '@src/containers/mobile/Layout';
import Dashboard from '@src/containers/mobile/headers/Dashboard';
import { Button, Center, Flex, Text, VStack, Image, Input, ScrollView, Box, Divider, Heading, View, HStack } from 'native-base';
import { useState } from 'react';
import OurExhibitors from '@src/components/molecules/OurExhibitors';
import VideoBox from '@src/components/atoms/Videos/VideoBox';
import Notification from '@src/components/atoms/Notification';
import OurPrograms from '@src/components/molecules/OurPrograms';
import OurSpeakers from '@src/components/molecules/OurSpeakers';

const Index = ({ navigation }: any) => {
  const [scroll, setscroll] = useState(false)
  return (
    <Layout>
      <Dashboard minimal={scroll} navigation={navigation} />
      <Center w={'100%'} px={15}>
        <Divider mx="auto" w="160px" bg="primary.text" my="5" />
        <ScrollView h="85%" onScroll={(event: { nativeEvent: { contentOffset: { y: number; }; }; }) => setscroll(event.nativeEvent.contentOffset.y > 40 ? true : false)}>
          <VStack pb="2" space={0} alignItems="center" w="100%">
            <Heading fontSize="3xl">JANUAR VISION DANMARK</Heading>
            <Heading fontSize="xl">KØBENHAVN 29 JANUAR 11:30 - 16:30</Heading>
          </VStack>
          <VStack mb="3" space={0} alignItems="center" w="100%">
            <Heading fontSize="lg" bold>DR Koncerthus</Heading>
            <Heading fontSize="lg" bold>STUDIO 2, 2300 København S</Heading>
          </VStack>
          <HStack w="100%" space="4%">
            <Center w="48%">
              <Notification title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
            </Center>
            <Center w="48%">
              <Notification title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
            </Center>
          </HStack>
          
          
          <VideoBox />
          <OurExhibitors />
          <OurPrograms />
          <OurSpeakers />
        </ScrollView>
      </Center>
    </Layout>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
