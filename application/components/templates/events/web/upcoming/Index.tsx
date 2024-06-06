import { Box, CheckIcon, Container, HStack, Input, Select, Text, View, VStack } from 'native-base'
import React from 'react'
import Search from 'application/components/atoms/programs/Search'
import UpcomingEvent from 'application/components/atoms/events/UpcomingEvent/UpcomingEvent'

const Index = () => {
  return (
    <VStack width={'100%'}>
    <Text fontSize={'2xl'} fontWeight={'medium'}>UPCOMING EVENTS</Text>
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
      {new Array(5).fill('').map((i,key,arr)=>{
        return(
          <Box borderBottomWidth={arr.length-1 === key ? 0 : 1} key={key} >
          <UpcomingEvent/>
          </Box>
        )
      })}
    </View>
    </VStack>
  )
}

export default Index