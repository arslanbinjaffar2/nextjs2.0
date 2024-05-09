import React from 'react';
import {  Avatar, Button, Container, HStack, Modal, Pressable, ScrollView, Spacer, Text, TextArea, View, VStack } from 'native-base';
const ReservationModal = ({isOpen, onClose}: any) => {
	const _element = React.useRef<HTMLDivElement>() 
	React.useEffect(() => {
		setTimeout(() => {
			_element.current?.classList.add('add-blur')
		}, 300);
	}, [isOpen])
	
  return (
	<Modal
			size={'md'}
			
			isOpen={isOpen}
			onClose={()=>{
			
			}}>
					<Modal.Content ref={_element}  bg={'primary.boxsolid'}>
						
						<Modal.Header px={6} pt={6} pb={0} bg="primary.box" borderWidth={0} borderColor={'transparent'}>
							<Text color={'primary.text'} fontSize="lg" fontWeight={600}>Accept meeting</Text>
						</Modal.Header>
						<Modal.Body pb={0} bg="primary.box" px={0}>
							<Text color={'primary.text'} mb={3} px={6} fontSize="lg" fontWeight={500}>Are you sure you want to accept meeting Request.</Text>
							<VStack  px={6} w={'100%'} py={3} space="1" alignItems="flex-start" bg="primary.darkbox">
								<HStack space={2} alignItems={'center'}><Text color={'primary.text'}  fontSize="sm">Person :</Text>
								 <HStack  space="1" alignItems="center">
									<Avatar bg={'primary.100'} size={'22px'} source={{uri:"https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg"}}>
									SS
								</Avatar>
								<Text color={'primary.text'} fontSize="sm"> Stephen Hendry</Text>
								
								</HStack>
								</HStack>
								<Text color={'primary.text'}  fontSize="sm">Meeting space : 514-A Conference Room</Text>
								<Text color={'primary.text'}  fontSize="sm">Meeting date : 12-12-2023</Text>
							</VStack>
						</Modal.Body>
						<Modal.Footer bg="primary.box" borderColor={'primary.bdColor'} flexDirection={'column'} display={'flex'}  justifyContent={'flex-start'} p={0}>
							<Button.Group variant={'unstyled'} space={0}>
								<Container borderRightWidth={1} borderRightColor={'primary.bdColor'} w="50%">
									<Button bg={'none'} w="100%" rounded={0} variant="unstyled" onPress={onClose} textTransform={'uppercase'}>Close</Button>
								</Container>
								<Container borderRightWidth={0}  w="50%">
									<Button bg={'none'} w="100%" rounded={0} variant="unstyled" textTransform={'uppercase'}>Send</Button>
								</Container>
							</Button.Group>
						</Modal.Footer>
					</Modal.Content>
				</Modal>
  )
}

export default ReservationModal