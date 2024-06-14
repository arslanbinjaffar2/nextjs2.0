import { Box, CheckIcon, Container, HStack, Input, Select, Text, View, VStack } from 'native-base'
import React from 'react'
import Search from 'application/components/atoms/programs/Search'
import UpcomingEvent from 'application/components/atoms/events/upcoming_events/upcoming_events'
import { UseEventService } from 'application/store/services'
import UseEnvService from 'application/store/services/UseEnvService'
import { useRouter } from 'solito/router'

const Index = () => {
 
  return (
    <VStack width={'100%'}>  
          <UpcomingEvent />   
    </VStack>
  )
}

export default Index