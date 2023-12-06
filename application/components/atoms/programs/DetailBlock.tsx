import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, Image, Divider } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseProgramService from 'application/store/services/UseProgramService';
import UseEnvService from 'application/store/services/UseEnvService';
import UseEventService from 'application/store/services/UseEventService';
import moment from 'moment'
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
                <DynamicIcon iconType="checkIn" iconProps={{ width: 25, height: 24 }} />
            </HStack>
            <HStack w="100%" mb="3" space="10" alignItems="center">
                {detail?.program?.start_time && detail?.program?.end_time  && event.agenda_settings?.agenda_display_time == 1 && (
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
                {children}
            </Box>
        </Box>
    </Container>;
};

export default DetailBlock