import { Box, CheckIcon, Container, HStack, Input, Select, Text, View, VStack } from 'native-base'
import HomeEvent from 'application/components/atoms/events/homeEvent/HomeEvent'
import UseEventService from 'application/store/services/UseEventService';
import React from 'react'
import Search from 'application/components/atoms/programs/Search'

const Index = () => {
  const { modules,event,FetchEvents,home_events } = UseEventService();
  console.log(home_events,'okkkk');
  return (
    <VStack width={'100%'}>
     <Text fontSize="2xl">{modules?.find((programTitle) => (programTitle.alias == 'homeMyevents'))?.name ?? ''}</Text>
     <HStack   alignItems="center"  justifyContent={'space-between'} mt={'4'} mb={'3'} space={'3'} flexDirection={['column','row']} width={'100%'}>
      <Box  flex={'1'} mb={['14px','']} width={['100%','auto']}>
    {/* <Select   bg={'primary.box'}  width={'100%'} maxWidth={'100%'}
			_selectedItem={{
					bg: "teal.600",
					endIcon: <CheckIcon size="5" />
          
        }}
        placeholder='Event type'
        mt={1} >
					<Select.Item label="UX Research" value="ux" />
          <Select.Item label="Web Development" value="web" />
          <Select.Item label="Cross Platform Development" value="cross" />
          <Select.Item label="UI Designing" value="ui" />
          <Select.Item label="Backend Development" value="backend" />
        		</Select> */}
            </Box>
     <Search  tab='events' />
     </HStack>
     
    <View width={'100%'} bg={'primary.box'} rounded={'lg'} pt={'5'} pb={'14px'} >
          <Box>
          <HomeEvent/>
          </Box>
    </View>
    </VStack>
  )
}

export default Index