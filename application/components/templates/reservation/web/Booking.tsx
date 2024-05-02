import React, { useState } from 'react'
import { Box, Button, Center, Container, Flex, Heading, HStack, Icon, IconButton, Modal, Pressable, ScrollView, Spacer, Text, TextArea, View, VStack } from 'native-base';
import DynamicIcon from 'application/utils/DynamicIcon';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Detail } from 'application/models/attendee/Detail';
import UseEventService from 'application/store/services/UseEventService';
import { useRouter } from 'solito/router';
import { createParam } from 'solito';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import SectionLoading from 'application/components/atoms/SectionLoading';
import UseAuthService from 'application/store/services/UseAuthService';
import AntDesign from '@expo/vector-icons/AntDesign';
import UseEnvService from 'application/store/services/UseEnvService';
import LoadImage from 'application/components/atoms/LoadImage';
import UseMeetingReservationService from 'application/store/services/UseMeetingReservationService';
import moment, { months } from 'moment';
import { MeetingAttendee, MeetingSlot } from 'application/models/meetingReservation/MeetingReservation';
import { GENERAL_DATE_FORMAT } from 'application/utils/Globals';
import in_array from 'in_array';
import { store } from 'application/store/Index';
import { bookMeetingSlotApi } from 'application/store/api/MeetingReservation.api';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getAttendeeDetailApi } from 'application/store/api/Attendee.Api';

type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

type AppProps = {
    detail: Detail,
}

type SlotsListProps = {
    slots: MeetingSlot[],
	slotBooked: (slotId:number) => void
}

const SlotsList = ({slots,slotBooked}: SlotsListProps) => {
	const [selectedSlot, setSelectedSlot] = useState<MeetingSlot | null>(null);
	const [activeSlot, setActiveSlot] = useState<Number | null>(null);
	const [attendee, setAttendee] = useState<MeetingAttendee | null >(null);
	const [bookingSlot,setBookingSlot] = useState<boolean>(false);

	const [attendeeId] = useParam('id');

	async function getAttendee(){
		const mystate=store.getState()
		try {
			const response = await getAttendeeDetailApi({id:attendeeId},mystate);
			if(response?.status == 200){
				setAttendee(response?.data?.data?.detail);
			}
		} catch (error) {
			console.log('error', error);
		}
	}

	React.useEffect(() => {
		// if(attendeeId){
		// 	// setAttendee()
		// }else{
		// 	setAttendee(null);
		// }
		getAttendee();
		console.log('attendeeId:',attendeeId);
	}
	, [attendeeId]);

	async function bookSlot(slot:MeetingSlot){
			const mystate=store.getState()
			setBookingSlot(true);
			try {
				const response = await bookMeetingSlotApi({slot_id:slot.id,participant_attendee_id:attendeeId},mystate);
				console.log('response data:',response.data);
				if(response?.data?.success == true){
					slotBooked(slot.id)
					setSelectedSlot(null);
					setBookingSlot(false);
					alert('Meeting request sent successfully');
				}
			} catch (error) {
			  	console.log('error', error);
			}
	}

	return(
		<>
		{slots.map((slot:MeetingSlot) => (
			<React.Fragment key={slot.id}>
				{ slot.id === activeSlot ? (
					<HStack mb="2" space={1} w="100%" >
						<Center  flex="1">
							<Button px={1} py={2} size={'sm'} bg={'primary.darkbox'} w={'100%'}
								onPress={()=>{}}
							> {slot?.start_time} - {slot?.end_time}</Button>
						</Center>
						<Center flex="1">
							<Button w={'100%'} px={1} py={2} size={'sm'}
								onPress={()=>{
									setSelectedSlot(slot)
								}}
							>Book</Button>
						</Center>
					</HStack>
				) :(
					<Button w={'100%'} size={'sm'} bg={'transparent'} mb={2} rounded={8} px={2} py={2} borderWidth={1} borderColor={'primary.box'}
						onPress={()=>{
							setActiveSlot(slot.id)
						}}
					>{slot?.start_time} - {slot?.end_time}</Button>
				)}
			</React.Fragment>
		)
		)}
		
		{/* Confirmation popup  */}
		{selectedSlot && (
					<Modal size={'lg'} isOpen={true} onClose={()=>{}} >
						<Modal.Content  bg={'primary.box'}>
							
							<Modal.Header pb={0} bg="primary.box" borderWidth={0} borderColor={'transparent'}>
								<Text fontSize="lg" fontWeight={600}>Book a meeting</Text>
							</Modal.Header>
							<Modal.Body bg="primary.box" px={0}>
								<Text mb={2} px={4} fontSize="md">Are you sure you want to send meeting request to this attendee “{attendee?.email}”</Text>
								<VStack mb={2} px={4} w={'100%'} py={2} space="1" alignItems="flex-start" bg="primary.darkbox">
									<Text  fontSize="sm">Meeting space : {selectedSlot?.meeting_space?.name}</Text>
									<Text  fontSize="sm">Meeting date : {moment(selectedSlot?.date,'DD-MM-YYYY').format(GENERAL_DATE_FORMAT)}</Text>
									<Text  fontSize="sm">Meeting time : {selectedSlot?.start_time} - {selectedSlot?.end_time} ({selectedSlot?.duration})</Text>
								</VStack>
								<VStack mb={2} px={4} w={'100%'} py={2} space="1" alignItems="flex-start">
									<Text  fontSize="md">Message</Text>
									<TextArea autoCompleteType={false} w="100%" h={120} placeholder="Please write your message here …" bg={'primary.darkbox'} color={'primary.text'} fontSize={'sm'}  />
									
								</VStack>
								
							</Modal.Body>
							<Modal.Footer bg="primary.box" borderColor={'primary.bdColor'} flexDirection={'column'} display={'flex'}  justifyContent={'flex-start'} p={0}>
								<Button.Group variant={'unstyled'} space={0}>
									<Container borderRightWidth={1} borderRightColor={'primary.bdColor'} w="50%">
										<Button bg={'none'} w="100%" rounded={0} variant="unstyled" onPress={() => setSelectedSlot(null)} textTransform={'uppercase'}>Close</Button>
									</Container>
									<Container borderRightWidth={0}  w="50%">
										<Button isDisabled={bookingSlot ? true:false} bg={'none'} w="100%" rounded={0} variant="unstyled" textTransform={'uppercase'}
										onPress={()=>{ bookSlot(selectedSlot) }} 
										>Send</Button>
									</Container>
								</Button.Group>
							</Modal.Footer>
						</Modal.Content>
					</Modal>
				)}
		</>
	)
}

