import React from 'react'
import { Badge, Box, Button, HStack, Menu, Text, VStack } from 'native-base';
import IcoBell from 'applications/app/assets/icons/IcoBell';
import IcoChat from 'applications/app/assets/icons/IcoChat';

const NotificationMenu = () => {
  return (
    <Menu
      w={['350px', '400px']}
      maxW='100%'
      placement="bottom right"
      bg="primary.darkbox"
      borderWidth={1}
      borderColor="#707070"
      shouldFlip={true}
      maxH="400px"
      h="400px"
      mt="3"
      p="0"
      rounded="10"
      overflow={'hidden'}
      trigger={(triggerProps) => {
        return <Button bg="transparent" colorScheme='transparent' p="0" {...triggerProps} >
          <IcoBell width={32} height={32} />
          <Badge position="absolute" right="4px" top="-4px" bg="#FF4C41" shadow="1" w="14px" h="14px" p="0" rounded="100%" />
        </Button>
      }}
    >
      <Menu.Item p="0">
        <HStack borderBottomWidth="1px" borderBottomColor="primary.text" px="6" py="3" w="100%" space="1" alignItems="center">
          <Box w="50px">
            <IcoChat width="30" height="26" />
          </Box>
          <VStack w="80%" space="0">
            <Text fontSize="md">Emraan khan sent you a text massage. Emraan khan sent you a text massage.</Text>
            <Text color="black" fontSize="sm">10 minutes ago</Text>
          </VStack>
          <Badge bg="black" shadow="1" w="4" h="4" p="0" rounded="100%" />
        </HStack>
      </Menu.Item>
      <Menu.Item p="0">
        <HStack borderBottomWidth="1px" borderBottomColor="primary.text" px="6" py="3" w="100%" space="1" alignItems="center">
          <Box w="50px">
            <IcoChat width="30" height="26" />
          </Box>
          <VStack w="80%" space="0">
            <Text fontSize="md">Emraan khan sent you a text massage. Emraan khan sent you a text massage.</Text>
            <Text color="black" fontSize="sm">10 minutes ago</Text>
          </VStack>
          <Badge bg="black" shadow="1" w="4" h="4" p="0" rounded="100%" />
        </HStack>
      </Menu.Item>
    </Menu>
  )
}

export default NotificationMenu;