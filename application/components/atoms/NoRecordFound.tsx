import React from 'react'
import { Box, Text } from 'native-base'
import UseEventService from 'application/store/services/UseEventService';
type Props={
 label?:string
 mb?:string | number
 bg?:string
}
const NoRecordFound = ({label,mb,bg}:Props) => {
    const { event} = UseEventService();
  return (
    <Box overflow="hidden" mb={mb} w={"100%"} rounded="lg" padding={3} bg={bg}>
    <Text >{event.labels.GENERAL_NO_RECORD ?? label }</Text>
  </Box>
  )
}

export default NoRecordFound