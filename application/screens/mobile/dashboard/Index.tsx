import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import DrawerHeaderNotification from 'application/screens/mobile/layouts/headers/DrawerHeaderNotification';
import { Center, VStack, ScrollView, Divider, Heading, HStack } from 'native-base';
import { useState } from 'react';
import ExhibitorsListing from 'application/components/molecules/exhibitors/Listing';
import UpcomingBlock from 'application/components/atoms/programs/UpcomingBlock';
import ProgramListing from 'application/components/templates/programs/Listing';
import SpeakerRoundedList from 'application/components/templates/speakers/RoundedList';
import PollSlideView from 'application/components/templates/polls/SlideView';
import ModulesTopBar from 'application/components/atoms/ModulesTopBar';
import Stream from 'application/components/organisms/programs/videos/Stream';

const Index = ({ navigation }: any) => {

  const [scroll, setScroll] = useState(false);

  return (
    <Master>
      <DrawerHeaderNotification minimal={scroll} navigation={navigation} />
      <Center w={'100%'} px={15}>
        <Divider mx="auto" w="160px" bg="primary.text" my="5" />
        <ScrollView h="85%" onScroll={(event: { nativeEvent: { contentOffset: { y: number; }; }; }) => setScroll(event.nativeEvent.contentOffset.y > 40 ? true : false)}>
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
              <UpcomingBlock title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
            </Center>
            <Center w="48%">
              <UpcomingBlock title="UPCOMING SESSION" desc="Workshop 2 - The right path" location="Room 242" date="11-03-2022" time="11-00 to 13-00" />
            </Center>
          </HStack>
          <Stream />
          <ProgramListing />
          <SpeakerRoundedList />
          <ExhibitorsListing />
          <PollSlideView />
        </ScrollView>
      </Center>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
