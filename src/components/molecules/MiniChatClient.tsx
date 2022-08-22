import React from 'react';
import { Feather } from '@expo/vector-icons'; 
import { Avatar, Box, Center, Checkbox, HStack, Icon, IconButton, Select, Spacer, Text, TextArea } from 'native-base'

const MiniChatClient = () => {
  return (
    <Box  mb="3" w="100%" borderWidth="1" borderColor="primary.darkbox"  bg="primary.box" p="0" rounded="lg">
      <Center alignItems="flex-end" pb="1">
        <Select
          placeholder="Please Select"
          w="200px"
          h="35px"
          bg="primary.darkbox"
        >
          <Select.Item label="Marie Solbakke (Private)" value="js" />
          <Select.Item label="Albert Board" value="ts" />
          <Select.Item label="Mike nelson " value="c" />
        </Select>
      </Center>
      <HStack px="3" space="3" alignItems="flex-start" justifyContent="space-between">
        <Avatar
          source={{
            uri:'https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg'
          }}
          
        >
          HS
        </Avatar>
        <TextArea p="1" colorScheme="transparent" fontSize="lg" w="90%" borderWidth="0" bg="transparent" placeholder="Deltag i debattn…"  />
      </HStack>
      <HStack px="3" py="2" space="3" alignItems="center">
        <Checkbox my="0" colorScheme={'white'} value="checkbox">Send anonymously</Checkbox>
        <Spacer />
        <IconButton
          variant="transparent"
          icon={<Icon size="lg" as={Feather} name="send" color="white" />}
          onPress={()=>{console.log('hello')}}
          
        />
      </HStack>
      
      
      
    </Box>
    
  )
}

export default MiniChatClient