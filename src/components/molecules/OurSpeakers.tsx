/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { Avatar, Center, Container, HStack, VStack, Text, Box, Image} from 'native-base';
import HeadingBox from '@src/components/atoms/HeadingBox';
import IcoSpeaker from '@src/assets/icons/IcoSpeaker';

const OurSpeakers = () => {
  
  return (
    <Container mb="3" w="100%" maxW="100%">
      <HeadingBox icon={<IcoSpeaker width="27" height="44" />} title="MEET OUR SPEAKERS" />
      <HStack pt="1" w="100%" space="5" alignItems="center" justifyContent="space-between">
        <VStack alignItems="center" w="14%">
          <Box w='100%' borderRadius={200} bg="primary.400"  pb="100%" position="relative">
            <Image
              position="absolute"
              left="0"
              top="0"
              w="100%"
              h="100%"
              borderRadius={200}
              source={{uri:'https://via.placeholder.com/400.png'}}
              alt="Alternate Text"
              
            />
          </Box>
          
          <Text isTruncated pt="2" w="100%" textAlign="center" fontSize="md">Candice Clarke</Text>
        </VStack>
        <VStack alignItems="center" w="14%">
          <Box w='100%' borderRadius={200} bg="primary.400"  pb="100%" position="relative">
            <Image
              position="absolute"
              left="0"
              top="0"
              w="100%"
              h="100%"
              borderRadius={200}
              source={{uri:'https://via.placeholder.com/400.png'}}
              alt="Alternate Text"
              
            />
          </Box>
          <Text isTruncated pt="2" w="100%" textAlign="center" fontSize="md">Albert Nikon</Text>
        </VStack>
        <VStack alignItems="center" w="14%">
          <Box w='100%' borderRadius={200} bg="primary.400"  pb="100%" position="relative">
            <Image
              position="absolute"
              left="0"
              top="0"
              w="100%"
              h="100%"
              borderRadius={200}
              source={{uri:'https://via.placeholder.com/400.png'}}
              alt="Alternate Text"
              
            />
          </Box>
          <Text isTruncated pt="2" w="100%" textAlign="center" fontSize="md">Bruce Chester</Text>
        </VStack>
        <VStack alignItems="center" w="14%">
          <Box w='100%' borderRadius={200} bg="primary.400"  pb="100%" position="relative">
            <Image
              position="absolute"
              left="0"
              top="0"
              w="100%"
              h="100%"
              borderRadius={200}
              source={{uri:'https://via.placeholder.com/400.png'}}
              alt="Alternate Text"
              
            />
          </Box>
          <Text isTruncated pt="2" w="100%" textAlign="center" fontSize="md">Nina Adams</Text>
        </VStack>
        <VStack alignItems="center" w="14%">
          <Box w='100%' borderRadius={200} bg="primary.400"  pb="100%" position="relative">
            <Image
              position="absolute"
              left="0"
              top="0"
              w="100%"
              h="100%"
              borderRadius={200}
              source={{uri:'https://via.placeholder.com/400.png'}}
              alt="Alternate Text"
              
            />
          </Box>
          <Text isTruncated pt="2" w="100%" textAlign="center" fontSize="md">Nina Adams</Text>
        </VStack>
        <VStack alignItems="center" w="14%">
          <Box w='100%' borderRadius={200} bg="primary.400"  pb="100%" position="relative">
            <Image
              position="absolute"
              left="0"
              top="0"
              w="100%"
              h="100%"
              borderRadius={200}
              source={{uri:'https://via.placeholder.com/400.png'}}
              alt="Alternate Text"
              
            />
          </Box>
          <Text isTruncated pt="2" w="100%" textAlign="center" fontSize="md">Nina Adams</Text>
        </VStack>
      </HStack>
      
    </Container>
    
  )
}

export default OurSpeakers;