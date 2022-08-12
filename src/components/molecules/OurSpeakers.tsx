import React from 'react';
import { Avatar, Center, Container, HStack, VStack, Text} from 'native-base';
import HeadingBox from '@src/components/atoms/HeadingBox';
import IcoSpeaker from '@src/assets/icons/IcoSpeaker';

const OurSpeakers = () => {
  return (
    <Container mb="3" w="100%" maxW="100%">
      <HeadingBox icon={<IcoSpeaker width="27" height="44" />} title="MEET OUR SPEAKERS" />
      <HStack pt="1" w="100%" space="0" alignItems="center" justifyContent="space-between">
        <VStack alignItems="center" w="25%">
          <Avatar
            size="lg"
            source={{
              uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
            }}
          >
            SS
          </Avatar>
          <Text isTruncated pt="2" w="100%" textAlign="center" fontSize="md">Candice Clarke</Text>
        </VStack>
        <VStack alignItems="center" w="25%">
          <Avatar
            size="lg"
            source={{
              uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
            }}
          >
            SS
          </Avatar>
          <Text isTruncated pt="2" w="100%" textAlign="center" fontSize="md">Albert Nikon</Text>
        </VStack>
        <VStack alignItems="center" w="25%">
          <Avatar
            size="lg"
            source={{
              uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
            }}
          >
            SS
          </Avatar>
          <Text isTruncated pt="2" w="100%" textAlign="center" fontSize="md">Bruce Chester</Text>
        </VStack>
        <VStack alignItems="center" w="25%">
          <Avatar
            size="lg"
            source={{
              uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
            }}
          >
            SS
          </Avatar>
          <Text isTruncated pt="2" w="100%" textAlign="center" fontSize="md">Nina Adams</Text>
        </VStack>
      </HStack>
      
    </Container>
    
  )
}

export default OurSpeakers;