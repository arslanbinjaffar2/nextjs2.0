import * as React from 'react';
import DateTimePicker from 'application/components/atoms/DateTimePicker';
import { Avatar, Box, Button, Container, Flex, HStack, Spacer, Text, View, VStack } from 'native-base';
import MeetingRequestBox from 'application/components/atoms/reservation/MeetingRequestBox';
import useMeetingReservationService from 'application/store/services/UseMeetingReservationService';
import { AvailabilityCalendarSlot, MeetingRequest } from 'application/models/meetingReservation/MeetingReservation';
import UseEventService from 'application/store/services/UseEventService';
import moment from 'moment';
import WebLoading from 'application/components/atoms/WebLoading';
import in_array from 'in_array';
import UseLoadingService from 'application/store/services/UseLoadingService';
import { Platform, Pressable } from 'react-native';
import Icocross from 'application/assets/icons/Icocross';
import ButtonElement from 'application/components/atoms/ButtonElement';
import NextBreadcrumbs from 'application/components/atoms/NextBreadcrumbs';
import NoRecordFound from 'application/components/atoms/NoRecordFound';
import SectionLoading from 'application/components/atoms/SectionLoading';
import BannerAds from 'application/components/atoms/banners/BannerAds';
import { GENERAL_DATE_FORMAT, GENERAL_TIME_FORMAT_WITHOUT_SECONDS } from 'application/utils/Globals';
import DynamicIcon from 'application/utils/DynamicIcon';
import UseEnvService from 'application/store/services/UseEnvService';
import UseAuthService from 'application/store/services/UseAuthService';

const Index = () => {
const [tab, setTab] = React.useState('all');
const { FetchMyMeetingRequests,my_meeting_listing,labels} = useMeetingReservationService();
const { processing } = UseLoadingService();

const [filteredRequests,setFilteredRequests] = React.useState<MeetingRequest[]>([])
const [dates,setDates] = React.useState<any>([])
const [statuses,setStatuses] = React.useState<any>([]);
const [filterDate,setFilterDate] = React.useState<string>('');
const [dateFormat]= React.useState('DD-MM-YYYY');
const { event,modules } = UseEventService();
const [loadCount,setLoadCount] = React.useState<number>(0)
const [showClose,setShowClose]=React.useState<boolean>(false)
  React.useEffect(() => {
      FetchMyMeetingRequests({})
  },[])

  function filterRequests(){
    let requests = my_meeting_listing.my_meeting_requests;
    if(tab !== 'all'){
      requests= requests.filter((item:MeetingRequest) => item.status === tab)
    }

    if(filterDate){
      requests = requests.filter((item:MeetingRequest) => moment(item.slot.date,dateFormat).format(dateFormat) === moment(filterDate,dateFormat).format(dateFormat))
    }
    setFilteredRequests(requests)
  }

  React.useEffect(() => {
    setDates(my_meeting_listing.dates)
    setStatuses(my_meeting_listing.statuses)
    filterRequests();
    if(loadCount < 2){
      setLoadCount(loadCount+1)
    }
  },[my_meeting_listing]) 
  
  React.useEffect(() => {
    filterRequests();
  },[tab,filterDate])

  function setDateFilterValue(date:any){
    console.log('dt filter: ',date)
    if(date === null){
      setFilterDate('')
      return;
    }
    if(date === filterDate){
      return;
    }
    setFilterDate(date.format(dateFormat));
  }

	const module = modules.find((module) => module.alias === 'reservation');

  return (
      <>
      <NextBreadcrumbs module={module} />
      <HStack display={["block","flex"]} mb="3" pt="2" w="100%" space="3" alignItems="center" >
        <Text fontSize="2xl" textAlign={['center','start']} w={['100%','']} >
            {modules.find((module: any, key: number) => module.alias === 'reservation')?.name}
        </Text>
        <Spacer />
        <View position={'relative'} width={['100%','calc(100% - 200px)']} mt={['3','']}>
        <DateTimePicker setClearDate={() => setFilterDate('')} showClearBtn={true} value={filterDate} onChange={setDateFilterValue} key={filterDate} readOnly={false} label={"DD-MM-YYYY"}  />
        </View>

      </HStack>
      <HStack mb="3"  overflow={'hidden'} rounded={8} flexWrap={'wrap'} w="100%" 
      style={{rowGap: 2, columnGap: 1}}     space={0} justifyContent="flex-start" 
      >

       <ButtonElement minW={['calc(50% - 2px)']} 
         onPress={() => {setTab('all')}} 
         borderWidth="0px" 
         py={0} 
         borderColor="primary.darkbox" 
         borderRightRadius="0" 
         borderLeftRadius={0} 
         _hover={{_text: {color: 'primary.hovercolor'}}}
         h="42px"
         flexGrow={1}
         bg={tab === 'all' ? 'primary.boxbutton' :'primary.box'} 
         _text={{ fontWeight: '600' }}
      
       
       >
            {event?.labels?.GENERAL_ALL}
          </ButtonElement>
        {statuses.map((status:any,k:number) =>
          <ButtonElement minW={[    
            'calc(50% - 2px)']} 
              onPress={() => {setTab(status)}} 
              borderWidth="0px" 
              py={0} 
              borderColor="primary.darkbox" 
              borderRightRadius="0" 
              borderLeftRadius={1} 
              _hover={{_text: {color: 'primary.hovercolor'}}}
              h="42px"
              bg={tab === status ? 'primary.boxbutton' :'primary.box'} 
              _text={{ fontWeight: '600' }}
          
          
          >
            {labels?.['RESERVATION_REQUEST_STATUS_' + status]}
          
            
          </ButtonElement>
        )}
        {event?.appointment_settings?.availability_calendar === 1 && <ButtonElement minW={[    
            'calc(50% - 2px)']} 
              onPress={() => {setTab('availability')}} 
              borderWidth="0px" 
              py={0} 
              borderColor="primary.darkbox" 
              borderRightRadius="0" 
              borderLeftRadius={1} 
              _hover={{_text: {color: 'primary.hovercolor'}}}
              h="42px"
              bg={tab === 'availability' ? 'primary.boxbutton' :'primary.box'} 
              _text={{ fontWeight: '600' }}
          
          
          >
            My Availability
          
            
          </ButtonElement>}
        
      </HStack>
      {loadCount < 2 && in_array('my-meeting-requests',processing) ? (
        <SectionLoading />
      ):(
        <Container position="relative" mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
        {tab !== 'availability' && filteredRequests.length === 0 && <NoRecordFound/>}
        {tab !== 'availability' && filteredRequests.map((request:MeetingRequest,k:number) =>
          <React.Fragment key={k}>
            <MeetingRequestBox meeting_request={request} border={k}/>
          </React.Fragment>
        )}
      </Container>
      )}

      {event?.appointment_settings?.availability_calendar === 1 && <Container position="relative" mb="3"  w="100%" maxW="100%">
        <VStack  alignContent="center" alignItems="center" space="5" w="100%">
          {tab === 'availability' && <AddAvailabilityCalendarSlot/>}
          {tab === 'availability' && <AvailabilityCalendar/>}
        </VStack>
      </Container>}

      <BannerAds module_name={'reservation'} module_type={'listing'} />
      </>
  );

};

