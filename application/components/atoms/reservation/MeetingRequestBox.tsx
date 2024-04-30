import React from 'react';
import { Avatar, Box, Center, HStack, IconButton, Spacer, Text, Tooltip, VStack } from 'native-base';
import Icocalendar from 'application/assets/icons/small/Icocalendar'
import Icoclock from 'application/assets/icons/small/Icoclock'
import Icopin from 'application/assets/icons/small/Icopin'
import Icoaccept from 'application/assets/icons/small/Icoaccept'
import Icoreject from 'application/assets/icons/small/Icoreject'
import Icosendemail from 'application/assets/icons/small/Icosendemail'
import Icoaddcalendar from 'application/assets/icons/small/Icoaddcalendar'
import ReservationModal from 'application/components/atoms/reservation/ReservationModal';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
import { MeetingRequest } from 'application/models/meetingReservation/MeetingReservation';
import moment from 'moment';
import { GENERAL_DATE_FORMAT } from 'application/utils/Globals';
import UseAuthService from 'application/store/services/UseAuthService';


type boxItemProps = {
  border: number,
  meeting_request: MeetingRequest
}

const MeetingRequestBox = ({ border, meeting_request }: boxItemProps) => {
	const { event } = UseEventService()
  	const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
	const [toggle, settoggle] = React.useState(false);
	const handleClose = () => {
		settoggle(false)
	}
	const { response } = UseAuthService();
	const [loggedInAttendeeId]= React.useState(response?.data?.user?.id);
	const [isChatModuleActive]= React.useState(false);

	function acceptMeeting(){
		alert('accept meeting api call here');
	}
	
	function rejectMeeting(){
		alert('reject meeting api call here');
	}

	function cancelMeeting(){
		alert('cancel meeting api call here');
	}

	function addToCalender(){
		alert('add to calender api call here');
	}

	function sendReminder(){
		alert('send reminder api call here');
	}
	

  return (
    <Box w="100%" borderTopWidth={border === 0 ? 0 : 1} borderColor="primary.bordercolor" p="4">
        <HStack  space="3" alignItems="center">
            <HStack  space="3" alignItems="center">
				<Avatar 
					source={{
						uri:"https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg"
					}}>
					SS
				</Avatar>
							
				<Center>
					<VStack  space="1">
						<Text fontSize="lg" fontWeight={500}>{meeting_request?.host_attendee_id === loggedInAttendeeId ? meeting_request?.participant_attendee.full_name : meeting_request?.host_attendee.full_name}</Text>
						<HStack  space="3" alignItems="center">
							<HStack  space="2" alignItems="center">
								<Icocalendar width={16} height={18} /><Text fontSize="16px">{moment(meeting_request?.slot?.date,'DD-MM-YYYY').format(GENERAL_DATE_FORMAT)}</Text>
							</HStack>
							<HStack  space="2" alignItems="center">
								<Icoclock width={16} height={18} /><Text fontSize="16px">{meeting_request?.slot?.start_time} - {meeting_request?.slot?.end_time} ({meeting_request?.slot?.duration})</Text>
							</HStack>
							
						</HStack>
							<HStack  space="2" alignItems="center">
								<Icopin width={16} height={18} /><Text fontSize="16px">{meeting_request?.slot?.meeting_space?.name}</Text>
							</HStack>
					</VStack>
				</Center>
							
			</HStack>			
            <Spacer />
			<HStack  space="1" alignItems="center">
				{meeting_request?.status === 'requested' && loggedInAttendeeId === meeting_request?.participant_attendee_id && (
					<>
						{/* Accept Icon */}
						<Tooltip px={5} rounded={'full'} label="Accept" openDelay={100} bg="primary.box" _text={{color: 'primary.text'}}>
							<IconButton p={1} variant="unstyled"
								icon={<Icoaccept color={event?.settings?.secondary_color} width={19} height={19} />}
								onPress={()=>{
									settoggle(true)
								}}/>
						</Tooltip>
						{/* Reject Icon */}
						<Tooltip px={5} rounded={'full'} label="Reject" openDelay={100} bg="primary.box" _text={{color: 'primary.text'}}>
							<IconButton p={1} variant="unstyled"
								icon={<Icoreject color={'red'} width={19} height={19} />}
								onPress={()=>{
									rejectMeeting()
								}} />
						</Tooltip>
					</>
				)}
				{meeting_request?.status === 'accepted' && (
					<>
						{isChatModuleActive && (
							{/* Chat Icon */}
						)}
						{/* Cancel Icon */}
						<Tooltip px={5} rounded={'full'} label="Reject" openDelay={100} bg="primary.box" _text={{color: 'primary.text'}}>
							<IconButton p={1} variant="unstyled"
								icon={<Icoreject color={'red'} width={19} height={19} />}
								onPress={()=>{
									cancelMeeting()
								}} />
						</Tooltip>
						{/* Add To Calendar Icon */}
						<Tooltip px={5} rounded={'full'} label="Add calendar" openDelay={100} bg="primary.box" _text={{color: 'primary.text'}}>
							<IconButton p={1} variant="unstyled"
								icon={<Icoaddcalendar color={colors.text} width={19} height={19} />}
								onPress={()=>{addToCalender()}}
							/>
						</Tooltip>
						{/* Send Email Icon */}
						<Tooltip px={5} rounded={'full'} label="Send email" openDelay={100} bg="primary.box" _text={{color: 'primary.text'}}>
							<IconButton p={1} variant="unstyled"
								icon={<Icosendemail color={colors.text} width={19} height={19} />}
								onPress={()=>{sendReminder()}}
							/>
						</Tooltip>
					</>
				)}

				{meeting_request?.status === 'rejected' && (
					<>
						{/* Re Schedule Icon */}
					</>
				)}
			</HStack>
        </HStack>
        {toggle && <ReservationModal onClose={handleClose} isOpen={toggle} />}
    </Box>
  )
}

export default MeetingRequestBox