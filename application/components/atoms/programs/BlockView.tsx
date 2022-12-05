import React from 'react'
import { Box, HStack, Spacer, VStack, Text, FlatList, ZStack, IconButton } from 'native-base'
import IcoRaiseHand from 'application/assets/icons/IcoRaiseHand';

const BlockView = () => {
  const data = [{
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    text: 'First point in the agenda, with room for two or three lines of text.',
    starttime: '12:47',
    endtime: '12:47',
    tracks: [{ name: 'Technology', color: '#F5B761' }, { name: 'Nature', color: '#74AD6A' }, { name: 'Banking', color: '#74ADEF' }]
  }, {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    starttime: '11:11',
    endtime: '11:11',
    text: 'First point in the agenda',
    tracks: [{ name: 'Technology', color: '#F5B761' }, { name: 'Banking', color: '#74ADEF' }]
  }, {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    starttime: '6:22',
    endtime: '6:22',
    text: 'With room for two or three lines of text.',
    tracks: [{ name: 'Technology', color: '#F5B761' }]
  }, {
    id: '68694a0f-3da1-431f-bd56-142371e29d72',
    starttime: '8:56',
    endtime: '8:56',
    text: 'First point in the agenda, with room for two or three lines of text.',
    tracks: [{ name: 'Technology', color: '#74ADEF' }]
  }, {
    id: '28694a0f-3da1-471f-bd96-142456e29d72',
    starttime: '12:47',
    endtime: '12:47',
    text: 'First point in the agenda, with room for two or three lines of text.',
    tracks: [{ name: 'Technology', color: '#9F1C2B' }]
  }];
  return <Box w="100%">
    {data && data.map((item) =>
      <Box key={item.id} borderBottomWidth='1' borderColor="primary.text" py="2">
        <HStack pl="30px" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
          <Box position="absolute" left="0" top="0" w="15px">
            {item.tracks && <ZStack>
              {item.tracks.map((track, i) =>
                <Box key={i} bg={track.color} borderWidth="1" borderColor="primary.darkbox" w="15px" mt={`${i * 10}px`} h={`${55 - (i * 10)}px`} borderRightRadius="10" shadow={2} />
              )}
            </ZStack>}
          </Box>
          <HStack pt="2" w="100%" space="3" alignItems="flex-start" justifyContent="space-between">
            <VStack w="40px" space="0">
              <Text lineHeight="22px">
                {item.starttime}
              </Text>
              <Text lineHeight="22px">
                {item.endtime}
              </Text>
            </VStack>
            <Text lineHeight="22px" maxW={['62%', '70%', '50%']} alignSelf="flex-start">
              {item.text}
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
      </Box>)}
  </Box>;
};

export default BlockView