import { Box, CheckIcon, Container, HStack, Input, Select, Text, View, VStack } from 'native-base'
import React from 'react'
import Search from 'application/components/atoms/programs/Search'
import UpcomingEvents from 'application/components/atoms/events/upcoming-events/UpcomingEvents'
import { UseEventService } from 'application/store/services'
import UseEnvService from 'application/store/services/UseEnvService'
import { useRouter } from 'solito/router'

const Index = () => {
 
  return (
    <VStack width={'100%'}>  
          <UpcomingEvents />   
    </VStack>
  )
}

export default Index