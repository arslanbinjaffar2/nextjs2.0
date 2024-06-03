import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Stream from 'application/components/organisms/programs/videos/Stream';
import UseProgramService from 'application/store/services/UseProgramService';
import SpeakerListing from 'application/components/organisms/speakers/Listing';
import QAListing from 'application/components/organisms/qa/Listing';
import ChatClient from 'application/components/organisms/chat/ChatClient';
import Master from 'application/screens/web/layouts/Master';
import { Button, Center, Container, HStack, Heading, Icon, ScrollView, Text, VStack, Spacer, Box } from 'native-base'
import PollListingByDate from 'application/components/organisms/polls/PollListingByDate'
import SurveyListing from 'application/components/organisms/survey/SurveyListing'
import UsePollService from 'application/store/services/UsePollService';
import UseSurveyService from 'application/store/services/UseSurveyService';
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
import { useWindowDimensions } from 'react-native';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import { Alert } from 'application/models/alert/Alert'
import RectangleView from 'application/components/atoms/alerts/RectangleView'
import UseAlertService from 'application/store/services/UseAlertService'
import MobileNavigation from 'application/screens/web/layouts/MobileNavigation';
import UpcomingBlock from 'application/components/atoms/programs/UpcomingBlock';
import { Banner } from 'application/models/Banner'
import { Module } from 'application/models/Module';
import UpcomingPrograms from 'application/components/atoms/programs/UpcomingPrograms';
import IndexTemplatePrograms from 'application/components/templates/programs/web/Index';
import { CustomHtml } from 'application/models/CustomHtml'

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const [tab, setTab] = useState('qa');

  const { polls, pollSettings, FetchPolls ,poll_labels} = UsePollService();

  const { surveys, FetchSurveys } = UseSurveyService();

  const { event, modules,custom_html } = UseEventService();

  const { banners, FetchBanners } = UseBannerService();
  const { FetchAlerts, alerts, markAlertRead, alert_setting} = UseAlertService();
  const { loading } = UseLoadingService();
  const { FetchPrograms, programs, page, id, query, track_id, tracks, FetchTracks, track } = UseProgramService();

  const { FetchAttendees, attendees, my_attendees } = UseAttendeeService();

  const { processing } = UseLoadingService();

  const { response } = UseAuthService();

  const { push } = useRouter()
   const { width } = useWindowDimensions();

  React.useEffect(() => {
    FetchPolls();
    FetchSurveys();
    FetchBanners();
    FetchAlerts();
    if (modules.filter((module: any, key: number) => module.alias === 'agendas').length > 0) {
      // FetchPrograms({ query: '', page: 1, screen: 'dashboard', id: 0, track_id: 0 });
    }
    if (modules.filter((module: any, key: number) => module.alias === 'speakers').length > 0) {
      FetchAttendees({ query: '', group_id: 0, page: 1, my_attendee_id: 0, speaker: 1, category_id: 0, screen: 'dashboard-my-speakers', program_id: 0 });
    }
  }, [modules.length]);

  return (
    <>
      {(in_array('poll-listing', processing) || in_array('dashboard-my-speakers', processing)) ? (
        <WebLoading />
      ) : (
        <>
         <Box w={'100%'} mb={3}>
           <MobileNavigation />
         </Box>
         
            <HStack display={['flex','none']} w={'100%'} space={'3'} justifyContent={'center'} flexDirection={'row'} alignItems={'center'}>
                  <Box h={'100%'} flex={1}>
                    <UpcomingPrograms />
                  </Box>
                  
                  {/* <Box minH={150}  flex={1}>
                    <UpcomingBlock 
                      px="3"
                      py="4"
                      h='150px'
                    title="NOTIFICATIONS" desc="Talk on w " location="" date="11-03-2022" time="11-00"  />
                </Box>*/}
            </HStack>  
              <BannerAds module_name={'dashboard'} module_type={'before_program'}/>
          {/*  */}
          {modules.filter((module: any, key: number) => module.alias === 'agendas').length > 0 ? (
            <IndexTemplatePrograms dashboard={true} />
          ) : <></>}
          {/*  */}
              <BannerAds module_name={'dashboard'} module_type={'after_program'}/>

              <BannerAds module_name={'dashboard'} module_type={'before_speaker'}/>
          {/*  */}
          {event.speaker_settings?.display_speaker_dashboard == 1 &&  my_attendees?.length > 0 ? (

            <Container mt={0} mb={4} overflow={'hidden'}  w="100%" maxW="100%">
               <HStack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} w="100%" maxW="100%"> 
              <IconWithLeftHeading icon={<DynamicIcon iconType={modules.find((module: Module) => module.alias === 'speakers')?.icon?.replace('@1x','').replace('-icon','').replace('-','_').replace('.png', '') || 'speakers'} iconProps={{ width: 27, height: 44 }} />} title={event?.labels.MEET_OUR_SPEAKERS ?? "MEET OUR SPEAKERS"} />
              {my_attendees?.length > 6 &&
                <Button onPress={() => {
                  push(`/${event.url}/speakers`)
                }} p="1" _text={{color: 'primary.text'}} _icon={{color: 'primary.text'}} _hover={{ bg: 'transparent', _text: { color: 'primary.500' }, _icon: { color: 'primary.500' } }} bg="transparent" width={'auto'} rightIcon={<Icon as={SimpleLineIcons} name="arrow-right" size="sm" />}>
                    {event.labels?.GENERAL_SEE_ALL ?? 'See all'}
                  </Button>
              }
              </HStack>
              <ScrollView w={[width - 30,'100%']} pb={2} overflowX={'auto'} >
                <HStack pt="0" space="2" alignItems="flex-start" justifyContent="flex-start">
                  {my_attendees.slice(0, 6).map((attendee: Attendee, k: number) => <VStack key={k} mx={2} alignItems="flex-start" w={['78']}>
                    <RoundedView attendee={attendee} />
                    <Text isTruncated pt="0" w="100%" textAlign="center" fontSize="md">{`${attendee?.first_name} ${attendee.field_settings?.last_name?.status === 1 ? attendee?.last_name : ''}`}</Text>
                  </VStack>)}
                </HStack>
              </ScrollView>
            </Container>
          ) : <></>}
          {/*  */}
              <BannerAds module_name={'dashboard'} module_type={'after_speaker'}/>

          {/*  */}
              <BannerAds module_name={'dashboard'} module_type={'before_polls'}/>
          {/*  */}
          {modules.find((m)=>(m.alias == 'polls')) && (event?.attendee_settings?.voting === 1 || response?.attendee_detail?.event_attendee?.allow_vote === 1) && (Object.keys(polls).length > 0) && (pollSettings?.display_poll == 1) &&  <PollListingByDate polls={polls} />}
              <BannerAds module_name={'dashboard'} module_type={'after_polls'}/>
          {/*  */}
              <BannerAds module_name={'dashboard'} module_type={'before_survey'}/>
          {/*  */}
          {(modules.find((m)=>(m.alias == 'survey'))) && (event?.attendee_settings?.voting === 1 || response?.attendee_detail?.event_attendee?.allow_vote === 1) && (surveys.length > 0) &&  (pollSettings?.display_survey == 1) && <SurveyListing surveys={surveys} />}
              <BannerAds module_name={'dashboard'} module_type={'after_survey'}/>
          {/*  */}
          {/* <HStack mb="3" space={1} justifyContent="center" w="100%">
            <Button onPress={() => setTab('qa')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab === 'qa' ? 'primary.darkbox' : 'primary.box'} w={event?.speaker_settings?.display_speaker_dashboard == 1 ? "50%" : "100%"} _text={{ fontWeight: '600' }}>Q & A</Button>
            {event?.speaker_settings?.display_speaker_dashboard == 1 && <Button onPress={() => setTab('speakerlist')} borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={tab === 'speakerlist' ? 'primary.darkbox' : 'primary.box'} w="50%" _text={{ fontWeight: '600' }}>SPEAKERS LIST</Button>}
          </HStack>

          <>
            {tab === 'qa' && (
              <QAListing />
            )}
            {tab === 'speakerlist' && (
              <SpeakerListing />
            )}
          </>

          <ChatClient /> */}
          <BannerAds module_name={'dashboard'} module_type={'before_news_update'}/>
          <>
            {
              loading ? (
                <WebLoading />
              ):(
                <>
                  {alert_setting && (alert_setting as any).display_in_dashboard === 1 && alerts.length > 0 &&
                  <Container mt={0} pt="0" maxW="100%" w="100%">
                    
                      <Box overflow="hidden" bg="primary.box" mb={4} pb={alerts.length > 3 ? 0 : 5}  w="100%" rounded="lg">
                      <HStack  pt="0" w="100%" space="3" alignItems="center">
                        <Text w={'100%'} pt={2} textAlign={'center'} fontSize="2xl">{modules?.find((alerts)=>(alerts.alias == 'alerts'))?.name ?? 'New & Updates'}</Text>
                      </HStack>
                        {alerts.slice(0, 3).map((alert:Alert, i:Number)=>(
                          <RectangleView id={alert.id} key={alert.id} title={alert.alert_detail.title} description={alert.alert_detail.description} date={alert.display_alert_date} time={alert.alert_time} is_last_item={(alerts.length-1 === i) ? true : false} is_read={alert.is_read} />
                        ))}
                        {alerts.length > 3 &&
                        <Center py="3" px="2" w="100%" alignItems="flex-end">
                          <Button onPress={() => {
                            push(`/${event.url}/alerts`)
                          }} p="1" _text={{color: 'primary.text'}} _icon={{color: 'primary.text'}} _hover={{ bg: 'transparent', _text: { color: 'primary.500' }, _icon: { color: 'primary.500' } }} bg="transparent" width={'auto'} rightIcon={<Icon as={SimpleLineIcons} name="arrow-right" size="sm" />}>
                            {event.labels?.GENERAL_SEE_ALL ?? ''}
                          </Button>
                        </Center>
                        }
                      </Box>
                      
                  </Container>
                  }
                </>
              )
            }
          </>
          <BannerAds module_name={'dashboard'} module_type={'after_news_update'}/>
            <HStack w={'100%'} pt="0" space="0" alignItems="flex-start" justifyContent="flex-start">
              <Text width={'100%'}>
                {custom_html.slice(0, 6).map((customHtmlItem: CustomHtml, k: number) => (
                  <VStack key={k} mx={0} width={'100%'} space={3}>
                    <Box w={'100%'} bg="primary.box" rounded="10px" p="3" >
                      <div className='ebs-iframe-content' dangerouslySetInnerHTML={{ __html: customHtmlItem?.custom_html_1 ?? '' }} />
                    </Box>
                    <Box w={'100%'} bg="primary.box" rounded="10px" p="3" >
                      <div className='ebs-iframe-content' dangerouslySetInnerHTML={{ __html: customHtmlItem?.custom_html_2 ?? '' }} />
                    </Box>
                    <Box w={'100%'} bg="primary.box" rounded="10px" p="3" >
                      <div className='ebs-iframe-content' dangerouslySetInnerHTML={{ __html: customHtmlItem?.custom_html_3 ?? '' }} />
                    </Box>
                  </VStack>
                ))}
              </Text>
            </HStack>
        </>

      )}
    </>
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;