import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Box, Heading, HStack, Icon, Text } from 'native-base';

type AppProps = { 
    title: string, 
    desc: string, 
    location: string, 
    date: string, 
    time: string, 
}
const Notification =  ({title,desc,location,date,time}: AppProps) => {
  return (
    <Box mb="3" w="100%" py="4" px="5" bg="primary.box" rounded="lg">
      {title && <Heading fontSize="xl">{title}</Heading>}
      {desc && <Text  fontSize="md">{desc}</Text>}
      {location && <HStack><Icon pt="1" size="sm" color="primary.text" as={MaterialIcons} name="location-pin"  /><Text fontSize="md"> {location}</Text></HStack>}
      {(date || time) && <HStack space="3"><Text fontSize="md">{date}</Text> <Text fontSize="md"> {time}</Text></HStack>}
      
    </Box>
    
  )
}
export default Notification;