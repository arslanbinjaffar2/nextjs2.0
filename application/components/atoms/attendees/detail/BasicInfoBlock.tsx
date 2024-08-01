import React from 'react'
import Icoribbon from 'application/assets/icons/Icoribbon';
import Icochat from 'application/assets/icons/chat';
import Icoresume from 'application/assets/icons/Icoresume';
import Icohotelbed from 'application/assets/icons/Icohotelbed';
import IcoClipboard from 'application/assets/icons/small/IcoClipboard';
import { Box, Center, Container, HStack, Spacer, Text, VStack, Avatar, Image, Pressable, IconButton, Tooltip, Button } from 'native-base';
import { Detail } from 'application/models/attendee/Detail';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import UseEventService from 'application/store/services/UseEventService';
import { Linking } from 'react-native';
import { useRouter } from 'solito/router';
import UseAuthService from 'application/store/services/UseAuthService';
import Icobookmeeting from 'application/assets/icons/Icobookmeeting';
import { func } from 'application/styles';


type AppProps = {
    detail: Detail,
    showPrivate: number,
    speaker: number
}

const BasicInfoBlock = ({ detail, showPrivate, speaker }: AppProps) => {

    const { _env } = UseEnvService()
    const { response } = UseAuthService();
    const { MakeFavourite } = UseAttendeeService();
    const router = useRouter()

    const { event, modules } = UseEventService();

    const [isReservationModuleOn] = React.useState<boolean>(
        modules.filter((module: any) => module?.alias === 'reservation').length > 0 ? true : false
    );

    const [isAppointmentTabEnabled] = React.useState<boolean>(
        event?.attendee_tab_settings?.filter((tab: any) => tab?.tab_name === 'appointment' && Number(tab?.status) === 1).length > 0 ? true : false
    );

    const { push } = useRouter();

    const isPrivate = detail?.sort_field_setting?.reduce((ack: any, s: any) => ({ ...ack, [s.name]: s.is_private }), {});
    const allowedFields = detail?.sort_field_setting?.reduce((ack: any, s: any) => ({ ...ack, [s.name]: s }), {});

    const [isFav, setIsFav] = React.useState<boolean>(false);

    React.useMemo(() => {
        setIsFav(detail?.is_favourite == 1 ? true : false)
    }, [detail?.is_favourite])

    function toggleFav() {
        setIsFav(!isFav);
        MakeFavourite({ attendee_id: Number(detail?.detail?.id), screen: 'detail' })
    }

    function handleRegistrationPress() {
        router.push(`/${event.url}/attendees/my-registration/${response?.data?.user?.id}`)
    }

    const attendeeCanBookMeetingWithSpeaker = React.useMemo(() => {
        if (detail?.detail?.current_event_attendee?.speaker === '1') {
          return event?.speaker_settings?.attendee_can_book_meeting_with_speaker === 1;
        } else {
          return true;
        }
      }, [detail?.detail?.current_event_attendee?.speaker, event?.speaker_settings?.attendee_can_book_meeting_with_speaker]);

      const attendeeCanChat = React.useMemo(() => {
        const chat_module_on = modules.filter((module: any) => module?.alias === 'chat').length > 0 ? true : false
        if (detail?.detail?.current_event_attendee?.speaker === '1') {
          return chat_module_on && event?.speaker_settings?.chat === 1 ;
        } else {
          return chat_module_on;
        }
      }, [detail?.detail?.current_event_attendee?.speaker, event?.speaker_settings?.attendee_can_book_meeting_with_speaker]);
 
    return (
        <Box mb={3} bg="primary.box" p="0" w={'100%'} rounded="10">
            <Container borderWidth="0" borderColor="primary.darkbox" bg="primary.primarycolor" rounded="10" overflow="hidden" maxW="100%" w="100%">
                <Box w="100%" p="4" py="5" rounded="10">
                    <HStack mb="4" space="5" alignItems={'center'}>
                        {detail?.detail?.image && isPrivate.profile_picture === 0 ? (
                            <Image rounded="25" size="lg" borderWidth="0" borderColor="primary.darkbox" source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${detail?.detail?.image}` }} alt="" w="50px" h="50px" />
                        ) : (
                            <Avatar
                                borderWidth={0}
                                borderColor="primary.darkbox"
                                textTransform="uppercase"
                                bg={'#A5A5A5'}
                            >{detail?.detail?.first_name && detail?.detail?.last_name ? detail?.detail?.first_name?.substring(0, 1) + detail?.detail?.last_name?.substring(0, 1) : detail?.detail?.first_name?.substring(0, 1)}</Avatar>
                        )}
                        <VStack w="calc(100% - 200px)" space="0">
                            <Text lineHeight="sm" fontSize="xl">
                                {`${detail?.detail?.first_name}`} {detail?.sort_field_setting.find((s: any) => (s.name === 'last_name')) && detail?.detail?.last_name}
                            </Text>
                            {detail?.detail?.info &&
                                (detail?.detail?.info.department ||
                                    detail?.detail?.info.title) &&
                                (showPrivate == 1 || (isPrivate?.title == 0 || isPrivate?.department == 0 || isPrivate?.company_name == 0))
                                && (
                                    <>
                                        <Text lineHeight="22px" fontSize="lg">{detail?.detail?.info?.title && (
                                            <>
                                                {`${detail?.detail?.info?.title}`}
                                                {detail?.detail?.info?.department || detail?.detail?.info?.company_name ? ', ' : ''}
                                            </>
                                        )}
                                            {detail?.detail?.info?.department && (
                                                <>
                                                    {`${detail?.detail?.info?.department}`}
                                                    {detail?.detail?.info?.company_name ? ', ' : ''}
                                                </>
                                            )}
                                            {detail?.detail?.info?.company_name && (
                                                <>
                                                    {`${detail?.detail?.info?.company_name}`}
                                                </>
                                            )}</Text>

                                    </>
                                )}
                        </VStack>
                        <Spacer />
                        <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                            {attendeeCanChat && <IconButton
                                    variant="transparent"
                                    px="3"
                                    onPress={() => { push(`/${event.url}/chat/new/${detail?.detail?.id}`) }}
                                    icon={<Icochat width="20" height="28"/>}
                            />}
                            {speaker == 0 && event.attendee_settings?.mark_favorite == 1 && (
                                <Pressable onPress={() => { toggleFav() }}>
                                    <Icoribbon width="20" height="28" color={isFav ? event?.settings?.secondary_color : ''} />
                                </Pressable>
                            )}

                            {speaker === 0 &&
                                detail?.hasOrderItems &&
                                event?.attendee_settings?.display_registration_invoice == 1 &&
                                detail?.detail?.id === response?.attendee_detail?.id ? (
                                <IconButton
                                    variant="transparent"
                                    p="2"
                                    onPress={() => { handleRegistrationPress() }}
                                    icon={<IcoClipboard width={28} height={28} />}
                                />
                            ) : null}
                        </Box>
                    </HStack>
                    <HStack w="100%" space="0">
                        {detail?.sort_field_setting && detail.sort_field_setting.find((setting: any) => setting.name === 'initial' && (showPrivate == 1 || setting.is_private == 0) && detail?.detail?.info?.initial) && (
                            <Center alignItems="flex-start" pl="0" w="33.33%">
                                <VStack space="0">
                                    <Text lineHeight="sm" fontSize="md">{detail?.sort_field_labels?.initial}</Text>
                                    <Text lineHeight="sm" fontSize="md">{detail?.detail?.info?.initial}</Text>
                                </VStack>
                            </Center>
                        )}
                        {detail?.sort_field_setting && detail.sort_field_setting.find((setting: any) => setting.name === 'delegate_number' && (showPrivate == 1 || setting.is_private == 0) && detail?.detail?.info?.delegate_number) && (
                            <Center borderLeftWidth={detail?.detail?.info?.initial ? 1 : 0} borderColor="primary.bordercolor" alignItems="flex-start" pl={detail?.detail?.info?.initial ? ['3', '8'] : 0} w="33.33%">
                                <VStack space="0">
                                    <Text lineHeight="sm" fontSize="md">{detail?.sort_field_labels?.delegate} </Text>
                                    <Text lineHeight="sm" fontSize="md">{detail?.detail?.info?.delegate_number}</Text>
                                </VStack>
                            </Center>
                        )}
                        {detail?.sort_field_setting && detail.sort_field_setting.find((setting: any) => setting.name === 'table_number' && (showPrivate == 1 || setting.is_private == 0) && detail?.detail?.info?.table_number!) && (
                            <Center borderLeftWidth={detail?.detail?.info?.initial || detail?.detail?.info?.delegate_number ? 1 : 0} borderColor="primary.bordercolor" alignItems="flex-start" pl={detail?.detail?.info?.initial || detail?.detail?.info?.delegate_number ? ['3', '8'] : 0} w="33.33%">
                                <VStack space="0">
                                    <Text lineHeight="sm" fontSize="md">{detail?.sort_field_labels?.table_number}</Text>
                                    <Text lineHeight="sm" fontSize="md">{detail?.detail?.info?.table_number}</Text>
                                </VStack>
                            </Center>
                        )}
                    </HStack>
                </Box>

                {(allowedFields?.resume !== undefined && allowedFields?.resume && (showPrivate == 1 || isPrivate?.resume == 0) && detail?.detail?.attendee_cv && (speaker == 0 || speaker == 1 || detail?.speaker_setting.resume == 1)) ||
                    (showPrivate == 1 && (detail?.show_hotel_management == 1 || detail?.show_hotels == 1)) ||
                    (isReservationModuleOn && isAppointmentTabEnabled && attendeeCanBookMeetingWithSpeaker && response?.data?.user?.id !== detail?.detail?.id) ? (
                    <HStack w="100%" bg="primary.secondary" p="2" pl={5} mt={3} borderTopWidth="1" borderColor="primary.darkbox">
                        <HStack width={'calc(100% - 120px)'} space="5">
                            {allowedFields?.resume !== undefined && allowedFields?.resume && (showPrivate == 1 || isPrivate?.resume == 0) && detail?.detail?.attendee_cv && (speaker == 0 || speaker == 1 || detail?.speaker_setting.resume == 1) && (
                                <Center w="20%" borderRightWidth={showPrivate == 1 && (detail?.show_hotel_management == 1 || detail?.show_hotels == 1) ? '1' : '0'} borderColor={'primary.bordersecondary'} alignItems="flex-start">
                                    <Pressable
                                        onPress={async () => {
                                            const url: any = `${_env.eventcenter_base_url}/assets/attendees/cv/${detail?.detail?.attendee_cv}`;
                                            const supported = await Linking.canOpenURL(url);
                                            if (supported) {
                                                await Linking.openURL(url);
                                            }
                                        }}>
                                        <Icoresume color={func.colorType(event?.settings?.secondary_color)} width="22" height="25" />
                                    </Pressable>
                                </Center>
                            )}
                            {showPrivate == 1 && (detail?.show_hotel_management == 1 || detail?.show_hotels == 1) && (
                                <Center w="20%" borderColor="primary.bordersecondary" alignItems={(allowedFields?.resume !== undefined && allowedFields?.resume && detail?.detail?.attendee_cv) ? 'center' : "flex-start"}>
                                    <Pressable
                                        onPress={async () => {
                                            push(`/${event.url}/attendees/hotel/${detail?.detail?.id}`)
                                        }}>
                                        <Icohotelbed color={func.colorType(event?.settings?.secondary_color)} width="24" height="18" />
                                    </Pressable>
                                </Center>
                            )}
                        </HStack>
                        <Spacer />
                        {console.log('enab:', isAppointmentTabEnabled)}
                        {isReservationModuleOn && isAppointmentTabEnabled && attendeeCanBookMeetingWithSpeaker && response?.data?.user?.id !== detail?.detail?.id && (
                            <Button
                                py={2}
                                maxWidth={'120px'}
                                colorScheme="primary"
                                onPress={() => { push(`/${event.url}/reservation/${detail?.detail?.id}`) }}>
                                <Text textAlign="center" isTruncated width="95px">{event?.labels?.RESERVATION_BOOK_MEETING_LABEL}</Text>
                            </Button>
                        )}
                    </HStack>
                ) : null}



            </Container>
        </Box>
    )

}

export default BasicInfoBlock