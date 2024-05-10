import * as React from 'react';
import DateTimePicker from 'application/components/atoms/DateTimePicker';
import { Button, Container, HStack, Spacer, Text } from 'native-base';
import MeetingRequestBox from 'application/components/atoms/reservation/MeetingRequestBox';
import useMeetingReservationService from 'application/store/services/UseMeetingReservationService';
import { MeetingRequest } from 'application/models/meetingReservation/MeetingReservation';
import UseEventService from 'application/store/services/UseEventService';
import moment from 'moment';
import WebLoading from 'application/components/atoms/WebLoading';
import in_array from 'in_array';
import UseLoadingService from 'application/store/services/UseLoadingService';

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


  return (
      <>
      <HStack display={["block","flex"]} mb="3" pt="2" w="100%" space="3" alignItems="center">
        <Text fontSize="2xl">
            {modules.find((module: any, key: number) => module.alias === 'reservation')?.name}
        </Text>
        <Spacer />
         <DateTimePicker value={filterDate} onChange={setDateFilterValue} key={filterDate} readOnly={false} label={"DD-MM-YYYY"}  />
      </HStack>
      <HStack mb="3" space={2}  overflow={'hidden'} rounded={8} flexWrap={'wrap'} justifyContent="center" w="100%" 
      style={{ rowGap:10 }}
      >
      <Button 
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
            _text={{ fontWeight: '600' }}>
          All
        </Button>
     
        {statuses.map((status:any,k:number) =>

          <Button
              flexGrow={1}
              onPress={() => {setTab(status)}} 
              borderWidth="0px" 
              py={0} 
              borderColor="primary.darkbox" 
              borderRightRadius="0" 
              borderLeftRadius={1} 
              _hover={{_text: {color: 'primary.hovercolor'}}}
              h="42px"
              bg={tab === status ? 'primary.boxbutton' :'primary.box'} 
              _text={{ fontWeight: '600' }}>
                <Text>
            {labels?.['RESERVATION_REQUEST_STATUS_' + status]}
          
                </Text>
          </Button>

        )}
      </HStack>
      {loadCount < 2 && in_array('my-meeting-requests',processing) ? (
        <WebLoading />
      ):(
        <Container position="relative" mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
        {filteredRequests.length === 0 && <Text textAlign="center" fontSize="lg" fontWeight={500} p="5">{event?.labels?.GENERAL_NO_RECORD}</Text>}
        {filteredRequests.map((request:MeetingRequest,k:number) =>
          <React.Fragment key={k}>
            <MeetingRequestBox meeting_request={request} border={k}/>
          </React.Fragment>
        )}
      </Container>
      )}
      </>
  );

};

export default Index;
