import { Box, Button, CheckIcon, Container, HStack, Icon, Image, Input, Pressable, Select, Text, View, VStack } from 'native-base'
import HomeEvent from 'application/components/atoms/events/homeEvent/HomeEvent'
import React from 'react'
import Search from 'application/components/atoms/programs/Search'
import DynamicIcon from 'application/utils/DynamicIcon'
import Icocalendar from 'application/assets/icons/small/Icocalendar'
import Icopin from 'application/assets/icons/small/Icopin'
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'solito/src/router/use-router'
import { UseEventService } from 'application/store/services'
import { createParam } from 'solito';
import UseEnvService from 'application/store/services/UseEnvService';
type ScreenParams = { id: string; cms: string | undefined };

const { useParam } = createParam<ScreenParams>();

const Index = () => {
  const { push } = useRouter();
  const [id] = useParam('id');
  const { event, updateEventDetail, event_detail } = UseEventService();
  const { _env } = UseEnvService()
React.useEffect(() => {
    if (id && (!event_detail || event_detail.id !== Number(id))) {
        updateEventDetail({ id: Number(id) })
    }
}, [id])
  return (
    <VStack width={'100%'}>
      <Box flexDirection={'row'} alignItems={'center'} width={'100%'}> 
      <Pressable alignItems={'center'} flexDirection={'row'}
             onPress={()=>{
              push(`/${event.url}/home_events`)
          }} 
      >
        <Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="arrowleft" />
        <Text fontSize={'2xl'} fontWeight={'medium'}>BACK</Text>
        </Pressable>
      
      <Text fontSize={'2xl'} fontWeight={'medium'} textAlign={'center'} width={'calc(100% - 86px)'}>{event_detail?.name}</Text>
      </Box>
      <VStack mt={'4'}>
        {
          event_detail?.app_icon ? (
            <Image source={{ uri: `${_env.eventcenter_base_url}/assets/event/branding/${event_detail?.app_icon}` }}  alt="Event Image" size="xl" width={'100%'} height={157}  roundedTop={'md'} />
              ):
              <Image source={{ uri: "https://dev.eventbuizz.com/_admin_assets/images/logo-unavailable-2.png" }} bg={'gray.300'} alt="Event Image" size="xl" width={'100%'} height={157} rounded={'sm'} /> 
          }
        <HStack  px={6} py={4} bg={'primary.box'} roundedBottom={'md'} flexDirection={'column'}>
          <VStack flexDirection={['column','row']} justifyContent={'space-between'} alignItems={'center'} 

          width={'100%'}
          >   
          <Box width={['100%','calc(100% - 86px)']}>
        <Text fontSize={'xl'} fontWeight={'medium'} >
          {event_detail?.name}</Text>
          </Box>
        <Button 
        width={['100%','86px']}
        height={38} 
        onPress={()=>{
            console.log('hello')
        }} 
        >
            <Box display={'flex'} alignItems={'center'} flexDirection={'row'}>
                 <DynamicIcon iconType={'logout'} iconProps={{ width:14,height:14 }}/>
            <Text ml={'6px'}>Login</Text>
            </Box>
            
        </Button>
          </VStack>
          <HStack  space="3" alignItems="center" width={'100%'} flexDirection={'row'} pt={'6px'}>        
        <Box alignItems={'center'} flexDirection={'row'}>
        <Icocalendar width={16} height={18} />
            <Text ml={'6px'} fontSize={'xs'}>{event_detail?.start_date} - {event_detail?.end_date}</Text>
        </Box>
        <Box alignItems={'center'} flexDirection={'row'}>
            <Text fontSize={'xs'}>Event ID:</Text>
            <Text fontSize={'xs'}>{event_detail?.id}</Text>
        </Box>
        </HStack>
        <Box alignItems={'center'} flexDirection={'row'} pt={'6px'}>
        <Icopin width={16} height={18} />
            <Text ml={'6px'} fontSize={'xs'}>{event_detail?.location_name}</Text>
        </Box>
        <Text pt={'4'}>
          {event_detail?.event_description}
        </Text>
        </HStack>
        
      </VStack>
    </VStack>
  )
}

export default Index