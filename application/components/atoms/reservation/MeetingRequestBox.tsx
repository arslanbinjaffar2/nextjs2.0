import React from 'react';
import { Avatar, Box, Center, HStack, IconButton, Spacer, Text, VStack } from 'native-base';
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
import { MeetingAttendee, MeetingRequest } from 'application/models/meetingReservation/MeetingReservation';
import moment from 'moment';
import { GENERAL_DATE_FORMAT } from 'application/utils/Globals';
import UseAuthService from 'application/store/services/UseAuthService';
import UseMeetingReservationService from 'application/store/services/UseMeetingReservationService';
import { useRouter } from 'solito/router';
import { store } from 'application/store/Index';
import { downloadMeetingSlotDetailApi, sendMeetingReminderApi } from 'application/store/api/MeetingReservation.api';
import UseNotificationService from 'application/store/services/UseNotificationService';
import UseEnvService from 'application/store/services/UseEnvService';
import DynamicIcon from 'application/utils/DynamicIcon';

type boxItemProps = {
  border: number,
  meeting_request: MeetingRequest
}

const MeetingRequestBox = ({ border, meeting_request }: boxItemProps) => {
	const { event,modules } = UseEventService()
  	const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
	const [showConfirmation, setShowConfirmation] = React.useState(false);
	const [confirmAction, setConfirmAction] = React.useState<any>(null);
	const {AcceptMeetingRequest,RejectMeetingRequest,CancelMeetingRequest,labels} = UseMeetingReservationService();
	const { push } = useRouter();
	const { response } = UseAuthService();
	const [loggedInAttendeeId]= React.useState(response?.data?.user?.id);
	const [isChatModuleActive]= React.useState(modules?.find((module:any) => module.alias === 'chat') ? true : false);
	const [sendingReminder,setSendingReminder]= React.useState<number>(0);
	const [downloadingCalendar,setDownloadingCalendar]= React.useState<number>(0);
	const {AddNotification} = UseNotificationService();
	const { _env } = UseEnvService();
	const [attendeeToShow,setAttendeeToShow]=React.useState<MeetingAttendee>(meeting_request?.host_attendee_id === loggedInAttendeeId ? meeting_request?.participant_attendee : meeting_request?.host_attendee);
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
		  setDownloadingCalendar(meeting_request?.id)
		  const response = await downloadMeetingSlotDetailApi({slot_id: slot_id}, mystate); // Call the API function
		  downloadFile(response.data,'meeting_slot_detail.ics');
		  setDownloadingCalendar(0)
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

	async function sendMeetingReminder(){
		const mystate = store.getState();
		try {
			setSendingReminder(meeting_request?.id)
		  const response = await sendMeetingReminderApi({meeting_request_id:meeting_request?.id}, mystate); // Call the API function
		  if(response.status === 200){
			setSendingReminder(0)
			AddNotification({notification:{
				type:'reservation',
				title:labels?.RESERVATION_EMAIL_SENT_TITLE,
				text: labels?.RESERVATION_EMAIL_SENT_MSG,
			  }
			})
		  }
		} catch (error) {
		  console.log('error', error);
		}
	}

	function reScheduleMeeting(){
		push(`/${event.url}/reservation/${attendeeToShow?.id}`);
	}
	
	const onConfirm = () => {
		if(confirmAction === 'acceptMeeting'){
			acceptMeeting()
		}else if(confirmAction === 'rejectMeeting'){
			rejectMeeting()
		}else if(confirmAction === 'cancelMeeting'){
			cancelMeeting()
		}
		handleClose();
	}

	const handleClose = () => {
		setShowConfirmation(false)
	}

	function getAttendeeAvatarName(){
		return attendeeToShow?.first_name.charAt(0).toUpperCase() + attendeeToShow?.last_name.charAt(0).toUpperCase();
	}

  return (
    <Box w="100%" borderTopWidth={border === 0 ? 0 : 1} borderColor="primary.bordercolor" p="4">
        <HStack  space="3" alignItems="center">
            <HStack  space="3" alignItems="center">
				<Avatar 
					
						source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${attendeeToShow?.image}` }}
						// uri:"https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg"
					>
					{getAttendeeAvatarName()}
				</Avatar>
							
				<Center>
					<VStack  space="1">
						<Text fontSize="lg" fontWeight={500}>{attendeeToShow?.full_name}</Text>
						<HStack  space="3" alignItems="center">
							<HStack  space="2" alignItems="center">
								<Icocalendar width={16} height={18} /><Text fontSize="16px">{moment(meeting_request?.slot?.date,'DD-MM-YYYY').format(GENERAL_DATE_FORMAT)}</Text>
							</HStack>
							<HStack  space="2" alignItems="center">
								<Icoclock width={16} height={18} /><Text fontSize="16px">{meeting_request?.slot?.start_time} - {meeting_request?.slot?.end_time} ({meeting_request?.slot?.duration})</Text>
							</HStack>
							
						</HStack>
							<HStack  space="2" alignItems="center">
								<Icopin width={16} height={18} />
								<Text fontSize="16px">
									{meeting_request?.slot?.meeting_space?.name}
								</Text>
								<Text fontSize="16px" color={meeting_request?.status === 'requested'?"#0D6EFD":meeting_request?.status === 'accepted'?"#198754":
									meeting_request?.status === 'rejected'?"#DC3545":meeting_request?.status === 'cancelled'?"#DC3545":""
								}>
									
									{labels?.['RESERVATION_REQUEST_STATUS_' + meeting_request?.status]}
								</Text>
							</HStack>
					</VStack>
				</Center>
							
			</HStack>			
            <Spacer />
			<HStack  space="1" alignItems="center">
				{meeting_request?.status === 'requested' && loggedInAttendeeId === meeting_request?.participant_attendee_id && (
					<>
						{/* Accept Icon */}
							<IconButton p={1} variant="unstyled"
								icon={<Icoaccept color={colors.text} width={19} height={19} />}
								onPress={()=>{
									setConfirmAction('acceptMeeting')
									setShowConfirmation(true)
								}}/>
						{/* Reject Icon */}
							<IconButton p={1} variant="unstyled"
								icon={<Icoreject color={colors.text} width={19} height={19} />}
								onPress={()=>{
									setConfirmAction('rejectMeeting')
									setShowConfirmation(true)
								}} />
					</>
				)}
				{meeting_request?.status === 'accepted' && (
					<>
						{isChatModuleActive && (
							<>
							{/* Chat Icon */}
							<IconButton p={1} variant="unstyled"
								icon={<DynamicIcon iconType="chat" iconProps={{ width: 19, height: 19 }} />}
								onPress={()=>{
									push(`/${event.url}/chat/${attendeeToShow?.id}`);
								}} />
							
							</>
						)}
						{/* Cancel Icon */}
							<IconButton p={1} variant="unstyled"
								icon={<Icoreject color={colors.text} width={19} height={19} />}
								onPress={()=>{
									setConfirmAction('cancelMeeting')
									setShowConfirmation(true)
								}} />
						{/* Add To Calendar Icon */}
							<IconButton isDisabled={downloadingCalendar === meeting_request?.id ? true:false} p={1} variant="unstyled"
								icon={<Icoaddcalendar color={colors.text} width={19} height={19} />}
								onPress={()=>{addToCalender()}}
							/>
						{/* Send Email Icon */}
							<IconButton isDisabled={sendingReminder === meeting_request?.id ? true :false} p={1} variant="unstyled"
								icon={<Icosendemail color={colors.text} width={19} height={19} />}
								onPress={()=>{
									sendMeetingReminder()
								}}
							/>
					</>
				)}

				{meeting_request?.status === 'rejected' && (
					<>
						{/* Re Schedule Icon */}
							<IconButton p={1} variant="unstyled"
								icon={<RescheduleIcon color={colors.text} width={19} height={19} />}
								onPress={()=>{reScheduleMeeting()}}
							/>
					</>
				)}
			</HStack>
        </HStack>
        {showConfirmation && <ReservationModal meeting_request={meeting_request} onClose={handleClose} onAccept={onConfirm} action={confirmAction} loggedInAttendeeId={loggedInAttendeeId} isOpen={showConfirmation} />}
    </Box>
  )
}

export default MeetingRequestBox