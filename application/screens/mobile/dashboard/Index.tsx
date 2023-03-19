import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import DrawerHeaderNotification from 'application/screens/mobile/layouts/headers/DrawerHeaderNotification';
import { Center, VStack, ScrollView, Divider, Heading, HStack } from 'native-base';
import { useState } from 'react';
import VerticalBoxItemListing from 'application/components/molecules/exhibitors/VerticalBoxItemListing';
import StreamBlock from 'application/components/organisms/programs/videos/StreamBlock';
import BlockNotification from 'application/components/atoms/notifications/BlockNotification';
import ProgramListing from 'application/components/organisms/programs/Listing';
import SpeakerRoundedList from 'application/components/organisms/speakers/RoundedList';
import PollListing from 'application/components/organisms/polls/Listing';
import ModulesTopBar from 'application/components/atoms/ModulesTopBar';

const Index = ({ navigation }: any) => {
  const [scroll, setscroll] = useState(false)
  return (
    <Master>
      <DrawerHeaderNotification minimal={scroll} navigation={navigation} />
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
          <ModulesTopBar />
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
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