const AvailabilityCalendar = () => {
  const { my_availability_calendar,FetchMyAvailabilityCalendar,DeleteAvailabilityCalendarSlot } = useMeetingReservationService();
  const { processing } = UseLoadingService();
  React.useEffect(() => {
    FetchMyAvailabilityCalendar()
  },[])
  return (
    <>
    {in_array('fetch-my-availability',processing) ? <SectionLoading h='100px' />:(
      <>
      {my_availability_calendar.length>0 && 
      <VStack bg="primary.400" width={'100%'}  rounded={'lg'} py={1} >
      {my_availability_calendar.map((item:AvailabilityCalendarSlot,k:number,array:any) =>
        <HStack px={4}  py="14"  width={'100%'} justifyContent={'space-between'} alignItems={'flex-start'} key={k} borderBottomWidth={k!==array.length-1?2:0}>
          <View alignItems={'flex-start'}>
          {/* <Text fontSize={'md'} fontWeight={'medium'}>Slot {k+1}</Text> */}
          <View flexDirection={'row'} alignItems={'center'}>
          <Box flexDirection={'row'} alignItems={'center'}>
           <DynamicIcon iconType={'calender_icon'} iconProps={{ width:14,height:15 }}/> 
           <Text fontSize={'md'} fontWeight={'medium'} ml={2}> {moment(item.date).format(GENERAL_DATE_FORMAT)}</Text>
          </Box>
          <Box flexDirection={'row'} alignItems={'center'} ml={4}>
           <DynamicIcon iconType={'clock_icon'} iconProps={{ width:14,height:17}}/> 
           <Text fontSize={'md'} fontWeight={'medium'} ml={2} key={k}> {moment(item.date + ' ' + item.start_time).format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS)} - {moment(item.date + ' ' + item.end_time).format(GENERAL_TIME_FORMAT_WITHOUT_SECONDS)}</Text>
          </Box>
          </View>
          </View>
          {/* <ButtonElement onPress={() => DeleteAvailabilityCalendarSlot({id:item.id})}>
            <Icocross />
          </ButtonElement> */}
          <Pressable
           onPress={() => DeleteAvailabilityCalendarSlot({id:item.id})}
          
          >
            <DynamicIcon iconType={'delete_icon'} iconProps={{ height:18,width:16 }}/>
          </Pressable>
          
        </HStack>
      )}
      </VStack>}
      </>
    )} 
    </>
  )
}

