import React from 'react';
import { Container, HStack, VStack, Text } from 'native-base';
import IconWithLeftHeading from 'application/components/atoms/headings/IconWithLeftHeading'
import IcoSpeaker from 'application/assets/icons/IcoSpeaker';
import { useWindowDimensions } from 'react-native';
import RoundedView from 'application/components/atoms/speakers/RoundedView';

const RoundedList = () => {

  const { width } = useWindowDimensions()

  return (
    <Container mb="3" w="100%" maxW="100%">
      <IconWithLeftHeading icon={<IcoSpeaker width="27" height="44" />} title="MEET OUR SPEAKERS" />
      <HStack pt="1" w="100%" space="0" alignItems="center" justifyContent="space-between">
        {[...Array(width > 725 ? 5 : 4)].map((item, k) => <VStack key={k} alignItems="center" w={width > 725 ? '15%' : '22%'}>
          <RoundedView speaker={{ image: 'https://via.placeholder.com/400.png', text: 'ABC' }} />
          <Text isTruncated pt="2" w="100%" textAlign="center" fontSize="md">Candice Clarke</Text>
        </VStack>)}
      </HStack>
    </Container>
  )
}

export default RoundedList;