type AvailableDate = { day: number, month:number, year :number,full_date: string }

const BookingSection = () => {

		const [year, setYear] = useState(new Date().getFullYear());
		const [month, setMonth] = useState(moment().month());
		const [activeDay, setActiveDay] = useState<AvailableDate | null>(null);
		const {FetchAvailableSlots,available_slots,available_dates} = UseMeetingReservationService();
		const [filteredSlots, setFilteredSlots] = useState<MeetingSlot[]>([]);
		const fullDateFormat = 'YYYY-MM-DD';
		const [bookedSlots, setBookedSlots] = useState<number[]>([]);

		
		

		React.useEffect(() => {			
			if(available_dates && available_dates.length > 0){
				let newDates: AvailableDate[] = [];
				available_dates.map((date:any)=>{
					let tempDate=moment(date.full_date);
					newDates.push({
						day: Number(tempDate.format('DD')),
						month: Number(tempDate.format('MM')),
						year: Number(tempDate.format('YYYY')),
						full_date: tempDate.format(fullDateFormat)
					});
					
				})
				setDates(newDates)
			}
			
		}
		, [available_dates]);

		React.useEffect(() => {
			let tempSlots: MeetingSlot[] = [];
			activeDay && available_slots.map((slot:MeetingSlot)=>{
				if(moment(slot.date,'DD/MM/YYYY').format(fullDateFormat) === moment(activeDay?.full_date).format(fullDateFormat) && !in_array(slot.id,bookedSlots)){
					tempSlots.push(slot);
				}
			})
			setFilteredSlots(tempSlots);
		}
		, [available_slots,activeDay,bookedSlots]);

		const [dates, setDates] = useState<AvailableDate[]>([]);

		function addActiveDay(day: number) {
			const date = dates.find((e:AvailableDate) => e.day === day && e.month == Number(moment().month(month).format("MM")));
			if(date){
				setActiveDay(date);
			}
		}

		function slotBooked(slotId:number){
			setBookedSlots([...bookedSlots,slotId]);
		}

		const nextMonth = () => {
			if (month <= 10) {
				setMonth(month + 1);
			} else {
				setYear(year + 1);
				setMonth(0);
			}
		}
		const PrevMonth = () => {
			if (month >= 1 ) {
				setMonth(month - 1);
			} else {
					setYear(year - 1);
					setMonth(11);
			}
		}

		const isExtraDays = (week: any, date: any) => {
    if (week === 0 && date > 10) {
      return true;
    } else if (week === 5 && date < 10) {
      return true;
    } else if (week === 4 && date < 10) {
      return true;
    } else {
      return false;
    }
  };

  //function to get all days by week
  const getDate = (month: any) => {
    var calendar = [];

    const startDate = moment([year, month])
      .clone()
      .startOf("month")
      .startOf("week");

    const endDate = moment([year, month]).clone().endOf("month");

    const day = startDate.clone().subtract(1, "day");

    // looping a month by a week
    while (day.isBefore(endDate, "day")) {
      calendar.push(
        Array(7)
          .fill(0)
          .map(() => day.add(1, "day").clone().format("DD"))
      );
    }

    if (calendar.length > 0) {
      return calendar.map((week, index) => (
        <Flex w="100%"  py="1" flexWrap={'wrap'}  direction="row">
          {week.map((day) => (
						<>
						
							<Center key={day} flex={1} py="1">
								{isExtraDays(index, day) ? (
                  <Text></Text>
                ) : (
                 (dates.some((e:AvailableDate) => e.day === Number(day) && e.month == Number(moment().month(month).format("MM"))) ?  <Button
									size={'md'}
									rounded={'50%'}
									p={0}
									w={'30px'}
									h={'30px'}
									colorScheme="unstyled"
									bg={activeDay && Number(day) == activeDay.day ? 'primary.500' : 'transparent'}
									onPress={()=>{
										addActiveDay(Number(day));
									}}
								
								>
									{day}
								</Button> : <Text opacity={0.5} fontSize="md">{day}</Text>)
                )}
								
					</Center>
						</>
          ))}
        </Flex>
      ));
    }
  };


return (
<>
<HStack  w="100%" space="1">
    <Center bg="primary.box" pb="5" alignItems={'flex-start'} justifyContent={'flex-start'} w="65%">
        <HStack w="100%" px="5" py="4" space="0" alignItems="center">
            <Center>
                <IconButton
										size={'sm'}
                    variant="solid"
										rounded={'50%'}
										bg={'primary.darkbox'}
                    icon={<Icon size="sm" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
                    onPress={PrevMonth}
                    
                />
            </Center>
            <Spacer />
            <Center><Text fontSize="md">{moment().month(month).format("MMMM")} {year}</Text></Center>
            <Spacer />
            <Center>
                <IconButton
                    variant="solid"
										size={'sm'}
										rounded={'50%'}
										bg={'primary.darkbox'}
                    icon={<Icon size="sm" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
                    onPress={nextMonth}/>
            </Center>
        </HStack>
				<HStack  borderWidth={1} borderColor={'primary.darkbox'} borderLeftWidth={0} borderRightWidth={0} w="100%" px="3" py="3"  space="0"  alignItems="center">
					<Center flex={1}><Text fontSize="md">Sun</Text></Center>
					<Center flex={1}><Text fontSize="md">Mon</Text></Center>
					<Center flex={1}><Text fontSize="md">Tue</Text></Center>
					<Center flex={1}><Text fontSize="md">Wed</Text></Center>
					<Center flex={1}><Text fontSize="md">Thu</Text></Center>
					<Center flex={1}><Text fontSize="md">Fri</Text></Center>
					<Center flex={1}><Text fontSize="md">Sat</Text></Center>
				</HStack>
				<Flex p="3" w="100%" flexWrap={'wrap'}  direction="row">
					{getDate(month)}
					
				</Flex>
				
    </Center>
    <Center alignItems={'flex-start'} justifyContent={'flex-start'} bg="primary.box" w="35%">
			{
				activeDay && 
				<Center py="3" px="2" alignItems={'flex-start'} justifyContent={'flex-start'} w="100%" >
					<Text mb={2} fontSize="sm">
						<>
							{moment(activeDay.full_date).format("DD MMMM")}
						</>
					</Text>
					<ScrollView w={'100%'} maxHeight={320}>
						<SlotsList slots={filteredSlots} slotBooked={slotBooked} />
					</ScrollView>
					
				</Center>
				
			}

    </Center>
</HStack>

</>
)
}


const RectangleView = () => {
    const { loading,processing } = UseLoadingService();
    const { FetchHotels, hotels } = UseAttendeeService();
    const { event } = UseEventService();
    const { push } = useRouter()
    const [_id] = useParam('id');
    const { response } = UseAuthService();
    const { _env } = UseEnvService();

	const {FetchAvailableSlots} = UseMeetingReservationService();

	React.useEffect(() => {
		FetchAvailableSlots()
	}
	, []);

  

    return (
        <>
            <HStack mb="3" pt="2" w="100%" space="3" alignItems="center" justifyContent={'space-between'}>
                <Pressable onPress={()=> push(`/${event.url}/attendees`)}>
                    <HStack space="3" alignItems="center">
                        <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
                        <Text fontSize="2xl">BACK</Text>
                    </HStack>
                </Pressable>
            </HStack>
			<Container borderWidth="1px" bg={'primary.box'} borderColor="primary.darkbox" rounded="8" overflow="hidden" mb="3" maxW="100%" w="100%">
                <Center bg={'primary.darkbox'} w="100%" px="3" roundedTop={8} py="1">
                    <HStack w="100%" space="2" alignItems="center">
                        <Icon size="md" as={SimpleLineIcons} name="clock" color="primary.text" />
                        <Text fontSize="md">Select date and time</Text>
                    </HStack>
                </Center>
				
				{in_array('get-available-slots',processing) ? (
					<SectionLoading />
				):<BookingSection />}

            </Container>        
        </>
    )

}

export default RectangleView