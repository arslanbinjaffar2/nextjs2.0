import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, Image, Divider, ZStack, Pressable, View } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseProgramService from 'application/store/services/UseProgramService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import moment from 'moment'
import { useRouter } from 'solito/router';
import { colorText } from 'application/styles/colors';
import FavProgramToggle from 'application/components/atoms/programs/FavProgramToggle';
type AppProps = {
    children:
    | JSX.Element
    | JSX.Element[]
    | string
    | string[];
}

const DetailBlock = ({ children }: AppProps) => {

    const { detail } = UseProgramService();
    
    const { event } = UseEventService();

    const { _env } = UseEnvService()
    
    const { push } = useRouter()

    return <Container mb="3" mt="5" maxW="100%" w="100%" bg="primary.box" rounded="10">
        {detail?.program?.image && <Image
            alt=""
            size="full"
            w="100%"
            h="160px"
            roundedTop="10"
            mb="0"
            source={{ uri: `${_env.eventcenter_base_url}/assets/programs/${detail?.program?.image}` }}
        />}
        <Box w="100%" pt={4} px="4">
            <HStack w="100%" mb="3" space="3" alignItems="flex-start">
                <Text maxW="100%" fontSize="xl">{detail?.program?.topic}</Text>
                 <Spacer />
                   {detail?.program?.videos?.length ? (
                        <Icon size="xl" as={Ionicons} name="ios-videocam-outline" color="primary.text" />
                    ) : null}
                    {event?.agenda_settings?.admin_fav_attendee == 1 && detail?.program?.is_attatched_with_subregistration !== 1 &&
                        detail?.program?.id !== undefined && (
                            <FavProgramToggle program_id={detail.program.id} key={detail.program.id} />
                        )}
            </HStack>
            <HStack w="100%" mb="3" space={'2'} alignItems="center" justifyContent={'space-between'}>
                {detail?.program?.start_time && detail?.program?.end_time  && event.agenda_settings?.agenda_display_time == 1 && detail?.program?.hide_time == 0 && (
                    <Text fontSize="md" width={'20%'}>{moment(`${detail?.program?.date} ${detail?.program?.start_time}`).format('HH:mm')} - {moment(`${detail?.program?.date} ${detail?.program?.end_time}`).format('HH:mm')}</Text>
                )}
                {detail?.program?.location && (
                    <HStack space="2" alignItems="center" width={'80%'} >
                        <Icon color="primary.text" size="md" as={Ionicons} name="ios-location-sharp" />
                        <Text pt="2px" fontSize="md"  textBreakStrategy='balanced'  >{detail?.program?.location}</Text>
                    </HStack>
                )}
            </HStack>
             <Box mb="4" w="100%">
             {event?.agenda_settings?.show_tracks == 1 && <>
                    {detail?.program?.program_tracks!?.length > 0 && (
                        <>
                           <View flexDirection={'row'} mb={'3'} alignItems={'center'}>                     
                            <Text  fontSize="md" alignSelf={'start'} mt={'4px'}>
                                Track:
                                </Text>
                                <Box flexDirection={'row'} flexWrap={'wrap'} width={'calc(100% - 30px)'} alignItems={'center'}>
                                {detail?.program?.program_tracks?.map((track: any, key: number) =>(
                                    <Text  color={colorText(track.color ? track.color : event.settings?.primary_color)} rounded={'full'} mx={1} my={1} px={3} 
                                    bg={track.color ? track.color : event.settings?.primary_color} key={key}>
                                            {`${track?.name}`}
                                            
                                            </Text>
                                    
                                ))}
                                
                                </Box>
                                
                           </View>

                            {detail?.program_tabs_settings!?.filter((tab: any, key: number) => tab?.tab_name === 'description' && tab?.status === 1)?.length > 0 && children !==  '' && <Divider mb="4" bg="primary.text" />}
                        </>
                    )}
                </>}
                {detail?.program_tabs_settings!?.filter((tab: any, key: number) => tab?.tab_name === 'description' && tab?.status === 1)?.length > 0 && (
                    children
                )}
            </Box>
        </Box>
    </Container>;
};

export default DetailBlock