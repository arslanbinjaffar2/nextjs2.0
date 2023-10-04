import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Stream from 'application/components/organisms/programs/videos/Stream';
import UseProgramService from 'application/store/services/UseProgramService';
import SpeakerRoundedList from 'application/components/templates/speakers/RoundedList';
import SpeakerListing from 'application/components/organisms/speakers/Listing';
import QAListing from 'application/components/organisms/qa/Listing';
import ChatClient from 'application/components/organisms/chat/ChatClient';
import Master from 'application/screens/web/layouts/Master';
import { Button, Center, Container, HStack, Heading, Icon } from 'native-base'
import PollListingByDate from 'application/components/organisms/polls/PollListingByDate'
import UsePollService from 'application/store/services/UsePollService';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import UseBannerService from 'application/store/services/UseBannerService';
import BannerSlider from 'application/components/organisms/banner/BannerSlider';
import SlideView from 'application/components/molecules/programs/SlideView';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const [tab, setTab] = useState('qa');

  const { polls, FetchPolls } = UsePollService();

  const { banners, FetchBanners } = UseBannerService();

  const { FetchPrograms, programs, page, id, query, track_id, tracks, FetchTracks, track } = UseProgramService();

  const { FetchAttendees } = UseAttendeeService();

  React.useEffect(() => {
    FetchPolls();
    FetchBanners();
    FetchPrograms({ query: '', page: 1, screen: 'dashboard', id: 0, track_id: 0 });
    FetchAttendees({ query: '', group_id: 0, page: 1, my_attendee_id: 0, speaker: 1, category_id: 0 });
  }, []);

  return (
    <Master>

      <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
        <Heading pt="2" fontSize="2xl" w="100%" textAlign="center">PROGRAMS</Heading>
        <SlideView section="program" programs={programs} my={0} />
        <Center py="3" px="2" w="100%" alignItems="flex-end">
          <Button p="1" _hover={{ bg: 'transparent', _text: { color: 'primary.500' }, _icon: { color: 'primary.500' } }} bg="transparent" width={'auto'} rightIcon={<Icon as={SimpleLineIcons} name="arrow-right" size="sm" />}>
            Show all
          </Button>
        </Center>
      </Container>

      <SpeakerRoundedList />


      {banners && <BannerSlider banners={banners} />}

      <HStack mb="3" space={1} justifyContent="center" w="100%">
        <Button onPress={() => setTab('qa')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>Q & A</Button>
        <Button onPress={() => setTab('speakerlist')} borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={!tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>SPEAKERS LIST</Button>
      </HStack>

      <>
        {tab === 'qa' && (
          <QAListing />
        )}
        {tab === 'speakerlist' && (
          <SpeakerListing />
        )}
      </>

      <ChatClient />

    </Master>
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
