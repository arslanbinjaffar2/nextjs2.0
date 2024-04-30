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


type boxItemProps = {
  border: number,
  type: string
}

const MeetingReservationListing = ({ border, type }: boxItemProps) => {
	const { event } = UseEventService()
  	const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
	const [toggle, settoggle] = React.useState(false);
	const handleClose = () => {
		settoggle(false)
	}
  return (
    <Box w="100%" borderTopWidth={border === 0 ? 0 : 1} borderColor="primary.bordercolor" p="4">
        <HStack  space="3" alignItems="center">
            <HStack  space="3" alignItems="center">
							<Avatar
								source={{
									uri:"https://pbs.twimg.com/profile_images/1369921787568422915/hoyvrUpc_400x400.jpg"
								}}
								
							>
								SS
							</Avatar>
							
							<Center>
								<VStack  space="1">
									<Text fontSize="lg" fontWeight={500}>Stephen Hendry</Text>
									<HStack  space="3" alignItems="center">
										<HStack  space="2" alignItems="center">
											<Icocalendar width={16} height={18} /><Text fontSize="16px">12-12-2023</Text>
										</HStack>
										<HStack  space="2" alignItems="center">
											<Icoclock width={16} height={18} /><Text fontSize="16px">12:30 - 01:30 (1 hr)</Text>
										</HStack>
										
									</HStack>
										<HStack  space="2" alignItems="center">
											<Icopin width={16} height={18} /><Text fontSize="16px">514-A Conference Room</Text>
										</HStack>
								</VStack>
								
							</Center>
							
						</HStack>
						
            <Spacer />
						{type !== 'rejected' && <HStack  space="1" alignItems="center">
							 {type === 'all' && <Tooltip px={5} rounded={'full'} label="Accept" openDelay={100} bg="primary.box" _text={{
									color: 'primary.text'
								}}>
								<IconButton
									p={1}
									variant="unstyled"
									icon={<Icoaccept color={event?.settings?.secondary_color} width={19} height={19} />}
									onPress={()=>{
										settoggle(true)
									}}
									
								/>
								</Tooltip>}
							  <Tooltip px={5} rounded={'full'} label="Reject" openDelay={100} bg="primary.box" _text={{
									color: 'primary.text'
								}}>
								<IconButton
									p={1}
									variant="unstyled"
									icon={<Icoreject color={'red'} width={19} height={19} />}
									onPress={()=>{
									console.log('hello')
									}}
									
								/>
								</Tooltip>
							  <Tooltip px={5} rounded={'full'} label="Add calendar" openDelay={100} bg="primary.box" _text={{
									color: 'primary.text'
								}}>
								<IconButton
									p={1}
									variant="unstyled"
									icon={<Icoaddcalendar color={colors.text} width={19} height={19} />}
									onPress={()=>{
									console.log('hello')
									}}
									
								/>
								</Tooltip>
							  <Tooltip px={5} rounded={'full'} label="Send email" openDelay={100} bg="primary.box" _text={{
									color: 'primary.text'
								}}>
								<IconButton
									p={1}
									variant="unstyled"
									icon={<Icosendemail color={colors.text} width={19} height={19} />}
									onPress={()=>{
									console.log('hello')
									}}
									
								/>
								</Tooltip>
							
							
						</HStack>}
						
        </HStack>
        {toggle && <ReservationModal onClose={handleClose} isOpen={toggle} />}
    </Box>
  )
}

export default MeetingReservationListing