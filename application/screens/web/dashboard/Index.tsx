import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Stream from 'application/components/organisms/programs/videos/Stream';
import UseProgramService from 'application/store/services/UseProgramService';
import SpeakerListing from 'application/components/organisms/speakers/Listing';
import QAListing from 'application/components/organisms/qa/Listing';
import ChatClient from 'application/components/organisms/chat/ChatClient';
import Master from 'application/screens/web/layouts/Master';
import { Button, Center, Container, HStack, Heading, Icon, ScrollView, Text, VStack, Spacer, Box, View,Spinner,Image } from 'native-base'
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
import { Platform, useWindowDimensions } from 'react-native';
import BannerAds from 'application/components/atoms/banners/BannerAds'
import { Alert } from 'application/models/alert/Alert'
import RectangleView from 'application/components/atoms/alerts/RectangleView'
import UseAlertService from 'application/store/services/UseAlertService'
import MobileNavigation from 'application/screens/web/layouts/MobileNavigation';
import UpcomingBlock from 'application/components/atoms/programs/UpcomingBlock';
import { Banner } from 'application/models/Banner'
import { Module } from 'application/models/Module';
import UpcomingPrograms from 'application/components/atoms/programs/UpcomingPrograms';
import Myexhibitors from 'application/screens/web/settings/myexhibitors/Index'
import Mysponsors from 'application/screens/web/settings/mysponsers/Index'
import IndexTemplatePrograms from 'application/components/templates/programs/web/Index';
import { CustomHtml } from 'application/models/CustomHtml'
import OurExhibitor from 'application/components/molecules/exhibitors/OurExhibitor';
import OurSponsor from 'application/components/molecules/sponsors/OurSponsor';
import SectionLoading from 'application/components/atoms/SectionLoading';
import { getColorScheme } from 'application/styles/colors';
import AsyncStorageClass from 'application/utils/AsyncStorageClass';
import UseMeetingReservationService from 'application/store/services/UseMeetingReservationService';
import { max } from 'lodash';
import UseCheckInOutService from 'application/store/services/UseCheckInOutService';
import { GroupedHistory, History } from 'application/models/checkInOut/CheckInOut'
import {GENERAL_DATE_FORMAT, GENERAL_DATETIME_FORMAT, GENERAL_TIME_FORMAT} from 'application/utils/Globals';
import moment from 'moment';
type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
  const RenderHtml = require('react-native-render-html').default;

  const [tab, setTab] = useState('qa');

  const { polls, pollSettings, FetchPolls ,poll_labels} = UsePollService();

  const { surveys, FetchSurveys } = UseSurveyService();

  const { event, modules,custom_html,event_url } = UseEventService();

  const { banners, FetchBanners } = UseBannerService();
  const { FetchAlerts, alerts, markAlertRead, alert_setting} = UseAlertService();
  const { loading } = UseLoadingService();
  const { FetchPrograms, programs, page, id, query, track_id, tracks, FetchTracks, track } = UseProgramService();

  const { FetchAttendees, attendees, my_attendees } = UseAttendeeService();

  const { processing } = UseLoadingService();

  const { response } = UseAuthService();

  const { push } = useRouter()
  const { width } = useWindowDimensions();
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
      const mixedStyle = {
        body: {
            fontFamily: 'Avenir',
            fontSize: '16px',
            userSelect: 'auto',
            color: colors.text
        },
        p: {
            fontFamily: 'Avenir',
        },
       
    }
  React.useEffect(() => {
    const showSurveys = event?.poll_settings?.display_survey_module;
    const showPolls = event?.poll_settings?.display_poll_module;

    if(showSurveys == 1){
      FetchSurveys();
    }
    if(showPolls == 1){
      FetchPolls();
    }
    FetchBanners();
    if (modules.filter((module: any, key: number) => module.alias === 'alerts').length > 0) {
      FetchAlerts();
    }
    if (modules.filter((module: any, key: number) => module.alias === 'agendas').length > 0) {
      // FetchPrograms({ query: '', page: 1, screen: 'dashboard', id: 0, track_id: 0 });
    }
    if (modules.filter((module: any, key: number) => module.alias === 'speakers').length > 0) {
      FetchAttendees({ query: '', group_id: 0, page: 1, my_attendee_id: 0, speaker: 1, category_id: 0, screen: 'dashboard-my-speakers', program_id: 0 });
    }
  }, [modules.length]);
   const name=modules?.find((module) => (module.alias == 'agendas'))?.name as string

  const { FetchAfterLoginMyMeetingRequests } = UseMeetingReservationService();
  function checkAppointmentAlerts() {
    const moduleActive=modules.filter((module: any, key: number) => module.alias === 'reservation').length > 0;
    if(!moduleActive){
      return;
    }
    let skipPendingAppointmentAlerts = false;
    if(Platform.OS === 'web'){
      skipPendingAppointmentAlerts= Boolean(localStorage.getItem(`skip_pending_appointment_alerts_${event_url}`));
    }else{
      skipPendingAppointmentAlerts= Boolean(AsyncStorageClass.getItem(`skip_pending_appointment_alerts_${event_url}`));
    }
    console.log('skipPendingAppointmentAlerts',skipPendingAppointmentAlerts);
    if(!skipPendingAppointmentAlerts){
      FetchAfterLoginMyMeetingRequests({});
    }
  }
