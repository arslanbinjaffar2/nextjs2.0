import React from 'react'
import Icoribbon from 'application/assets/icons/Icoribbon';
import Icoresume from 'application/assets/icons/Icoresume';
import Icohotelbed from 'application/assets/icons/Icohotelbed';
import IcoClipboard from 'application/assets/icons/small/IcoClipboard';
import { Box, Center, Container, HStack, Spacer, Text, VStack, Avatar, Image, Pressable, IconButton } from 'native-base';
import { Detail } from 'application/models/attendee/Detail';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import UseEventService from 'application/store/services/UseEventService';
import { Linking } from 'react-native';
import { useRouter } from 'solito/router';
import UserPlaceholderImage from 'application/assets/images/user-placeholder.jpg';
import AvatarColors from 'application/utils/AvatarColors'
import UseAuthService from 'application/store/services/UseAuthService';


type AppProps = {
    detail: Detail,
    showPrivate:number,
    speaker:number
}

const BasicInfoBlock = ({ detail, showPrivate, speaker }: AppProps) => {

    const { _env } = UseEnvService()
    const { response } = UseAuthService();
    const { MakeFavourite } = UseAttendeeService();
    const router = useRouter()

    const { event } = UseEventService();

    const { push } = useRouter();

    const isPrivate = detail?.sort_field_setting?.reduce((ack:any, s:any)=>({...ack, [s.name]:s.is_private}),{});
    console.log(showPrivate == 1 && (detail?.show_hotel_management == 1 || detail?.show_hotels == 1), 'show_hotel')

    const [isFav, setIsFav] = React.useState<boolean>(false);

    React.useMemo(() => {
        setIsFav(detail?.is_favourite == 1 ? true : false)
    }, [detail?.is_favourite])

    function toggleFav () {
        setIsFav(!isFav);
        MakeFavourite({ attendee_id: Number(detail?.detail?.id), screen: 'detail' })
    }

    function handleRegistrationPress(){
        console.log("🚀 ~ handleRegistrationPress ~ router:", router)
        router.push(`/${event.url}/attendees/my-registration/${response?.data?.user?.id}`)
    }

    return (
        <Box mb={3} bg="primary.box" p="0" w={'100%'} rounded="10">
            <Container borderWidth="0" borderColor="primary.darkbox" bg="primary.primarycolor" rounded="10" overflow="hidden" maxW="100%" w="100%">
                <Box w="100%" p="4" py="5" rounded="10">
                    <HStack mb="4" space="5">
                        {detail?.detail?.image && isPrivate.profile_picture === 0 ? (
                        <Image rounded="25" size="lg" borderWidth="0" borderColor="primary.darkbox" source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${detail?.detail?.image}` }} alt="" w="50px" h="50px" />
                        ) : (
                          <Avatar
                            borderWidth={0}
                            borderColor="primary.darkbox"
                            textTransform="uppercase"
                            bg={'#A5A5A5'}
                          >{ detail?.detail?.first_name && detail?.detail?.last_name ? detail?.detail?.first_name?.substring(0,1) + detail?.detail?.last_name?.substring(0,1) : detail?.detail?.first_name?.substring(0,1)}</Avatar>
                        )}
                        <VStack w="calc(100% - 160px)" space="0">
                            <Text lineHeight="sm" fontSize="xl">
                                {`${detail?.detail?.first_name} ${detail?.detail?.last_name}`}
                            </Text>
                            {detail?.detail?.info &&
                                (detail?.detail?.info.company_name ||
                                    detail?.detail?.info.title) &&
                                    (showPrivate == 1 || (isPrivate?.title == 0 || isPrivate?.company_name == 0))
                                    && (
                                    <>
                                            <Text lineHeight="22px" fontSize="lg">{detail?.detail?.info?.title}&nbsp;{detail?.detail?.info?.company_name &&
                                                detail?.detail?.info?.title &&
                                                ", "}
                                                {detail?.detail?.info?.company_name && detail?.detail?.info?.company_name}</Text>

                                    </>
                                )}
                            {(showPrivate == 1 || isPrivate?.department == 0) && detail?.detail?.info?.department && (
                                <Text lineHeight="sm" fontSize="18px">{detail?.detail?.info?.department}</Text>
                            )}
                        </VStack>
                        <Spacer />
                        <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                            
                            {speaker == 0 && event.attendee_settings?.mark_favorite == 1 && (
                                <Pressable onPress={() => { toggleFav() }}>
                                    <Icoribbon width={"20"} height="28" color={isFav ? event?.settings?.secondary_color : ''} />
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
                                        icon={<IcoClipboard width={28} height={28}/>}
                                    />
                            ) : null }
                        </Box>
                    </HStack>
                    <HStack w="100%" space="0">
                        {(showPrivate == 1 || isPrivate?.initial == 0) && detail?.detail?.info?.initial && (
                            <Center alignItems="flex-start" pl="0" w="33.33%">
                                <VStack space="0">
                                    <Text lineHeight="sm" fontSize="md">Initials</Text>
                                    <Text lineHeight="sm" fontSize="md">{detail?.detail?.info?.initial}</Text>
                                </VStack>
                            </Center>
                        )}
                        {(showPrivate == 1 || isPrivate?.delegate_number == 0) && detail?.detail?.info?.delegate_number && (
                            <Center borderLeftWidth={detail?.detail?.info?.initial ? 1 : 0} borderColor="primary.bordercolor" alignItems="flex-start" pl={detail?.detail?.info?.initial ? ['3','8'] : 0} w="33.33%">
                                <VStack space="0">
                                    <Text lineHeight="sm" fontSize="md">Delegate nr:</Text>
                                    <Text lineHeight="sm" fontSize="md">{detail?.detail?.info?.delegate_number}</Text>
                                </VStack>
                            </Center>
                        )}
                        {(showPrivate == 1 || isPrivate?.table_number == 0) && detail?.detail?.info?.table_number && (
                            <Center borderLeftWidth={detail?.detail?.info?.initial || detail?.detail?.info?.delegate_number  ? 1 : 0} borderColor="primary.bordercolor"alignItems="flex-start" pl={detail?.detail?.info?.initial || detail?.detail?.info?.delegate_number ? ['3','8'] : 0} w="33.33%">
                                <VStack space="0">
                                    <Text lineHeight="sm" fontSize="md">Table nr:</Text>
                                    <Text lineHeight="sm" fontSize="md">{detail?.detail?.info?.table_number}</Text>
                                </VStack>
                            </Center>
                        )}
                    </HStack>
                </Box>
                {detail?.detail?.attendee_cv && (
                <Box w="100%" bg="primary.secondary" px="5" mt={3} py="3" borderTopWidth="1" borderColor="primary.darkbox">
                <HStack w="100%" space="0">
                    {(showPrivate == 1 || isPrivate?.resume == 0) && detail?.detail?.attendee_cv && (speaker == 0 || speaker == 1 || detail?.speaker_setting.resume == 1) && <Center w="20%" borderRightWidth={showPrivate == 1 && (detail?.show_hotel_management == 1 || detail?.show_hotels == 1) ? '1' : '0'} borderColor={'primary.box'} alignItems="flex-start"><Pressable
                            onPress={async () => {
                                const url: any = `${_env.eventcenter_base_url}/assets/attendees/cv/${detail?.detail?.attendee_cv}`;
                                const supported = await Linking.canOpenURL(url);
                                if (supported) {
                                    await Linking.openURL(url);
                                }
                        }}>
                            <Icoresume width="22" height="25" />
                        </Pressable>
                    </Center>}
                    </HStack>
                </Box>
                )}
                {showPrivate == 1 && (detail?.show_hotel_management == 1 || detail?.show_hotels == 1) && <Center w="20%"  borderColor="primary.bordercolor" alignItems="center">
                        <Pressable
                                onPress={async () => {
                                    push(`/${event.url}/attendees/hotel/${detail?.detail?.id}`)
                        }}>
                            <Icohotelbed width="24" height="18" />
                        </Pressable>
                    </Center>}
            </Container>
        </Box>
    )

}

export default BasicInfoBlock