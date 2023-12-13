import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, Image, Divider, ZStack, Pressable } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseProgramService from 'application/store/services/UseProgramService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import moment from 'moment'
import { useRouter } from 'solito/router';
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
        <Image
            alt="Alternate Text"
            size="full"
            w="100%"
            h="160px"
            rounded="10"
            mb="5"
            source={{ uri: `https://wallpaperaccess.com/full/31751.jpg` }}
        />
        <Box w="100%" px="5">
            <HStack w="100%" mb="3" space="3" alignItems="flex-start">
                <Text maxW="80%" fontSize="xl">{detail?.program?.topic}</Text>
                <Spacer />
                {(event?.agenda_settings?.qa == 1 || detail?.program?.qa == 1) && <Pressable
                        onPress={() => {
                            push(`/${event.url}/qa/detail/${detail?.program?.id}`)
                        }}>

                            <DynamicIcon iconType="qa" iconProps={{ width: 25, height: 24 }} />
                        </Pressable>
                }
            </HStack>
            <HStack w="100%" mb="3" space="10" alignItems="center">
                {detail?.program?.start_time && detail?.program?.end_time  && event.agenda_settings?.agenda_display_time == 1 && detail?.program?.hide_time == 0 && (
                    <Text fontSize="md">{moment(`${detail?.program?.date} ${detail?.program?.start_time}`).format('HH:mm')} - {moment(`${detail?.program?.date} ${detail?.program?.start_time}`).format('HH:mm')}</Text>
                )}
                {detail?.program?.location && (
                    <HStack space="3" alignItems="center">
                        <Icon color="primary.text" size="md" as={Ionicons} name="ios-location-sharp" />
                        <Text pt="2px" fontSize="md">{detail?.program?.location}</Text>
                    </HStack>
                )}
            </HStack>
             <Box mb="4" w="100%">
             {event?.agenda_settings?.show_tracks == 1 && <>
                    <Box position="absolute" left="0" top="0" w="15px" marginLeft={'-20px'}>
                        <ZStack>
                        {detail?.program?.program_tracks!?.length > 0 && detail?.program?.program_tracks!.map((track: any, i: number) =>
                            <Box key={i} bg={track.color ? track.color : '#fff'} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                        )}
                        </ZStack>
                    </Box>
                    {detail?.program?.program_tracks!?.length > 0 && (
                        <>
                            <Text mb="3" fontSize="md">Track:
                                {detail?.program?.program_tracks?.map((track: any, key: number) =>
                                    <>{`${track?.name}, `}</>
                                )}
                            </Text>
                            <Divider mb="4" bg="primary.text" />
                        </>
                    )}
                </>}
                {detail?.program_tabs_settings!?.filter((tab: any, key: number) => tab?.tab_name === 'description' && tab?.status === 1)?.length > 0 && (
                    {children}
                )}
            </Box>
        </Box>
    </Container>;
};

export default DetailBlock