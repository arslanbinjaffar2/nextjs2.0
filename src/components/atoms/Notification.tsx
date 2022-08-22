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

const Notification = ({ title, desc, location, date, time }: AppProps) => {

  return (
    <Box mb="3" w="100%" py="3" px="3" bg="primary.box" rounded="lg">
      {title && <Heading fontSize={['md','md','xl']}>{title}</Heading>}
      {desc && <Text lineHeight="sm" fontSize={['sm','sm','md']}>{desc}</Text>}
      {location && <HStack><Icon h="20px" lineHeight="5" pt="1" size="16px" color="primary.text" as={MaterialIcons} name="location-pin" /><Text fontSize="md"> {location}</Text></HStack>}
      {/* {(date || time) && <HStack space="3">{date && <Text fontSize="md">{date}</Text>} {time && <Text fontSize="md"> {time}</Text>}</HStack>} */}
    </Box>
  )

}

export default Notification;