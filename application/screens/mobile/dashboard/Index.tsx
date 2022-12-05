import * as React from 'react';
import PropTypes from 'prop-types';
import Layout from 'applications/app/containers/mobile/Layout';
import Dashboard from 'applications/app/containers/mobile/headers/Dashboard';
import { Center, VStack, ScrollView, Divider, Heading, HStack } from 'native-base';
import { useState } from 'react';
import VerticalBoxItemListing from 'applications/app/components/molecules/exhibitors/VerticalBoxItemListing';
import StreamBlock from 'applications/app/components/organisms/programs/videos/StreamBlock';
import BlockNotification from 'applications/app/components/atoms/notifications/BlockNotification';
import ProgramListing from 'applications/app/components/organisms/programs/Listing';
import SpeakerRoundedList from 'applications/app/components/organisms/speakers/RoundedList';
import PollListing from 'applications/app/components/organisms/polls/Listing';

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
              <BlockNotification title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
            </Center>
            <Center w="48%">
              <BlockNotification title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
            </Center>
          </HStack>
          <StreamBlock />
          <VerticalBoxItemListing />
          <ProgramListing />
          <SpeakerRoundedList />
          <PollListing />
        </ScrollView>
      </Center>
    </Layout>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
