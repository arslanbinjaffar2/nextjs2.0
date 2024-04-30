import * as React from 'react';
import DateTimePicker from 'application/components/atoms/DateTimePicker';
import { Button, Container, HStack, Spacer, Text } from 'native-base';
import MeetingRequestBox from 'application/components/atoms/reservation/MeetingRequestBox';
import useMeetingReservationService from 'application/store/services/UseMeetingReservationService';
import { MeetingRequest } from 'application/models/meetingReservation/MeetingReservation';
import moment from 'moment';

const Index = () => {
const [tab, setTab] = React.useState('all');
const { FetchMyMeetingRequests,my_meeting_listing} = useMeetingReservationService();

const [filteredRequests,setFilteredRequests] = React.useState<MeetingRequest[]>([])
const [dates,setDates] = React.useState<any>([])
const [statuses,setStatuses] = React.useState<any>([]);
const [filterDate,setFilterDate] = React.useState<string>('');
const [dateFormat]= React.useState('DD-MM-YYYY');

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
            Reservation
        </Text>
        <Spacer />
         <DateTimePicker value={filterDate} onChange={setDateFilterValue} key={filterDate} readOnly={false} label={"DD-MM-YYYY"}  />
      </HStack>
      <HStack mb="3" space={1} overflow={'hidden'} rounded={8} flexWrap={'wrap'} justifyContent="center" w="100%">
      <Button 
            onPress={() => {setTab('all')}} 
            borderWidth="0px" 
            py={0} 
            borderColor="primary.darkbox" 
            borderRightRadius="0" 
            borderLeftRadius={0} 
            _hover={{_text: {color: 'primary.hovercolor'}}}
            h="42px"
            flex={1} 
            bg={tab === 'all' ? 'primary.boxbutton' :'primary.box'} 
            _text={{ fontWeight: '600' }}>
          All
        </Button>
        {statuses.map((status:any,k:number) =>
          <Button 
              key={k}
              onPress={() => {setTab(status)}} 
              borderWidth="0px" 
              py={0} 
              borderColor="primary.darkbox" 
              borderRightRadius="0" 
              borderLeftRadius={0} 
              _hover={{_text: {color: 'primary.hovercolor'}}}
              h="42px"
              flex={1} 
              bg={tab === status ? 'primary.boxbutton' :'primary.box'} 
              _text={{ fontWeight: '600' }}>
            {status}
          </Button>
        )}
        {/* <Button 
            onPress={() => {setTab('all')}} 
            borderWidth="0px" 
            py={0} 
            borderColor="primary.darkbox" 
            borderRightRadius="0" 
            borderLeftRadius={0} 
            _hover={{_text: {color: 'primary.hovercolor'}}}
            h="42px"
            flex={1} 
            bg={tab === 'all' ? 'primary.boxbutton' :'primary.box'} 
            _text={{ fontWeight: '600' }}>
          All
        </Button>
        <Button 
            onPress={() => {setTab('accepted')}} 
            borderWidth="0px" 
            py={0} 
            borderColor="primary.boxbutton" 
            borderRightRadius="0" 
            borderLeftRadius={0} 
            _hover={{_text: {color: 'primary.hovercolor'}}}
            h="42px"
            flex={1} 
            bg={tab === 'accepted' ? 'primary.boxbutton' :'primary.box'} 
            _text={{ fontWeight: '600' }}>
          Accepted
        </Button>
        <Button 
            onPress={() => {setTab('rejected')}} 
            borderWidth="0px" 
            py={0} 
            borderColor="primary.boxbutton" 
            borderRightRadius="0" 
            borderLeftRadius={0} 
            _hover={{_text: {color: 'primary.hovercolor'}}}
            h="42px"
            flex={1} 
            bg={tab === 'rejected' ? 'primary.boxbutton' :'primary.box'} 
            _text={{ fontWeight: '600' }}>
          Rejected
        </Button> */}
      </HStack>
      <Container position="relative" mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
        {filteredRequests.length === 0 && <Text textAlign="center" fontSize="lg" fontWeight={500} p="5">No Reservations Found</Text>}
        {filteredRequests.map((request:MeetingRequest,k:number) =>
          <React.Fragment key={k}>
            <MeetingRequestBox meeting_request={request} border={k}/>
          </React.Fragment>
        )}
          {/* {tab === 'all' && <>
              {[...Array(1)].map((item,k) =>
                <React.Fragment key={k}>
                  <MeetingRequestBox  border={k} type='all'/>   
                </React.Fragment>
              )}
          </>}
          {tab === 'accepted' && <>
              {[...Array(5)].map((item,k) =>
                <React.Fragment key={k}>
                  <MeetingRequestBox  border={k} type='accepted'/>   
                </React.Fragment>
              )}
          </>}
          {tab === 'rejected' && <>
              {[...Array(5)].map((item,k) =>
                <React.Fragment key={k}>
                  <MeetingRequestBox  border={k} type='rejected'/>   
                </React.Fragment>
              )}
          </>} */}
      </Container>
      </>
  );

};

export default Index;
