import React from 'react'
import { Box, HStack, Text, ZStack, Center, Spacer, Icon, Pressable } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';
import UseProgramService from 'application/store/services/UseProgramService';

type AppProps = {
    track: any,
    border: boolean,
    updateTab: (tab: string) => void
}

const RectangleDetailView = ({ track, border, updateTab }: AppProps) => {

    const { FetchTracks, FetchPrograms } = UseProgramService();

    return <Box w="100%" key={track.id} borderBottomWidth={border ? 1 : 0} borderColor="primary.text" py="3">
        <Pressable onPress={() => {
            if (track?.parent_id == 0) {
                updateTab('track');
                FetchTracks({ page: 1, query: '', screen: 'track', track_id: track.id });
            } else {
                updateTab('track-program');
                FetchPrograms({ page: 1, query: '', screen: 'program', id: 0, track_id: track.id });
            }
        }}>
            <HStack pl="30px" alignItems="center" minH="55px" space={0}>
                <Box position="absolute" left="0" top="0" w="15px">
                    <ZStack>
                        {[...Array(1)].map((item, i) =>
                            <Box key={i} bg={`${track?.color}`} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                        )}
                    </ZStack>
                </Box>
                <HStack pt="02" w="100%" space="5">
                    <Center maxW={['62%', '70%', '42%']} alignSelf="flex-start" p="0">
                        <Text lineHeight="22px">{track.name}</Text>
                    </Center>
                    {track?.parent_id === 0 && (
                        <>
                            <Spacer />
                            <HStack pr="5" space="2" alignItems="center">
                                <Icon size="xl" as={AntDesign} name="right" color="primary.text" />
                            </HStack>
                        </>
                    )}
                </HStack>
            </HStack>
        </Pressable>
    </Box>;

};

export default RectangleDetailView