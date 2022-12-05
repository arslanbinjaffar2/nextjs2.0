import React from 'react'
import { Avatar, Box, HStack, Icon, Spacer, Text, VStack } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import Icoribbon from 'app/assets/icons/Icoribbon'

type boxItemProps = {
    border: number
}

const BoxItem = ({border} : boxItemProps) => {
  return (
    <Box w="100%" borderBottomWidth={border} borderColor="primary.text" py="3">
      <HStack px="4" alignItems="flex-start" minH="55px" space={0} justifyContent="flex-start">
        <HStack pt="2" w="100%" space="5" alignItems="center" justifyContent="space-between">
          <Avatar
            source={{
              uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
            }}
          >
          AA
          </Avatar>
          <VStack maxW={['62%','70%','40%']} space="0">
            <Text lineHeight="22px" fontSize="lg">Stephen Hendry</Text>
            <Text lineHeight="22px" fontSize="lg">Global INC - Social media Expert</Text>
            <Text pt="1" lineHeight="22px" fontSize="md">Private address: New york</Text>
          </VStack>
          <Spacer />
          <HStack space="4" alignItems="center">
            <Icoribbon width="20" height="28" />
            <Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text"  />
          </HStack>
        </HStack>
      </HStack>
    </Box>
  )
}

export default BoxItem