/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { Avatar, Box, Button, Center, HStack, Icon, IconButton, Pressable, Spacer, Text, VStack } from 'native-base'
import IcoRaiseHand from 'app/assets/icons/IcoRaiseHand';

const Listing = () => {
  return (
    <React.Fragment>
      <HStack bg="primary.box" py="5" mb="2" rounded="10" px="3" w="100%" space="0" alignItems="center" justifyContent="space-between">
        <Center alignItems="flex-start" w="60%" p="0">
          <HStack space="3" alignItems="center">
            <Avatar
              source={{
                uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
              }}
            >
                            SS
            </Avatar>
            <VStack space="0">
              <Text fontSize="lg">Stephen Hendry</Text>
              <Text fontSize="lg">Global INC - Social media Expert</Text>
            </VStack>
          </HStack>
        </Center>
        <Spacer />
        <HStack w="120px" space="1" alignItems="center" justifyContent="flex-end">
          <IconButton
            p="2"
            variant="transparent"
            icon={<IcoRaiseHand width={20} height={27} />}
            onPress={() => { console.log('hello') }}
          />
          <Text fontSize="lg"># 05</Text>
        </HStack>
      </HStack>
      <Box mb="2" p="0">
        <Text fontSize="lg">Total Speakers :30</Text>
      </Box>
      <Box w="100%" mb="3" bg="primary.box" p="0" rounded="10">
        {[...Array(5)].map((k, i) =>
          <HStack key={i} borderBottomWidth={i === 4 ? '0' : '1px'} borderColor="primary.text" px="3" py="3" w="100%" space="0" alignItems="center">
            <Center alignItems="flex-start" w="70%" p="0">
              <HStack space="3" alignItems="center">
                <Avatar
                  source={{
                    uri: 'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
                  }}
                >
                                    SS
                </Avatar>
                <VStack space="0">
                  <Text fontSize="lg">Stephen Hendry</Text>
                  <Text fontSize="lg">Global INC - Social media Expert</Text>
                </VStack>

              </HStack>
            </Center>
            <Spacer />
            <Center p="0">
              <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
            </Center>
          </HStack>)}
      </Box>
    </React.Fragment>
  )
}

export default Listing