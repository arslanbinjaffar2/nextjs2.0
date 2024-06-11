import { Box, Button, CheckIcon, Container, HStack, Icon, Image, Input, Modal, Pressable, Select, Text, View, VStack } from 'native-base'
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
import UseEnvService from 'application/store/services/UseEnvService'
import { Link } from 'solito/link'
type ScreenParams = { id: string; cms: string | undefined };
import { createParam } from 'solito';
const { useParam } = createParam<ScreenParams>();
const Index = () => {
    const {push}=useRouter()
  const { event, updateEventDetail, event_detail } = UseEventService();
  const { _env } = UseEnvService()
    const [id] = useParam('id');

React.useEffect(() => {
    if (id) {
        updateEventDetail({ id: Number(id) })
    }
}, [id])
  return (
    <>
    <VStack width={'100%'}>
      <Box flexDirection={'row'} alignItems={'center'} width={'100%'}> 
      <Pressable alignItems={'center'} flexDirection={'row'}
             onPress={()=>{
              push(`/${event.url}/upcoming_events`)
          }} 
      >
        <Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="arrowleft" />
        <Text fontSize={'2xl'} fontWeight={'medium'}>BACK</Text>
        </Pressable>
      
      <Text fontSize={'2xl'} fontWeight={'medium'} textAlign={'center'} width={'calc(100% - 86px)'}>{event_detail?.name}</Text>
      </Box>
      <VStack mt={'4'}>
        {console.log(event_detail,'llll')}
      {
        event_detail?.app_icon ? (
          <Image source={{ uri: `${_env.eventcenter_base_url}/assets/event/branding/${event_detail?.app_icon}` }}  alt="Event Image" size="xl" width={'100%'} height={157}  roundedTop={'md'} />
            ):
            <Image source={{ uri: "https://dev.eventbuizz.com/_admin_assets/images/logo-unavailable-2.png" }}
            bg={'gray.300'}
            alt="Event Image" size="xl" width={'100%'} height={157} rounded={'sm'} /> 
        }
        <HStack  px={6} py={4} bg={'primary.box'} roundedBottom={'md'} flexDirection={'column'}>
          <VStack flexDirection={['column','row']} justifyContent={'space-between'} alignItems={'flex-start'} 

          width={'100%'}
          >   
          <Box width={['100%','calc(100% - 222px)']}>
        <Text fontSize={'xl'} fontWeight={'medium'} >
          {event_detail?.name}</Text>
          </Box>
          <View flexDirection={'row'} alignItems={'center'} mt={'3'} width={['100%','']}>
        <Button 
        bg={'#000000'}
        width={['50%','136px']}
       
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
        width={['50%','86px']}
        height={38} 
        ml={'10px'}
        onPress={()=>{
            console.log('hello')
        }} 
        >
            <Box display={'flex'} alignItems={'center'} flexDirection={'row'}>
                 <DynamicIcon iconType={'register'} iconProps={{ width:17,height:16 }}/>
            <Text ml={'6px'}>Register</Text>
            </Box>
            
        </Button>
        </View>

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
            <Text ml={'6px'} fontSize={'xs'}>{event_detail?.location}</Text>
        </Box>
        <Text pt={'4'}>
          {event_detail?.event_description}
        </Text>
       </HStack> 
      </VStack>
    </VStack>
    <Modal isOpen={false} onClose={() => {}} >
        <Modal.Content maxWidth="480" maxH=" 248">
          <Modal.CloseButton />
          <Modal.Header  borderColor={'transparent'} borderWidth={0} paddingBottom={0}>
            <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
          <DynamicIcon iconType={'Notattending'} iconProps={{ width:24,height:27 }}/>
          <Text fontSize={'2xl'} fontWeight={'medium'}>  Not Attending</Text>
            </Box>
            </Modal.Header>
          <Modal.Body borderColor={'transparent'} borderWidth={0} bg={'primary.box'} paddingTop={'0'}>
            <Text paddingTop={'4'} fontSize={'lg'} fontWeight={'medium'}>Are you sure you don’t want to attend this event?</Text>
            <Text paddingTop={'3'} fontSize={'md'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
          </Modal.Body>
          <Modal.Footer marginTop={'5'} padding={'0'}>
            <Button.Group  w={'100%'} bg={'transparent'} >
              <Button width={'50%'} bg={'transparent'} 
             
              onPress={() => {
            }} > 
            <Text fontSize={'2xl'} fontWeight={'medium'}>
              Cancel
            </Text>
              </Button>
              <Text borderLeftWidth={'1'}></Text>
              <Button width={'50%'} bg={'transparent'} 
             
              onPress={() => {
            }}>
          <Text  fontSize={'2xl'} fontWeight={'medium'}>

                        YES
          </Text>
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>

  )
}

export default Index