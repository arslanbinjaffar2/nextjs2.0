import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Stream from 'application/components/organisms/programs/videos/Stream';
import UseProgramService from 'application/store/services/UseProgramService';
import SpeakerListing from 'application/components/organisms/speakers/Listing';
import QAListing from 'application/components/organisms/qa/Listing';
import ChatClient from 'application/components/organisms/chat/ChatClient';
import Master from 'application/screens/web/layouts/Master';
import { Button, Center, Container, HStack, Heading, Icon, ScrollView, Text, VStack } from 'native-base'
import PollListingByDate from 'application/components/organisms/polls/PollListingByDate'
import UsePollService from 'application/store/services/UsePollService';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import UseBannerService from 'application/store/services/UseBannerService';
import BannerSlider from 'application/components/organisms/banner/BannerSlider';
import SlideView from 'application/components/molecules/programs/SlideView';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { useRouter } from 'solito/router'
import UseEventService from 'application/store/services/UseEventService';
import RoundedView from 'application/components/atoms/speakers/RoundedView';
import IconWithLeftHeading from 'application/components/atoms/headings/IconWithLeftHeading'
import DynamicIcon from 'application/utils/DynamicIcon';
import { Attendee } from 'application/models/attendee/Attendee';
import WebLoading from 'application/components/atoms/WebLoading';
import in_array from "in_array";
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseAuthService from 'application/store/services/UseAuthService';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const [tab, setTab] = useState('qa');

  const { polls, FetchPolls } = UsePollService();

  const { event, modules } = UseEventService();

  const { banners, FetchBanners } = UseBannerService();

  const { FetchPrograms, programs, page, id, query, track_id, tracks, FetchTracks, track } = UseProgramService();

  const { FetchAttendees, attendees, my_attendees } = UseAttendeeService();

  const { processing } = UseLoadingService();

  const { response } = UseAuthService();

  const { push } = useRouter()

  React.useEffect(() => {
    FetchPolls();
    FetchBanners();
    if (modules.filter((module: any, key: number) => module.alias === 'agendas').length > 0) {
      FetchPrograms({ query: '', page: 1, screen: 'dashboard', id: 0, track_id: 0 });
    }
    if (modules.filter((module: any, key: number) => module.alias === 'speakers').length > 0) {
      FetchAttendees({ query: '', group_id: 0, page: 1, my_attendee_id: 0, speaker: 1, category_id: 0, screen: 'dashboard-my-speakers', program_id: 0 });
    }
  }, [modules.length]);

  return (
    <>
      {(in_array('programs', processing) || in_array('poll-listing', processing) || in_array('dashboard-my-speakers', processing)) ? (
        <WebLoading />
      ) : (
        <>
          {modules.filter((module: any, key: number) => module.alias === 'agendas').length > 0 && programs?.length > 0 ? (
            <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
              <Heading pt="2" fontSize="2xl" w="100%" textAlign="center">PROGRAMS</Heading>
              <SlideView section="program" programs={programs} my={0} />
              <Center py="3" px="2" w="100%" alignItems="flex-end">
                <Button onPress={() => {
                  push(`/${event.url}/agendas`)
                }} p="1" _hover={{ bg: 'transparent', _text: { color: 'primary.500' }, _icon: { color: 'primary.500' } }} bg="transparent" width={'auto'} rightIcon={<Icon as={SimpleLineIcons} name="arrow-right" size="sm" />}>
                  Show all
                </Button>
              </Center>
            </Container>
          ) : <></>}

          {event.speaker_settings?.display_speaker_dashboard == 1 &&  my_attendees?.length > 0 ? (
            <Container mb="3" w="100%" maxW="100%">
              <IconWithLeftHeading icon={<DynamicIcon iconType="speakers" iconProps={{ width: 27, height: 44 }} />} title="MEET OUR SPEAKERS" />
              <ScrollView horizontal={true} maxWidth={'100%'}>
                <HStack pt="1" w="100%" space="2" alignItems="center" justifyContent="space-between">
                  {my_attendees.map((attendee: Attendee, k: number) => <VStack key={k} alignItems="center" w={'100'}>
                    <RoundedView attendee={attendee} />
                    <Text isTruncated pt="2" w="100%" textAlign="center" fontSize="md">{`${attendee?.first_name} ${attendee?.last_name}`}</Text>
                  </VStack>)}
                </HStack>
              </ScrollView>
            </Container>
          ) : <></>}

          {banners && <BannerSlider banners={banners} />}

          {(event?.attendee_settings?.voting === 1 && response?.attendee_detail?.event_attendee?.allow_vote === 1) && (Object.keys(polls).length > 0) &&  <PollListingByDate polls={polls} />}

          <HStack mb="3" space={1} justifyContent="center" w="100%">
            <Button onPress={() => setTab('qa')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab ? 'primary.box' : 'primary.darkbox'} w={event?.speaker_settings?.display_speaker_dashboard == 1 ? "50%" : "100%"} _text={{ fontWeight: '600' }}>Q & A</Button>
            {event?.speaker_settings?.display_speaker_dashboard == 1 && <Button onPress={() => setTab('speakerlist')} borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={!tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>SPEAKERS LIST</Button>}
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

        </>

      )}
    </>
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
