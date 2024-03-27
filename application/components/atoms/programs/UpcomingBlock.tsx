import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Box, Heading, HStack, Icon, Text } from 'native-base';

type AppProps = {
  title: string,
  desc: string,
  location: string,
  date: string,
  time: string,
  py?:string,
  px?:string
  h?:string
}

const UpcomingBlock = ({ title, desc, location, date, time,px="3",py="4",h }: AppProps) => {

  return (
    <Box mb="3" w="100%" py={py} px={px} borderWidth="1px" overflowY={'auto'}
    h={h}
    borderColor="primary.box" bg="primary.box" rounded="10">
      {title && <Heading pb={1} fontSize={['md', 'md', 'xl']}>{title}</Heading>}
      {desc && <Text lineHeight="sm" fontSize={['13px', 'md']}>{desc}</Text>}
      {location && <HStack><Icon h="20px" lineHeight="5" pt="1" size="16px" color="primary.text" as={MaterialIcons} name="location-pin" /><Text fontSize="md"> {location}</Text></HStack>}
      {(date || time) && <HStack space={['1', '3']}>{date && <Text fontSize={['13px', 'md']}>{date}</Text>}{time && <Text fontSize={['13px', 'md']}> {time}</Text>}</HStack>}
    </Box>
  )

}

export default UpcomingBlock;