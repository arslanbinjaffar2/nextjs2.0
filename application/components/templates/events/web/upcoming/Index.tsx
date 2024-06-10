import { Box, CheckIcon, Container, HStack, Input, Select, Text, View, VStack } from 'native-base'
import React from 'react'
import Search from 'application/components/atoms/programs/Search'
import UpcomingEvent from 'application/components/atoms/events/upcoming_events/upcoming_events'
import { UseEventService } from 'application/store/services'
import UseEnvService from 'application/store/services/UseEnvService'
import { useRouter } from 'solito/router'

const Index = () => {
     const {push}=useRouter()
    const { modules, event, FetchEvents, upcoming_events } = UseEventService();
    const { _env } = UseEnvService()
    React.useEffect(() => {
        FetchEvents({ query: '', screen: 'upcomingEvents' });
    }, []);

    React.useEffect(() => {
        console.log(upcoming_events, 'home_events');
    }, [upcoming_events]);
    console.log(upcoming_events,'kkkk');
  return (
    <VStack width={'100%'}>
      <Text fontSize="2xl">{modules?.find((programTitle) => (programTitle.alias == 'upcomingEvents'))?.name ?? ''}</Text>
     <HStack   alignItems="center"  justifyContent={'space-between'} mt={'4'} mb={'3'} space={'3'} flexDirection={['column','row']} width={'100%'}>
      <Box  flex={'1'} mb={['14px','']} width={['100%','auto']}>
    <Select   bg={'primary.box'}  width={'100%'} maxWidth={'100%'}
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
        		</Select>
            </Box>
     <Search  tab='events' />
     </HStack>
     
    <View width={'100%'} bg={'primary.box'} rounded={'lg'} pt={'5'} pb={'14px'} >
      {upcoming_events.length>0 && upcoming_events.map((upcoming_event,key,arr)=>{
        return(
          <Box borderBottomWidth={arr.length-1 === key ? 0 : 1} key={key} >
          <UpcomingEvent {...upcoming_event}/>
          </Box>
        )
      })}
    </View>
    </VStack>
  )
}

export default Index