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
import UseLoadingService from 'application/store/services/UseLoadingService'
import SectionLoading from 'application/components/atoms/SectionLoading'
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs'
import moment from 'moment'
import { GENERAL_DATE_FORMAT } from 'application/utils/Globals'
type ScreenParams = { id: string; cms: string | undefined };

const { useParam } = createParam<ScreenParams>();

const Index = () => {
  const { push } = useRouter();
  const [id] = useParam('id');
  const { event, FetchEventDetail, event_detail,modules } = UseEventService();
  const { _env } = UseEnvService();
  const {processing} = UseLoadingService();
  const module = modules.find((module) => module.alias === 'homeMyevents');


React.useEffect(() => {
    if (id && (!event_detail || event_detail.id !== Number(id))) {
        FetchEventDetail({ id: Number(id) })
    }
}, [id])


  return (
   <>
  <NextBreadcrumbs module={module} title={event_detail?.name}/>
    {processing?.includes('event-detail') ?  <SectionLoading /> :(
      <VStack width={'100%'}>
        <Box flexDirection={'row'} alignItems={'center'} width={'100%'}> 
        
        
        <Text fontSize={'2xl'} fontWeight={'medium'} width={'100%'}>{event_detail?.name}</Text>
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
          {event_detail?.id != event?.id && <Button
          width={['100%','86px']}
          height={38} 
          onPress={()=>{
              window.open(`/${event_detail?.url}`, '_blank')
          }} 
          >
              <Box display={'flex'} alignItems={'center'} flexDirection={'row'}>
                  <DynamicIcon iconType={'logout'} iconProps={{ width:14,height:14 }}/>
              <Text ml={'6px'}>{event?.labels?.EVENTSITE_LOGIN}</Text>
              </Box>
              
          </Button>}
            </VStack>
            <HStack  space="3" alignItems="center" width={'100%'} flexDirection={'row'} pt={'6px'}>        
          <Box alignItems={'center'} flexDirection={'row'}>
          <Icocalendar width={16} height={18} />
              <Text ml={'6px'} fontSize={'xs'}>{moment(event_detail?.start_date).format(GENERAL_DATE_FORMAT)} - {moment(event_detail?.end_date).format(GENERAL_DATE_FORMAT)}</Text>
          </Box>
          <Box alignItems={'center'} flexDirection={'row'}>
              <Text fontSize={'xs'}>{event?.labels?.GENERAL_EVENT_ID_LABEL}:</Text>
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
    )}
   </>
  )
}

export default Index