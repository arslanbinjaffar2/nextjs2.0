import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import Header from 'application/screens/mobile/layouts/headers/Header';
import { Center, VStack, ScrollView, Divider, Heading, HStack, Container, IconButton, Icon, Button } from 'native-base';
import { useState } from 'react';
import OurExhibitors from 'application/components/molecules/exhibitors/OurExhibitors';
import UpcomingBlock from 'application/components/atoms/programs/UpcomingBlock';
import ProgramListing from 'application/components/templates/programs/Listing';
import SpeakerRoundedList from 'application/components/templates/speakers/RoundedList';
import ModulesTopBar from 'application/components/atoms/ModulesTopBar';
import Stream from 'application/components/organisms/programs/videos/Stream';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import PollRectangleView from 'application/components/atoms/polls/RectangleView';
import UsePollService from 'application/store/services/UsePollService';
import { useFocusEffect } from '@react-navigation/native'
import PollListingByDate from 'application/components/organisms/polls/PollListingByDate';
import UseBannerService from 'application/store/services/UseBannerService';
import BannerSlider from 'application/components/organisms/banner/BannerSlider';

const Index = ({ navigation }: any) => {

  const [scroll, setScroll] = useState(false);
  const { polls, FetchPolls } = UsePollService();
  const { banners, FetchBanners } = UseBannerService();

  useFocusEffect(React.useCallback(() => {
    FetchPolls();
    FetchBanners();
  }, [])
  );
  return (
    <Master navigation={navigation}>
      <Header minimal={scroll} navigation={navigation} />
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
          <OurExhibitors />
          {Object.keys(polls).length > 0 && <PollListingByDate polls={polls} />}
          {banners.length > 0 && <BannerSlider banners={banners} />}
        </ScrollView>
      </Center>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
