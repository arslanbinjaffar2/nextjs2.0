import Icocalendar from 'application/assets/icons/small/Icocalendar'
import Icopin from 'application/assets/icons/small/Icopin'
import { UseEventService } from 'application/store/services'
import UseEnvService from 'application/store/services/UseEnvService'
import DynamicIcon from 'application/utils/DynamicIcon'
import { Box, Button, HStack, Image, Pressable, Text, View } from 'native-base'
import React from 'react'
import { useRouter } from 'solito/src/router/use-router'

const HomeEvent = () => {
    const {push}=useRouter()
    const {event}= UseEventService()
  return (
    <View  display={'flex'} flexDirection={['column','row']} alignItems={'flex-start'} width={'100%'} py={'14px'} px={'16px'}>
        <Pressable 
           onPress={()=>{
            push(`/${event.url}/homeMyevents/detail/0`)
        }} 
        >
      <Image source={{
          uri: "https://wallpaperaccess.com/full/317501.jpg"
        }} alt="Alternate Text" size="xl" width={114} height={46} 
        rounded={'sm'}
        />
        </Pressable>
    <View display={'flex'} flexDirection={'column'} ml={['','14px']} mt={['14px','']} w={'100%'}>
        <Pressable
            onPress={()=>{
                push(`/${event.url}/homeMyevents/detail/0`)
            }} 
        >
        <Text textDecorationLine={'underline'} fontSize={'md'}>Innovative solutions for a sustainable future conference</Text>
        </Pressable>
        <HStack  space="3" alignItems="center" width={'100%'} flexDirection={'row'} pt={'6px'} w={'100%'}>        
        <Box alignItems={'center'} flexDirection={'row'}>
        <Icocalendar width={16} height={18} />
            <Text ml={'6px'} fontSize={'xs'}>05-07-2024 - 12-26-2024</Text>
        </Box>
        <Box alignItems={'center'} flexDirection={'row'}>
            <Text fontSize={'xs'}>Event ID:</Text>
            <Text fontSize={'xs'}> 5123</Text>
        </Box>
        </HStack>
        <Box alignItems={'center'} flexDirection={'row'} pt={'6px'}>
        <Icopin width={16} height={18} />
            <Text ml={'6px'} fontSize={'xs'}>1234 Innovation Parkway Quantum Valley, Technopolis State of Future Horizons.</Text>
        </Box>
        <Button 
        width={['100%','86px']}
        height={38} mt={'3'}
        onPress={()=>{
            console.log('hello')
        }} 
        >
            <Box display={'flex'} alignItems={'center'} flexDirection={'row'}>
                 <DynamicIcon iconType={'logout'} iconProps={{ width:14,height:14 }}/>
            <Text ml={'6px'}>Login</Text>
            </Box>
            
        </Button>
    </View>
    </View>
  )
}

export default HomeEvent