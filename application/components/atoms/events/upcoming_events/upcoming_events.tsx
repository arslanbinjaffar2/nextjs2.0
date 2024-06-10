import Icocalendar from 'application/assets/icons/small/Icocalendar'
import Icopin from 'application/assets/icons/small/Icopin'
import { UpcomingEvent } from 'application/models/FetchEvent'
import { UseEventService } from 'application/store/services'
import UseEnvService from 'application/store/services/UseEnvService'
import DynamicIcon from 'application/utils/DynamicIcon'
import { Box, Button, HStack, Image, Pressable, Text, View } from 'native-base'
import React from 'react'
import { Link } from 'solito/link'
import { useRouter } from 'solito/src/router/use-router'

const UpcomingEventComponent = (props:UpcomingEvent) => {
    console.log(props,"props");
    const {push}=useRouter()
    const {event}= UseEventService()
    const {_env}=UseEnvService();
  return (
    <View  display={'flex'} flexDirection={['column','row']} alignItems={'flex-start'} width={'100%'} py={'14px'} px={'16px'}>
        <Pressable 
           onPress={()=>{
            push(`/${event.url}/upcomingEvents/detail/0`)
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
                push(`/${event.url}/upcomingEvents/detail/0`)
            }} 
        >
        <Text textDecorationLine={'underline'} fontSize={'md'}>{props.name}</Text>
        </Pressable>
        <HStack  space="3" alignItems="center" width={'100%'} flexDirection={'row'} pt={'6px'} w={'100%'}>        
        <Box alignItems={'center'} flexDirection={'row'}>
        <Icocalendar width={16} height={18} />
            <Text ml={'6px'} fontSize={'xs'}>{props.start_date} {props.end_date}</Text>
        </Box>
        <Box alignItems={'center'} flexDirection={'row'}>
            <Text fontSize={'xs'}>Event ID:</Text>
            <Text fontSize={'xs'}> {props.id}</Text>
        </Box>
        </HStack>
        <Box alignItems={'center'} flexDirection={'row'} pt={'6px'}>
        <Icopin width={16} height={18} />
            <Text ml={'6px'} fontSize={'xs'}>{props.location}</Text>
        </Box>
        <View flexDirection={'row'} alignItems={'center'} mt={'3'} >
        <Button 
        bg={'#000000'}
        width={['100%','136px']}
       
        height={38} 
        onPress={()=>{
            console.log('hello')
        }} 
        >
            <Box display={'flex'} alignItems={'center'} flexDirection={'row'}>
                 <DynamicIcon iconType={'Notattending'} iconProps={{ width:14,height:16, color:'#fff' }}/>
            <Text ml={'6px'} color={'#fff'}>Not attending</Text>
            </Box>
            
        </Button>
        <Button 
        width={['100%','86px']}
        height={38} 
        ml={'10px'}
        onPress={()=>{
            console.log('hello')
        }} 
        >
  <Link href={props?.registration_url as string} target='_blank'>
            <Box display={'flex'} alignItems={'center'} flexDirection={'row'}>
    <DynamicIcon iconType={'register'} iconProps={{ width: 17, height: 16 }} />
    <Text ml={'6px'}>Register</Text>
</Box>
  </Link>

            
        </Button>
        </View>
    </View>
    </View>
  )
}

export default UpcomingEventComponent