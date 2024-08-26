import { Box, Button, CheckIcon, Container, HStack, Icon, Image, Input, Pressable, Select, Spacer, Text, View, VStack } from 'native-base'
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
import ExhibitorDefaultImage from 'application/assets/images/exhibitors-default.png';
import moment from 'moment'
import { GENERAL_DATE_FORMAT } from 'application/utils/Globals'
import { func } from 'application/styles'
import { getColorScheme } from 'application/styles/colors'
import { useWindowDimensions } from 'react-native'
type ScreenParams = { id: string; cms: string | undefined };

const { useParam } = createParam<ScreenParams>();

const Index = () => {
  const { push } = useRouter();
  const [id] = useParam('id');
  const { event, FetchEventDetail, event_detail,modules } = UseEventService();
  const { _env } = UseEnvService();
  const {processing} = UseLoadingService();
  const module = modules.find((module) => module.alias === 'homeMyevents');

  const { width } = useWindowDimensions();
  const RenderHtml = require('react-native-render-html').default;
  const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
  const mixedStyle = {
    body: {
      fontFamily: 'Avenir',
      fontSize: '16px',
      userSelect: 'auto',
      color: colors.text
      },
      p: {
        fontFamily: 'Avenir',
        }
        }
        
const _bannerWidth = React.useRef<HTMLDivElement>(null);
React.useEffect(() => {
    if (id && (!event_detail || event_detail.id !== Number(id))) {
        FetchEventDetail({ id: Number(id), screen: 'homeMyevents' })
    }
}, [id])


  return (
   <>
   
  <NextBreadcrumbs module={module} title={event_detail?.name}/>
    {processing?.includes('event-detail') ?  <SectionLoading /> :(
      <VStack  width={'100%'}>
        <Box   flexDirection={'row'} alignItems={'center'} width={'100%'}> 
        <Text fontSize={'2xl'} fontWeight={'medium'} width={'100%'}>{event_detail?.name}</Text>
        </Box>
        <VStack   mt={'4'}>
          {
            event_detail?.app_header_logo ? (
              <Box width={'100%'} ref={_bannerWidth}  roundedTop={10} bg={'primary.box'}>
                <Image resizeMode='contain' resizeMethod='scale' source={{ uri: `${_env.eventcenter_base_url}/assets/event/branding/${event_detail?.app_header_logo}` }}  alt="Event Image"  width={'100%'} h={[(width - 30) * 0.34,(width - 30) * 0.34 ,_bannerWidth.current?.clientWidth ? _bannerWidth.current?.clientWidth * 0.34 : 180]} roundedTop={'md'} />
              </Box>
                ):
               <Box roundedTop={10} bg={'primary.box'}>
                <Image mb="5" roundedTop="10" size="full" source={ExhibitorDefaultImage} alt="" w="100%" h="160px" />
              </Box> 
            }
          <HStack bg={'primary.box'} px={6} py={4}  roundedBottom={'md'} flexDirection={'column'}>
            <VStack flexDirection={['column','row']} justifyContent={'flex-start'} alignItems={'flex-start'} 

            width={'100%'}
            >   
            <Box width={['100%','calc(100% - 150px)']}>
          <Text fontSize={'xl'} fontWeight={'medium'} >
            {event_detail?.name}</Text>
            </Box>
            <Spacer />
          {event_detail?.id != event?.id && <Button
          px={5}
          py={2}
          _text={{color: 'primary.hovercolor'}}
          leftIcon={ <DynamicIcon iconType="logout" iconProps={{ width: 14, height: 14,color: func.colorType(event?.settings?.primary_color) }} />}
          onPress={()=>{
              window.open(`/${event_detail?.url}`, '_blank')
          }} 
          >
                 
             {event?.labels?.EVENTSITE_LOGIN}
              
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
          <Box  pt={'4'}>
            <RenderHtml
                  defaultTextProps={{selectable:true}}
                  contentWidth={width > 600 ? 600 : width - 90}
                  systemFonts={['Avenir']}
                  tagsStyles={mixedStyle}
                  source={{ html: event_detail?.event_description ?? '' }}
              />
          </Box>
  
          </HStack>
          
        </VStack>
      </VStack>
    )}
   </>
  )
}

export default Index