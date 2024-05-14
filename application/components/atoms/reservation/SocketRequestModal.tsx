import React, { useState } from 'react';
import {  Avatar, Button, Container, HStack, Modal, Pressable, ScrollView, Spacer, Text, TextArea, View, VStack } from 'native-base';
import { MeetingAttendee, MeetingRequest } from 'application/models/meetingReservation/MeetingReservation';
import { GENERAL_DATE_FORMAT } from 'application/utils/Globals';
import moment from 'moment';
import Icocheck from 'application/assets/icons/Icocheck';
import Icocross from 'application/assets/icons/Icocross';
import UseMeetingReservationService from 'application/store/services/UseMeetingReservationService';
import UseEventService from 'application/store/services/UseEventService';
import UseEnvService from 'application/store/services/UseEnvService';

const SocketRequestModal = () => {
	const {socket_requests,AcceptMeetingRequest,RejectMeetingRequest,RemoveFirstSocketRequest}= UseMeetingReservationService();
	const [isOpen,setIsOpen] = useState<boolean>(false);
	const [socketRequest,setSocketRequest] = useState<any>({});
	const [attendeeToShow,setAttendeeToShow]=React.useState<MeetingAttendee>();
	const {event} = UseEventService();
	const _element = React.useRef<HTMLDivElement>() ;
	const {_env} =UseEnvService();
	React.useEffect(() => {
		setTimeout(() => {
			_element.current?.classList.add('add-blur-radius')
		}, 300);
	}, [isOpen])

	React.useEffect(() => {
		// return if socketRequest is not empty
		if(Object.keys(socketRequest).length > 0){
			return;
		}
		if(socket_requests && socket_requests.length > 0){
			setIsOpen(true);
			setSocketRequest(socket_requests[0]);
		}else{
			setIsOpen(false);
			setSocketRequest({});
		}
	}
	, [socket_requests])

	React.useEffect(() => {
		setAttendeeToShow(socketRequest?.host_attendee);
	}, [socketRequest]);

	function handleAccept(){
		AcceptMeetingRequest({meeting_request_id:socketRequest?.request_id});
		setSocketRequest({});
		RemoveFirstSocketRequest();
	}

	function handleReject(){
		RejectMeetingRequest({meeting_request_id:socketRequest?.request_id});
		setSocketRequest({});
		RemoveFirstSocketRequest();
	}

	function onClose() {

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
						
						<Modal.Header px={6} pt={6} pb={0} bg="primary.boxsolid" borderWidth={0} borderColor={'transparent'}>
							<Text color={'primary.text'} fontSize="lg" fontWeight={600}>{event?.labels?.RESERVATION_NEW_MEETING_REQUEST_TITLE}</Text>
						</Modal.Header>
						<Modal.Body pb={0} bg="primary.boxsolid" px={0}>
							<Text color={'primary.text'} mb={3} px={6} fontSize="lg" fontWeight={500}>{event?.labels?.RESERVATION_NEW_MEETING_REQUEST_MSG} "{attendeeToShow?.first_name} {shouldShow(attendeeToShow?.field_settings?.last_name) ? attendeeToShow?.last_name : ''}"</Text>
							<VStack  px={6} w={'100%'} py={3} space="1" alignItems="flex-start" bg="primary.darkbox">
								<HStack space={2} alignItems={'center'}>
								{/* <Text  fontSize="sm">Person : </Text> */}
								 <HStack  space="1" alignItems="center">
									<Avatar key={attendeeToShow?.image} size={'22px'}
										source={{ uri: `${_env.eventcenter_base_url}/assets/attendees/${shouldShow(attendeeToShow?.field_settings?.profile_picture) ? attendeeToShow?.image:''}` }} 
									>
									{getShortName()}
								</Avatar>
								<Text color={'primary.text'} fontSize="sm">{attendeeToShow?.first_name} {shouldShow(attendeeToShow?.field_settings?.last_name) ? attendeeToShow?.last_name : ''}</Text>
								
								</HStack>
								</HStack>
								<Text color={'primary.text'}  fontSize="sm">{event?.labels?.RESERVATION_MEETING_SPACE} : {socketRequest?.meeting_space}</Text>
								<Text color={'primary.text'}  fontSize="sm">{event?.labels?.RESERVATION_MEETING_DATE} : {socketRequest?.date}</Text>
								<Text color={'primary.text'}  fontSize="sm">{event?.labels?.RESERVATION_MEETING_TIME} : {socketRequest?.time} ({socketRequest?.duration})</Text>
							</VStack>
						</Modal.Body>
						<Modal.Footer bg="primary.box" borderColor={'primary.bdColor'} flexDirection={'column'} display={'flex'}  justifyContent={'flex-start'} p={0}>
							<Button.Group variant={'unstyled'} space={0}>
								<Container borderRightWidth={1} borderRightColor={'primary.bdColor'} w="50%">
									<Button bg={'none'} w="100%" rounded={0} variant="unstyled" onPress={handleReject} textTransform={'uppercase'}><Icocross  width={19} height={19} /></Button>
								</Container>
								<Container borderRightWidth={0}  w="50%">
									<Button onPress={handleAccept} bg={'none'} w="100%" rounded={0} variant="unstyled" textTransform={'uppercase'}><Icocheck width={19} height={19} /></Button>
								</Container>
							</Button.Group>
						</Modal.Footer>
					</Modal.Content>
				</Modal>
  )
}

export default SocketRequestModal