const { FetchCheckInOut, checkInOut, SendQRCode, DoCheckInOut } = UseCheckInOutService();
React.useEffect(() => {
  FetchCheckInOut({ showLoading: true });
}, []); 
const module = modules.find((module) => module.alias === 'checkIn');
const [filteredHistory, setFilteredHistory] = React.useState<GroupedHistory[]>([]);
const [selectedDate, setSelectedDate] = React.useState(moment(event?.start_date, 'YYYY-MM-DD').format(GENERAL_DATE_FORMAT));
function setDefaultTab() {
  if (tab !== '') {
    return;
  }
  if (checkInOut?.setting?.show_event_checkin_history) {
    setTab('event');
  } else if (checkInOut?.setting?.show_programs_checkin_history) {
    setTab('program');
  } else if (checkInOut?.setting?.show_groups_checkin_history) {
    setTab('group');
  } else if (checkInOut?.setting?.show_tickets_checkin_history) {
    setTab('ticket');
  }
}
function filterHistory() {
  if (!tab || !selectedDate) return;
  const historyArray = checkInOut?.type_history[tab as keyof typeof checkInOut.type_history];
  const date = moment(selectedDate).format(GENERAL_DATE_FORMAT);

  if (historyArray) {
    const filtered = historyArray.filter((history: GroupedHistory) =>
      moment(history.log_date).format(GENERAL_DATE_FORMAT) === date
    );
    setFilteredHistory(filtered);
  } else {
    setFilteredHistory([]);
  }
}
React.useEffect(() => {
  setDefaultTab();
  filterHistory();
}, [checkInOut]);