type newAvailabilityCalendarSlot = {
  date:string;
  start_time:string;
  end_time:string;
}

const AddAvailabilityCalendarSlot = () => {
  const { AddAvailabilityCalendarSlot } = useMeetingReservationService();
  const [availability_calendar,setAvailabilityCalendar] = React.useState<newAvailabilityCalendarSlot>({date:'',start_time:'',end_time:''});
  const [showAddForm,setShowAddForm]= React.useState<boolean>(false);
  const {processing}=UseLoadingService();
  const {_env}=UseEnvService()
  const {response}=UseAuthService()
  function add(){
    if(availability_calendar.date === '' || availability_calendar.start_time === '' || availability_calendar.end_time === ''){
      return;
    }
    AddAvailabilityCalendarSlot(availability_calendar)
    setAvailabilityCalendar({date:'',start_time:'',end_time:''});
  }

  return (
    <>
    <View rounded="10" bg="primary.box" p="4" w={'100%'} justifyContent={'space-between'} flexDirection={'row'} alignItems={'center'}>
    <Box flexDirection={'row'} alignItems={'center'}>
    <Avatar w="62px" h="62px" bg="#a5a5a5" source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${response?.attendee_detail?.image}` }}>
    {response?.data?.user?.first_name.charAt(0).toUpperCase() + response?.data?.user?.last_name.charAt(0).toUpperCase()}
    </Avatar>
    <Text   fontSize="lg"fontWeight={'medium'} isTruncated ml={4}>{response?.data?.user?.name}</Text>
    </Box>
    <Button w={["100%",195]} height={38} onPress={() => setShowAddForm(!showAddForm)} p='2' _text={{ fontSize:"md" ,fontWeight:'semibold' }}>
    {showAddForm ? 'Close':'+ Add Availability'}
    </Button>
    </View>
    {showAddForm && <View rounded="10" bg="primary.box" w="100%" p="2" mt={2}>
      <Text fontSize={'2xl'} fontWeight={'medium'} textAlign={'center'}>ADD AVAILABILITY</Text>
    <Box w="100%" rounded="lg" p={6}>
      <HStack  space="3" justifyContent={'space-between'}>
          <View width={['10',100]} flexDirection={'row'} alignItems={'center'}>
          <Text>Date</Text>
          <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>
          </View>
          <DateTimePicker  value={availability_calendar.date} showdate={GENERAL_DATE_FORMAT} onChange={(date:any) => setAvailabilityCalendar({...availability_calendar,date:date.format('DD-MM-YYYY')})} />
      </HStack>
      <HStack  space="3" my={'14px'}>
          <View width={['10',100]} flexDirection={'row'} alignItems={'center'}>
          <Text>Start Time</Text>
          <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>
          </View>
          <DateTimePicker value={availability_calendar.start_time}  showtime={GENERAL_TIME_FORMAT_WITHOUT_SECONDS} showdate={false}  onChange={(time:any) => setAvailabilityCalendar({...availability_calendar,start_time:time.format('HH:mm')})} />
      </HStack>
      <HStack  space="3">
      <View width={['10',100]} flexDirection={'row'} alignItems={'center'}>
          <Text>End Time</Text>
          <Text display={Platform.OS === 'web' ? "inline" : 'flex'} color="red.500">*</Text>
          </View>
          <DateTimePicker value={availability_calendar.end_time} showtime={GENERAL_TIME_FORMAT_WITHOUT_SECONDS} showdate={false} onChange={(time:any) => setAvailabilityCalendar({...availability_calendar,end_time:time.format('HH:mm')})} />
      </HStack>  
      <Button mt={'5'} w={"100%"} height={60}  isDisabled={in_array('add-availability',processing)} onPress={() => {
        add()
        setShowAddForm(false)
        }} p='3' _text={{ fontSize:"2xl" ,fontWeight:'semibold' }} >
        Save
      </Button>  
    </Box>
    </View>}
    </>
  )
}

export default Index;
