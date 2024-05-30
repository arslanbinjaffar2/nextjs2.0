import React from 'react';
import {  Avatar, Button, Container, HStack, Modal, Pressable, ScrollView, Spacer, Text, TextArea, View, VStack } from 'native-base';
import { MeetingAttendee, MeetingRequest } from 'application/models/meetingReservation/MeetingReservation';
import { GENERAL_DATE_FORMAT } from 'application/utils/Globals';
import moment from 'moment';
import Icocheck from 'application/assets/icons/Icocheck';
import Icocross from 'application/assets/icons/Icocross';
import UseMeetingReservationService from 'application/store/services/UseMeetingReservationService';
import UseEnvService from 'application/store/services/UseEnvService';

type ReservationModalProps = {
	onClose: any
	onAccept: any,
	action: any,
	isOpen: boolean,
	meeting_request: MeetingRequest,
	loggedInAttendeeId: number,
}
const ReservationModal = ({isOpen, onClose,meeting_request,loggedInAttendeeId,onAccept,action}: ReservationModalProps) => {
	const [title, setTitle] = React.useState<string>('');
	const [message, setMessage] = React.useState<string>('');
	const {labels}= UseMeetingReservationService();
	const { _env } = UseEnvService();
	const [attendeeToShow,setAttendeeToShow]=React.useState<MeetingAttendee>();
	const _element = React.useRef<HTMLDivElement>() ;
	React.useEffect(() => {
		setTimeout(() => {
			_element.current?.classList.add('add-blur-radius')
		}, 300);
	}, [isOpen])

	function updateAttendeeToShow(){
		setAttendeeToShow(meeting_request?.host_attendee_id === loggedInAttendeeId ? meeting_request?.participant_attendee : meeting_request?.host_attendee);
	}

	React.useEffect(() => {
		updateMessage(action)
		updateAttendeeToShow();
	}
	, [meeting_request])

	const updateMessage = (action: any) => {
		if(action === 'acceptMeeting'){
			setTitle(labels?.RESERVATION_ACCEPT_MEETING_ALERT_TITLE);
			setMessage(labels?.RESERVATION_ACCEPT_MEETING_ALERT_MESSAGE);
		}else if(action === 'rejectMeeting'){
			setTitle(labels?.RESERVATION_REJECT_MEETING_ALERT_TITLE);
			setMessage(labels?.RESERVATION_REJECT_MEETING_ALERT_MESSAGE);
		}else if(action === 'cancelMeeting'){
			setTitle(labels?.RESERVATION_CANCEL_MEETING_ALERT_TITLE);
			setMessage(labels?.RESERVATION_CANCEL_MEETING_ALERT_MESSAGE);
		}else if(action === 'sendReminder'){
			setTitle(labels?.RESERVATION_SEND_REMINDER_ALERT_TITLE);
			setMessage(labels?.RESERVATION_SEND_REMINDER_ALERT_MESSAGE);
		}
	}
	
	function getShortName (){
		let last_name = shouldShow(attendeeToShow?.field_settings?.last_name) ? attendeeToShow?.last_name : '';
		return attendeeToShow?.first_name.charAt(0).toUpperCase() + (last_name ?? '').charAt(0).toUpperCase();
	}

	function shouldShow(field_setting:any){
		if (field_setting?.status === 0){
			return false;
		}

		if (field_setting?.is_private === 1){
			return false;
		}

		return true;
	}

  return (
	<Modal
			size={'md'}
			
			isOpen={isOpen}
			onClose={()=>{
			onClose()
			}}>
					<Modal.Content ref={_element}  bg={'primary.boxsolid'}>
						
						<Modal.Header px={5} py={3} bg="primary.boxsolid" borderWidth={0} borderColor={'transparent'}>
							<Text color={'primary.text'} fontSize="24px" fontWeight={500}>{title}</Text>
						</Modal.Header>
						<Modal.Body pt={0} bg="primary.boxsolid" px={0}>
							<Text color={'primary.text'} mb={3} px={5} fontSize="md" fontWeight={500}>{message}</Text>
							<VStack  px={5} w={'100%'} py={3} pt={0} space="1" alignItems="flex-start">
								<HStack space={3} alignItems={'center'}>
									<Avatar bg={'primary.100'} size={'64px'}
											source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${shouldShow(attendeeToShow?.field_settings?.profile_picture) ? attendeeToShow?.image:''}` }}
									>
											<Text  fontWeight={600}>
												{getShortName()}
											</Text>
									</Avatar>
									<VStack  space="0">
										<Text color={'primary.text'} fontSize={'sm'}><Text color={'primary.text'} fontWeight={600}  fontSize={'sm'}>{labels?.RESERVATION_PERSON} :</Text>{attendeeToShow?.first_name} {shouldShow(attendeeToShow?.field_settings?.last_name) ? attendeeToShow?.last_name : ''}</Text>
										<Text color={'primary.text'}  fontSize={'sm'}><Text color={'primary.text'} fontWeight={600}>{labels?.RESERVATION_MEETING_SPACE}</Text> : {meeting_request?.slot?.meeting_space?.name}</Text>
										<Text color={'primary.text'}  fontSize={'sm'}><Text color={'primary.text'} fontWeight={600}>{labels?.RESERVATION_MEETING_DATE}</Text> : {moment(meeting_request?.slot?.date,'DD-MM-YYYY').format(GENERAL_DATE_FORMAT)}</Text>
									</VStack>
								</HStack>
							</VStack>
						</Modal.Body>
						<Modal.Footer bg="primary.boxsolid" borderColor={'primary.popupbordercolor'} flexDirection={'column'} display={'flex'}  justifyContent={'flex-start'} p={0}>
							<Button.Group variant={'unstyled'} space={0}>
								<Container borderRightWidth={1} borderRightColor={'primary.popupbordercolor'} w="50%">
									<Button py={4} bg={'none'} w="100%" rounded={0} variant="unstyled" onPress={onClose} textTransform={'uppercase'}><Icocross  width={19} height={19} /></Button>
								</Container>
								<Container borderRightWidth={0}  w="50%">
									<Button py={4} onPress={onAccept} bg={'none'} w="100%" rounded={0} variant="unstyled" textTransform={'uppercase'}><Icocheck width={19} height={19} /></Button>
								</Container>
							</Button.Group>
						</Modal.Footer>
					</Modal.Content>
				</Modal>
	
  )
}

export default ReservationModal