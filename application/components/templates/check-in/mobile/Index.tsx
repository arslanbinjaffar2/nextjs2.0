import React from 'react'
import { Box, Container, HStack, Icon, IconButton, Image, Spacer, Text, VStack } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const Index = () => {
  return (
    <Container pt="1" maxW="100%" w="100%">
        <Text mb="3" textTransform="uppercase" fontSize="2xl">Session check-in</Text>
        <Box mb="3" w="100%" bg="primary.box" p="5" rounded="10">
          <HStack space="3" alignItems="center">
            <Text fontSize="lg">My ticket for </Text>
            <Spacer />
            <IconButton
              variant="transparent"
              p="1"
              icon={<Icon size="md" as={SimpleLineIcons} name="envelope" color="white" />}
              onPress={() => {
                console.log('hello')
              }}
            />
          </HStack>
          <Box mx="auto" w="190px" h="190px" bg="primary.darkbox" p="3" rounded="10">
            <Image
              source={{
                uri: 'https://wallpaperaccess.com/full/117511.jpg'
              }}
              alt="Alternate Text"
              w="164px"
              h="164px"
              rounded="10"
            />
          </Box>
          <Text pt="1" textAlign="center" fontSize="xl">Scan to Checkin</Text>
        </Box>
        <Image
          mb="3"
          rounded="10"
          source={{
            uri: 'https://wallpaperaccess.com/full/206501.jpg'
          }}
          alt="Alternate Text"
          w="100%"
          h="144px"
        />
        <HStack w="100%" space="0">
          <Box pb="3" overflow="hidden" h="100%" w="49%" bg="primary.box" p="0" rounded="10">
            <Text mb="3" bg="primary.darkbox" py="1" px="3" fontSize="lg">CHECK IN</Text>
            <VStack space="1">
              <HStack px="3" space="4" alignItems="center">
                <Text fontSize="md">11-12-2021</Text>
                <Text fontSize="md">11-12-2021</Text>
              </HStack>
              <HStack px="3" space="4" alignItems="center">
                <Text fontSize="md">11-12-2021</Text>
                <Text fontSize="md">11-12-2021</Text>
              </HStack>
              <HStack px="3" space="4" alignItems="center">
                <Text fontSize="md">11-12-2021</Text>
                <Text fontSize="md">11-12-2021</Text>
              </HStack>
            </VStack>
          </Box>
          <Spacer />
          <Box pb="3" overflow="hidden" h="100%" w="49%" bg="primary.box" p="0" rounded="10">
            <Text mb="3" bg="primary.darkbox" py="1" px="3" fontSize="lg">CHECK OUT</Text>
            <VStack space="1">
              <HStack px="3" space="4" alignItems="center">
                <Text fontSize="md">11-12-2021</Text>
                <Text fontSize="md">11-12-2021</Text>
              </HStack>
              <HStack px="3" space="4" alignItems="center">
                <Text fontSize="md">11-12-2021</Text>
                <Text fontSize="md">11-12-2021</Text>
              </HStack>
              <HStack px="3" space="4" alignItems="center">
                <Text fontSize="md">11-12-2021</Text>
                <Text fontSize="md">11-12-2021</Text>
              </HStack>
            </VStack>
          </Box>
        </HStack>
      </Container>
  )
}

export default Index