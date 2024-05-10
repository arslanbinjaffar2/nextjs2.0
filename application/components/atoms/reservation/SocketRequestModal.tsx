import React, { useState } from 'react';
import {  Avatar, Button, Container, HStack, Modal, Pressable, ScrollView, Spacer, Text, TextArea, View, VStack } from 'native-base';
import { MeetingRequest } from 'application/models/meetingReservation/MeetingReservation';
import { GENERAL_DATE_FORMAT } from 'application/utils/Globals';
import moment from 'moment';
import Icocheck from 'application/assets/icons/Icocheck';
import Icocross from 'application/assets/icons/Icocross';
import UseMeetingReservationService from 'application/store/services/UseMeetingReservationService';
import UseEventService from 'application/store/services/UseEventService';

const SocketRequestModal = () => {
	const {socket_requests,AcceptMeetingRequest,RejectMeetingRequest,RemoveFirstSocketRequest}= UseMeetingReservationService();
	const [isOpen,setIsOpen] = useState<boolean>(false);
	const [socketRequest,setSocketRequest] = useState<any>({});
	const {event} = UseEventService();
	const _element = React.useRef<HTMLDivElement>() 
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

	// function getAttendeeAvatarImage(){
	// 	return socketRequest?.host_attendee_id === loggedInAttendeeId ? socketRequest?.participant_attendee.image : socketRequest?.host_attendee.image

	// }
	function getShortName (name: string){
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
							<Text fontSize="lg" fontWeight={600}>{event?.labels?.RESERVATION_NEW_MEETING_REQUEST_TITLE}</Text>
						</Modal.Header>
						<Modal.Body pb={0} bg="primary.box" px={0}>
							<Text mb={3} px={6} fontSize="lg" fontWeight={500}>{event?.labels?.RESERVATION_NEW_MEETING_REQUEST_MSG} "{socketRequest?.host_attendee_name}"</Text>
							<VStack  px={6} w={'100%'} py={3} space="1" alignItems="flex-start" bg="primary.darkbox">
								<HStack space={2} alignItems={'center'}>
								{/* <Text  fontSize="sm">Person : </Text> */}
								 <HStack  space="1" alignItems="center">
									<Avatar bg={'primary.100'} size={'22px'} source={{uri:"https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg"}}>
									{getShortName(socketRequest?.host_attendee_name)}
								</Avatar>
								<Text fontSize="sm">{socketRequest?.host_attendee_name}</Text>
								
								</HStack>
								</HStack>
								<Text  fontSize="sm">{event?.labels?.RESERVATION_MEETING_SPACE} : {socketRequest?.meeting_space}</Text>
								<Text  fontSize="sm">{event?.labels?.RESERVATION_MEETING_DATE} : {socketRequest?.date}</Text>
								<Text  fontSize="sm">{event?.labels?.RESERVATION_MEETING_TIME} : {socketRequest?.time} ({socketRequest?.duration})</Text>
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