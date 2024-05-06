import React from 'react';
import { Avatar, Box, Center, HStack, IconButton, Spacer, Text, Tooltip, VStack } from 'native-base';
import Icocalendar from 'application/assets/icons/small/Icocalendar'
import Icoclock from 'application/assets/icons/small/Icoclock'
import Icopin from 'application/assets/icons/small/Icopin'
import Icoaccept from 'application/assets/icons/small/Icoaccept'
import Icoreject from 'application/assets/icons/small/Icoreject'
import Icosendemail from 'application/assets/icons/small/Icosendemail'
import Icoaddcalendar from 'application/assets/icons/small/Icoaddcalendar'
import RescheduleIcon from 'application/assets/icons/reschedule';
import ReservationModal from 'application/components/atoms/reservation/ReservationModal';
import { getColorScheme } from 'application/styles/colors';
import UseEventService from 'application/store/services/UseEventService';
import { MeetingRequest } from 'application/models/meetingReservation/MeetingReservation';
import moment from 'moment';
import { GENERAL_DATE_FORMAT } from 'application/utils/Globals';
import UseAuthService from 'application/store/services/UseAuthService';
import UseMeetingReservationService from 'application/store/services/UseMeetingReservationService';
import { useRouter } from 'solito/router';
import { store } from 'application/store/Index';
import { downloadMeetingSlotDetailApi } from 'application/store/api/MeetingReservation.api';

type boxItemProps = {
  border: number,
  meeting_request: MeetingRequest
}

const MeetingRequestBox = ({ border, meeting_request }: boxItemProps) => {
	const { event } = UseEventService()
  	const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
	const [showConfirmation, setShowConfirmation] = React.useState(false);
	const [confirmAction, setConfirmAction] = React.useState<any>(null);
	const {AcceptMeetingRequest,RejectMeetingRequest,CancelMeetingRequest,SendReminder} = UseMeetingReservationService();
	const { push } = useRouter();
	const { response } = UseAuthService();
	const [loggedInAttendeeId]= React.useState(response?.data?.user?.id);
	const [isChatModuleActive]= React.useState(false);

	function acceptMeeting(){
		AcceptMeetingRequest({meeting_request_id:meeting_request.id})
	}
	
	function rejectMeeting(){
		RejectMeetingRequest({meeting_request_id:meeting_request.id})
	}

	function cancelMeeting(){
		CancelMeetingRequest({meeting_request_id:meeting_request.id})
	}

	async function downloadCalendarFile(slot_id:number){
		const mystate = store.getState();
		try {
		  const response = await downloadMeetingSlotDetailApi({slot_id: slot_id}, mystate); // Call the API function
		  downloadFile(response.data,'meeting_slot_detail.ics');
		} catch (error) {
		  console.log('error', error);
		}
	}
	  
	const downloadFile = (fileData: any, filename: any) => {
		const blob = new Blob([fileData], { type: 'application/octet-stream' });
		const url = window.URL.createObjectURL(blob);
		const anchorElement = document.createElement('a');
		anchorElement.href = url;
		anchorElement.download = filename;
		anchorElement.style.display = 'none';
		document.body.appendChild(anchorElement);
		anchorElement.click();
		document.body.removeChild(anchorElement);
		window.URL.revokeObjectURL(url);
	};

	function addToCalender(){
		downloadCalendarFile(meeting_request?.event_meeting_space_slot_id)
	}

	function sendMeetingReminder(){
		SendReminder({meeting_request_id:meeting_request.id})
	}

	function reScheduleMeeting(){
		let attendeeId=meeting_request?.host_attendee_id === loggedInAttendeeId ? meeting_request?.participant_attendee_id : meeting_request?.host_attendee_id
		push(`/${event.url}/reservation/${attendeeId}`);
	}
	
	const onConfirm = () => {
		if(confirmAction === 'acceptMeeting'){
			acceptMeeting()
		}else if(confirmAction === 'rejectMeeting'){
			rejectMeeting()
		}else if(confirmAction === 'cancelMeeting'){
			cancelMeeting()
		}else if(confirmAction === 'sendMeetingReminder'){
			sendMeetingReminder()
		}
		handleClose();
	}

	const handleClose = () => {
		setShowConfirmation(false)
	}

	function getAttendeeFullName(){
		return meeting_request?.host_attendee_id === loggedInAttendeeId ? meeting_request?.participant_attendee.full_name : meeting_request?.host_attendee.full_name
	}

	function getAttendeeAvatarName(){
		if(meeting_request?.host_attendee_id === loggedInAttendeeId){
			return meeting_request?.participant_attendee.first_name.charAt(0).toUpperCase() + meeting_request?.participant_attendee.last_name.charAt(0).toUpperCase()
		}else{
			return meeting_request?.host_attendee.first_name.charAt(0).toUpperCase() + meeting_request?.host_attendee.last_name.charAt(0).toUpperCase()	
		}
	}

  return (
    <Box w="100%" borderTopWidth={border === 0 ? 0 : 1} borderColor="primary.bordercolor" p="4">
        <HStack  space="3" alignItems="center">
            <HStack  space="3" alignItems="center">
				<Avatar 
					source={{
						uri:"https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg"
					}}>
					{getAttendeeAvatarName()}
				</Avatar>
							
				<Center>
					<VStack  space="1">
						<Text fontSize="lg" fontWeight={500}>{getAttendeeFullName()}</Text>
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
									setConfirmAction('acceptMeeting')
									setShowConfirmation(true)
								}}/>
						</Tooltip>
						{/* Reject Icon */}
						<Tooltip px={5} rounded={'full'} label="Reject" openDelay={100} bg="primary.box" _text={{color: 'primary.text'}}>
							<IconButton p={1} variant="unstyled"
								icon={<Icoreject color={'red'} width={19} height={19} />}
								onPress={()=>{
									setConfirmAction('rejectMeeting')
									setShowConfirmation(true)
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
						<Tooltip px={5} rounded={'full'} label="Cancel" openDelay={100} bg="primary.box" _text={{color: 'primary.text'}}>
							<IconButton p={1} variant="unstyled"
								icon={<Icoreject color={'red'} width={19} height={19} />}
								onPress={()=>{
									setConfirmAction('cancelMeeting')
									setShowConfirmation(true)
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
								onPress={()=>{
									setConfirmAction('sendMeetingReminder')
									setShowConfirmation(true)
								}}
							/>
						</Tooltip>
					</>
				)}

				{meeting_request?.status === 'rejected' && (
					<>
						{/* Re Schedule Icon */}
						<Tooltip px={5} rounded={'full'} label="Re Schedule" openDelay={100} bg="primary.box" _text={{color: 'primary.text'}}>
							<IconButton p={1} variant="unstyled"
								icon={<RescheduleIcon color={colors.text} width={19} height={19} />}
								onPress={()=>{reScheduleMeeting()}}
							/>
						</Tooltip>
					</>
				)}
			</HStack>
        </HStack>
        {showConfirmation && <ReservationModal meeting_request={meeting_request} onClose={handleClose} onAccept={onConfirm} action={confirmAction} title="hello" message="hello" isOpen={showConfirmation} />}
    </Box>
  )
}

export default MeetingRequestBox