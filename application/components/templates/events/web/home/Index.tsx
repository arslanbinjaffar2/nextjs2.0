import { Box, CheckIcon, Container, HStack, Input, Select, Text, View, VStack } from 'native-base'
import HomeEvent from 'application/components/atoms/events/homeEvent/HomeEvent'
import UseEventService from 'application/store/services/UseEventService';
import React from 'react'
import Search from 'application/components/atoms/programs/Search'

const Index = () => {
  return (
    <VStack width={'100%'}>
    <View width={'100%'}  rounded={'lg'}  pb={'14px'} >
          <HomeEvent/>
    </View>
    </VStack>
  )
}

export default Index