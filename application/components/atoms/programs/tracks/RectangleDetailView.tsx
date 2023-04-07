import React from 'react'
import { Box, HStack, Text, ZStack, Center, Spacer, Icon } from 'native-base'
import AntDesign from '@expo/vector-icons/AntDesign';

const RectangleDetailView = (props: any) => {
    return <Box w="100%" key={props?.program.id} borderBottomWidth={props.k === 1 ? 0 : 1} borderColor="primary.text" py="3">
        <HStack pl="30px" alignItems="center" minH="55px" space={0}>
            <Box position="absolute" left="0" top="0" w="15px">
                <ZStack>
                    {[...Array(1)].map((track, i) =>
                        <Box key={i} bg={`green.${i + 1}00`} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
                    )}
                </ZStack>
            </Box>
            <HStack pt="02" w="100%" space="5">
                <Center maxW={['62%', '70%', '42%']} alignSelf="flex-start" p="0">
                    <Text lineHeight="22px">{props?.program.text}</Text>
                </Center>
                <Spacer />
                <HStack pr="5" space="2" alignItems="center">
                    <Icon size="xl" as={AntDesign} name="right" color="primary.text" />
                </HStack>
            </HStack>
        </HStack>
    </Box>;
};

export default RectangleDetailView