React.useEffect(() => {
  filterHistory();
}, [tab]);
React.useEffect(() => {
  filterHistory(); 
}, [selectedDate]);


  React.useEffect(() => {
    checkAppointmentAlerts();
  }, []);

  return (
    <>
      {(in_array('poll-listing', processing) || in_array('dashboard-my-speakers', processing)) ? (
        <SectionLoading />
      ) : (
        <>
         
         {event?.dashboard_modules && event?.dashboard_modules?.length > 0 && event?.dashboard_modules.map((module: any, key: number) => {
            if(module.alias == 'shortcuts'){
                return (
                  <Box w={'100%'} mb={3}>
                    <MobileNavigation />
                  </Box>
                )

            }else if(module.alias == 'combine_agendas_my_agendas'){
              return (
                <>
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
                <IndexTemplatePrograms dashboard={true} />
                <BannerAds module_name={'dashboard'} module_type={'after_program'}/>
                </>
              )

            }else if(module.alias == 'speakers'){
              return (
                <>
                 <BannerAds module_name={'dashboard'} module_type={'before_speaker'}/>
                  {/*  */}
                  {my_attendees?.length > 0 ? (

                    <Container mt={0} mb={4} overflow={'hidden'}  w="100%" maxW="100%">
                      <HStack pr={3} mb={3} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} w="100%" maxW="100%"> 
                      <IconWithLeftHeading icon={<DynamicIcon iconType={modules.find((module: Module) => module.alias === 'speakers')?.icon?.replace('@1x','').replace('-icon','').replace('-','_').replace('.png', '') || 'speakers'} iconProps={{ width: 27, height: 44 }} />} title={event?.labels.MEET_OUR_SPEAKERS ?? "MEET OUR SPEAKERS"} />
                      {my_attendees?.length > 6 &&
                        <Button onPress={() => {
                          push(`/${event.url}/speakers`)
                        }} p="1" px={0} _text={{color: 'primary.text'}} _icon={{color: 'primary.text'}} _hover={{ bg: 'transparent', _text: { color: 'primary.500' }, _icon: { color: 'primary.500' } }} bg="transparent" width={'auto'} rightIcon={<Icon as={SimpleLineIcons} name="arrow-right" size="sm" />}>
                            {event.labels?.GENERAL_SEE_ALL ?? 'See all'}
                          </Button>
                      }
                      </HStack>
                      <ScrollView w={[width - 30,'100%']} pb={2} overflowX={'auto'} >
                        <HStack pt="0" space="2" alignItems="flex-start" justifyContent="flex-start">
                          {my_attendees.slice(0, 6).map((attendee: Attendee, k: number) => <VStack key={k} mx={2} alignItems="flex-start" w={[width/3 - 30,'78']}>
                            <RoundedView attendee={attendee} />
                            <Text isTruncated pt="0" w="100%" textAlign="center" fontSize="md">{`${attendee?.first_name} ${attendee.field_settings?.last_name?.status === 1 ? attendee?.last_name : ''}`}</Text>
                          </VStack>)}
                        </HStack>
                      </ScrollView>
                    </Container>
                  ) : <></>}
                  {/*  */}
                <BannerAds module_name={'dashboard'} module_type={'after_speaker'}/>
                </>
              )

            }else if(module.alias == 'polls'){
              return (
                <>
                <BannerAds module_name={'dashboard'} module_type={'before_polls'}/>
                {modules.find((m)=>(m.alias == 'polls')) && (event?.attendee_settings?.voting === 1 || response?.attendee_detail?.event_attendee?.allow_vote === 1) && (Object.keys(polls).length > 0) &&  <PollListingByDate polls={polls} />}
                <BannerAds module_name={'dashboard'} module_type={'after_polls'}/>
                </>
              )

            }else if(module.alias == 'surveys'){
              return (
                <>
                <BannerAds module_name={'dashboard'} module_type={'before_survey'}/>
                {(modules.find((m)=>(m.alias == 'survey'))) && (event?.attendee_settings?.voting === 1 || response?.attendee_detail?.event_attendee?.allow_vote === 1) && (surveys.length > 0) && <SurveyListing surveys={surveys} />}
                <BannerAds module_name={'dashboard'} module_type={'after_survey'}/>
                </>
              )
              
            }else if(module.alias == 'alerts'){
              return (
                <>
                <BannerAds module_name={'dashboard'} module_type={'before_news_update'}/>
                <>
                  {
                    loading ? (
                      <WebLoading />
                    ):(
                      <>
                        {alerts.length > 0 &&
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
                </>
              )
            }else if(module.alias == 'custom_html_1' && custom_html[0]?.custom_html_1?.status == 1 && custom_html[0]?.custom_html_1?.content){
              return (
                <HStack w={'100%'} mb={3} pt="0" space="0" alignItems="flex-start" justifyContent="flex-start">
                  <Text width={'100%'} mt={2}>
                      <VStack  mx={0} width={'100%'} space={3}>
                        <Box w={'100%'} bg="primary.box" rounded="10px" p="3" pt={[3,0]} overflow={'hidden'} >
                          <RenderHtml
                              defaultTextProps={{selectable:true}}
                              contentWidth={width > 600 ? 600 : width - 60}
                              systemFonts={['Avenir']}
                              tagsStyles={mixedStyle}
                              source={{ html: custom_html[0]?.custom_html_1?.content ?? '' }}
                          />
                        </Box>
                      </VStack>
                  </Text>
                </HStack>
              )
            }else if(module.alias == 'custom_html_2' && custom_html[0]?.custom_html_2?.status && custom_html[0]?.custom_html_2?.content){
              return (
                <HStack w={'100%'} mb={3} pt="0" space="0" alignItems="flex-start" justifyContent="flex-start">
                  <Text width={'100%'} mt={2}>
                      <VStack  mx={0} width={'100%'} space={3}>
                        <Box w={'100%'} bg="primary.box" rounded="10px" p="3" pt={[3,0]} overflow={'hidden'} >
                          <RenderHtml
                              defaultTextProps={{selectable:true}}
                              contentWidth={width > 600 ? 600 : width - 60}
                              systemFonts={['Avenir']}
                              tagsStyles={mixedStyle}
                              source={{ html: custom_html[0]?.custom_html_2?.content ?? '' }}
                          />
                        </Box>
                      </VStack>
                  </Text>
                </HStack>
              )
            }else if(module.alias == 'custom_html_3' && custom_html[0]?.custom_html_3?.status == 1 && custom_html[0]?.custom_html_3?.content){
              return (
                <HStack w={'100%'} mb={3} pt="0" space="0" alignItems="flex-start" justifyContent="flex-start">
                  <Text width={'100%'} mt={2}>
                      <VStack mx={0} width={'100%'} space={3}>
                        <Box w={'100%'} bg="primary.box" rounded="10px" p="3" pt={[3,0]} overflow={'hidden'} >
                          <RenderHtml
                              defaultTextProps={{selectable:true}}
                              contentWidth={width > 600 ? 600 : width - 60}
                              systemFonts={['Avenir']}
                              tagsStyles={mixedStyle}
                              source={{ html: custom_html[0]?.custom_html_3?.content ?? '' }}
                          />
                        </Box>
                      </VStack>
                  </Text>
                </HStack>
              )
            }
            else if (module.alias === 'qr_code') {
                  return (
                    <>
                      {loading ? (
                        <WebLoading />
                      ) : (
                        <>
                        <Text mb="0" fontSize="2xl">{modules?.find((checkin)=>(checkin.alias == 'checkIn'))?.name ?? ""}</Text>
								        <Spacer />
                            <Container mb={3} pt="1" maxW="100%" w="100%">
                              {(checkInOut?.setting?.show_qrcode || checkInOut?.setting?.self_checkin) && (
                                
                                <Box mb="3" w="100%" bg="primary.box" p="5" rounded="10">
                                  {checkInOut?.setting?.show_qrcode && (
                                    <Box mx="auto" w="190px" h="190px" bg="primary.box" p="3" rounded="10">
                                      <Image
                                        source={{ uri: checkInOut?.qrCodeImgSrc }}
                                        alt="QR Code"
                                        w="164px"
                                        h="164px"
                                        rounded="10"
                                      />
                                    </Box>
                                  )}
                                  
                                  {checkInOut?.setting?.self_checkin && (
                                    <HStack space="0" alignItems="center" justifyContent="center" pt={4}>
                                      <Button
                                        px={4}
                                        py={2}
                                        shadow={3}
                                        colorScheme="primary"
                                        minW={190}
                                        onPress={() => {
                                          DoCheckInOut({
                                            attendee_id: response.data.user.id,
                                            organizer_id: event.organizer_id!,
                                            action: "attendee-checkin"
                                          });
                                        }}
                                        isDisabled={in_array('checking-in-out', processing)}
                                      >
                                        <Text fontSize="xl" color="primary.hovercolor" fontWeight={600}>
                                          {checkInOut?.status === 'check-in'
                                            ? event?.labels?.CHECK_IN_BUTTON
                                            : event?.labels?.CHECK_OUT_BUTTON}
                                        </Text>
                                      </Button>
                                    </HStack>
                                  )}
                                </Box>
                              )}
                            </Container>
                        </>
                      )}
                    </>
                  );
                }


          }) // end loop dashboard_modules

         }

             

          
         
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
          
        </>

      )}
      <Box alignItems="center" mt={1} display={['','none']} width={'100%'} flexDirection={'column'}>
            {event?.exhibitor_settings?.show_on_native_app_dashboard == 1 ? <OurExhibitor expand={true} />: null}
            {event?.sponsor_settings?.show_on_native_app_dashboard == 1 ? <OurSponsor expand={true} />: null}
      </Box>
    </>
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;