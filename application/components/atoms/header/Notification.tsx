import React from 'react'
import { Badge, Box, Button, HStack, Menu, Pressable, Text, VStack } from 'native-base';
import IcoBell from 'application/assets/icons/IcoBell';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseNotificationService from 'application/store/services/UseNotificationService';
import moment from 'moment';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';
const Notification = () => {
  const { notifications } = UseNotificationService();
  const { event} = UseEventService();
  const { push } = useRouter();


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
      {notifications.length > 0 && notifications?.map((alert:any)=>{
        if(alert.type == 'poll'){
          return (
            <Menu.Item p="0">
              <Pressable
              w="100%"
              onPress={() => {
                push(`/${event.url}/${alert.url}`)
              }}>
                <HStack borderBottomWidth="1px" borderBottomColor="primary.bordercolor" px="6" py="3" w="100%" space="1" alignItems="center">
                  <Box w="50px">
                    <DynamicIcon iconType="chat" iconProps={{ width: 30, height: 26 }} />
                  </Box>
                  <VStack w="80%" space="0">
                    <Text fontSize="md">{alert?.title}</Text>
                    <Text fontSize="sm">{alert?.text}</Text>
                    <Text color="black" fontSize="sm">{moment(`${alert?.date} ${alert?.time}`).fromNow()}</Text>
                  </VStack>
                  <Badge bg="black" shadow="1" w="4" h="4" p="0" rounded="100%" />
                </HStack>
              </Pressable>
            </Menu.Item>
          )
        } else{
          return (
              <Menu.Item p="0">
                <Pressable
                w="100%"
                onPress={() => {
                  push(`/${event.url}/alerts`)
                }}>
                  <HStack borderBottomWidth="1px" borderBottomColor="primary.bordercolor" px="6" py="3" w="100%" space="1" alignItems="center">
                    <Box w="50px">
                      <DynamicIcon iconType="chat" iconProps={{ width: 30, height: 26 }} />
                    </Box>
                    <VStack w="80%" space="0">
                      <Text fontSize="md">{alert?.title}</Text>
                      <Text color="black" fontSize="sm">{moment(`${alert?.alert_date} ${alert?.alert_time}`).fromNow()}</Text>
                    </VStack>
                    <Badge bg="black" shadow="1" w="4" h="4" p="0" rounded="100%" />
                  </HStack>
                </Pressable>
              </Menu.Item>
          )
        }
        
        })}
        {/* <Menu.Item p="0">
        <HStack borderBottomWidth="1px" borderBottomColor="primary.bordercolor" px="6" py="3" w="100%" space="1" alignItems="center">
          <Box w="50px">
            <DynamicIcon iconType="chat" iconProps={{ width: 30, height: 26 }} />
          </Box>
          <VStack w="80%" space="0">
            <Text fontSize="md">Emraan khan sent you a text massage. Emraan khan sent you a text massage.</Text>
            <Text color="black" fontSize="sm">10 minutes ago</Text>
          </VStack>
          <Badge bg="black" shadow="1" w="4" h="4" p="0" rounded="100%" />
        </HStack>
      </Menu.Item> */}
    </Menu>
  )
}

export default Notification;