/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { Avatar, Center, Container, HStack, VStack, Text, Box, Image } from 'native-base';
import BoxIconHeading from 'application/components/atoms/headings/BoxIconHeading'
import IcoSpeaker from 'application/assets/icons/IcoSpeaker';
import { useWindowDimensions } from 'react-native';

const RoundedList = () => {
  const { width } = useWindowDimensions()
  return (
    <Container mb="3" w="100%" maxW="100%">
      <BoxIconHeading icon={<IcoSpeaker width="27" height="44" />} title="MEET OUR SPEAKERS" />
      <HStack pt="1" w="100%" space="0" alignItems="center" justifyContent="space-between">
        {[...Array(width > 725 ? 5 : 4)].map((item, k) => <VStack key={k} alignItems="center" w={width > 725 ? '15%' : '22%'}>
          <Box w='100%' borderRadius={200} bg="primary.400" pb="100%" position="relative">
            <Image
              position="absolute"
              left="0"
              top="0"
              w="100%"
              h="100%"
              borderRadius={200}
              source={{ uri: 'https://via.placeholder.com/400.png' }}
              alt="Alternate Text"
            />
          </Box>
          <Text isTruncated pt="2" w="100%" textAlign="center" fontSize="md">Candice Clarke</Text>
        </VStack>)}
      </HStack>
    </Container>
  )
}

export default RoundedList;