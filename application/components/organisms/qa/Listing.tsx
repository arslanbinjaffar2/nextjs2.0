/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { Avatar, Box, Center, HStack, Icon, IconButton, Pressable, Spacer, Text, VStack } from 'native-base'
import IcoLike from 'application/assets/icons/Icolike';

const BoxList = ({ border }: any) => {
  return (
    <Box w="100%" borderBottomWidth={border} borderColor={border === 1 ? 'primary.text' : 'transparent'} py="3">
      <HStack px="3" w="100%" space="0" alignItems="center" justifyContent="space-between">
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
              <Text fontSize="lg">This is my question</Text>
            </VStack>
          </HStack>
        </Center>
        <Spacer />
        <HStack w="120px" space="3" alignItems="center">
          <IconButton
            variant="transparent"
            icon={<IcoLike width={26} height={24} />}
            onPress={() => { console.log('hello') }}
          />
          <Spacer />
          <Text fontSize="lg">3 min</Text>
        </HStack>
      </HStack>
    </Box>
  )
}

const Listing = () => {
  return (
    <React.Fragment>
      <React.Fragment>
        <HStack mb="3" space="10" alignItems="center">
          <Pressable
            p="0"
            borderWidth="0"
            onPress={() => { console.log('hello') }}>
            <Text opacity="1" fontSize="md" bold underline>RECENT</Text>
          </Pressable>
          <Pressable
            p="0"
            borderWidth="0"
            onPress={() => { console.log('hello') }}>
            <Text opacity="0.5" fontSize="md">POPULAR</Text>
          </Pressable>
          <Pressable
            p="0"
            borderWidth="0"
            onPress={() => { console.log('hello') }}>
            <Text opacity="0.5" fontSize="md">ARCHIVE</Text>
          </Pressable>
        </HStack>
        <Box mb="3" w="100%" bg="primary.box" p="0" rounded="10">
          {[...Array(5)].map((i: number, k: number) =>
            <React.Fragment key={k}>
              <BoxList border={k === 4 ? 0 : 1} />
            </React.Fragment>
          )}
        </Box>
      </React.Fragment>
    </React.Fragment>
  )
}

export default Listing