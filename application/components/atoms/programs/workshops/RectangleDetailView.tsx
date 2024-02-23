import React from 'react'
import { Box, HStack, Spacer, VStack, Text, Icon, ZStack, Center } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';

const RectangleDetailView = (props: any) => {
    return <Box w="100%" key={props?.program.id} borderBottomWidth={props.k === 1 ? 0 : 1} borderColor="primary.bordercolor" py="3">
        <HStack pl="30px" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
            <Box position="absolute" left="0" top="0" w="15px">
                <ZStack>
                    {props?.program.tracks && <ZStack>
                        {props?.program.tracks.map((track: any, i: any) =>
                            <Box key={i} bg={track.color} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                        )}
                    </ZStack>}
                </ZStack>
            </Box>
            <HStack pt="2" w="100%" space="5" alignItems="center" justifyContent="space-between">
                <VStack w="40px" space="0">
                </VStack>
                <Center maxW={['62%', '70%', '60%']} alignSelf="flex-start" p="0">
                    <Text alignSelf="flex-start" lineHeight="22px"> {props?.program.text}</Text>
                </Center>
                <Spacer />
                <HStack pr="5" space="2" alignItems="center">
                    <Icon size="xl" as={AntDesign} name="calendar" color="primary.text" />
                    <Text pt="1" fontSize="lg">8</Text>
                </HStack>
            </HStack>
        </HStack>
    </Box>;
};

export default RectangleDetailView