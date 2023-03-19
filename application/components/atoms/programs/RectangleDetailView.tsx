import React from 'react'
import { Box, HStack, Spacer, VStack, Text, FlatList, ZStack, IconButton } from 'native-base'
import IcoRaiseHand from 'application/assets/icons/IcoRaiseHand';

const RectangleDetailView = (props: any) => {
  return <Box w="100%">
    <Box key={props?.program.id} borderBottomWidth='1' borderColor="primary.text" py="2">
      <HStack pl="30px" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
        <Box position="absolute" left="0" top="0" w="15px">
          {props?.program.tracks && <ZStack>
            {props?.program.tracks.map((track, i) =>
              <Box key={i} bg={track.color} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
            )}
          </ZStack>}
        </Box>
        <HStack pt="2" w="100%" space="3" alignItems="flex-start" justifyContent="space-between">
          <VStack w="40px" space="0">
            <Text lineHeight="22px">
              {props?.program.starttime}
            </Text>
            <Text lineHeight="22px">
              {props?.program.endtime}
            </Text>
          </VStack>
          <Text lineHeight="22px" maxW={['62%', '70%', '50%']} alignSelf="flex-start">
            {props?.program.text}
          </Text>
          <Spacer />
          <IconButton
            mr="2"
            variant="transparent"
            icon={<IcoRaiseHand width={21} height={26} />}
            onPress={() => {
              console.log('hello')
            }}
          />
        </HStack>
      </HStack>
    </Box>
  </Box>;
};

export default RectangleDetailView