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
		}
	}
	
	function getShortName (name: string|undefined){
		if(!name) return ('');
		let names = name.split(' ');
		let shortName = '';
		names.forEach((name, index) => {
			if(index < 2){
				shortName += name.charAt(0).toUpperCase();
			}
		});
		return shortName;
	}

  return (
	<Modal
			size={'md'}
			
			isOpen={isOpen}
			onClose={()=>{
			onClose()
			}}>
					<Modal.Content ref={_element}  bg={'primary.box'}>
						
						<Modal.Header px={6} pt={6} pb={0} bg="primary.box" borderWidth={0} borderColor={'transparent'}>
							<Text fontSize="lg" fontWeight={600}>{title}</Text>
						</Modal.Header>
						<Modal.Body pb={0} bg="primary.box" px={0}>
							<Text mb={3} px={6} fontSize="lg" fontWeight={500}>{message}</Text>
							<VStack  px={6} w={'100%'} py={3} space="1" alignItems="flex-start" bg="primary.darkbox">
								<HStack space={2} alignItems={'center'}><Text  fontSize="sm">Person : {meeting_request?.slot?.meeting_space?.persons}</Text>
								 <HStack  space="1" alignItems="center">
									<Avatar bg={'primary.100'} size={'22px'}
											source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${attendeeToShow?.image}` }}
									>
										<Text fontWeight={600}>
											{getShortName(attendeeToShow?.full_name)}
										</Text>
								</Avatar>
								<Text fontSize="sm">{attendeeToShow?.full_name}</Text>
								
								</HStack>
								</HStack>
								<Text  fontSize="sm">{labels?.RESERVATION_MEETING_SPACE} : {meeting_request?.slot?.meeting_space?.name}</Text>
								<Text  fontSize="sm">{labels?.RESERVATION_MEETING_DATE} : {moment(meeting_request?.slot?.date,'DD-MM-YYYY').format(GENERAL_DATE_FORMAT)}</Text>
							</VStack>
						</Modal.Body>
						<Modal.Footer bg="primary.box" borderColor={'primary.bdColor'} flexDirection={'column'} display={'flex'}  justifyContent={'flex-start'} p={0}>
							<Button.Group variant={'unstyled'} space={0}>
								<Container borderRightWidth={1} borderRightColor={'primary.bdColor'} w="50%">
									<Button bg={'none'} w="100%" rounded={0} variant="unstyled" onPress={onClose} textTransform={'uppercase'}><Icocross  width={19} height={19} /></Button>
								</Container>
								<Container borderRightWidth={0}  w="50%">
									<Button onPress={onAccept} bg={'none'} w="100%" rounded={0} variant="unstyled" textTransform={'uppercase'}><Icocheck width={19} height={19} /></Button>
								</Container>
							</Button.Group>
						</Modal.Footer>
					</Modal.Content>
				</Modal>
	
  )
}

export default ReservationModal