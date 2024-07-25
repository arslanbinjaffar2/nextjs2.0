import React, { useRef } from 'react'

import useMeetingReservationService from 'application/store/services/UseMeetingReservationService';
import { Button, Container, Modal, Text, View } from 'native-base'
import { UseEventService } from 'application/store/services';
import DynamicIcon from 'application/utils/DynamicIcon';
type AvailabilityModalProps = {
	onClose: ()=>void
	isOpen: boolean,
    AvaiblityID:any
}
export const AvailabilityModal = ({isOpen, onClose, AvaiblityID}: AvailabilityModalProps) => {
    const _element =useRef<HTMLDivElement>() ;
    const {event}=UseEventService()
    const {DeleteAvailabilityCalendarSlot}=useMeetingReservationService();

    const handleConfirmDelete=(id:any)=>{
        DeleteAvailabilityCalendarSlot({id:id})
    }
  return (
    <>
    <Modal
    size={'lg'}
    isOpen={isOpen}
    onClose={()=>{
    onClose()
    }}>
            <Modal.Content ref={_element}  bg={'primary.boxsolid'}>
                
                <Modal.Header px={5} py={3} bg="primary.boxsolid" borderWidth={0} borderColor={'transparent'}>
                    <View flexDirection={'row'} alignItems={'center'}>
                     <DynamicIcon iconProps={{ width:24,height:27 }} iconType={'delete_icon'}/>   
                    <Text color={'primary.text'} fontSize="24px" fontWeight={'medium'} ml={4}>{event?.labels?.GENERAL_DELETE}</Text>
                    </View>
                </Modal.Header>
                <Modal.Body pt={0} bg="primary.boxsolid" px={0}>
                    <Text color={'primary.text'} mb={3} px={5} fontSize="20px" fontWeight={'medium'}>{event?.labels?.RESERVATION_AVAILABILITY_DELETE_ALERT_MSG}</Text>
                    <Text color={'primary.text'} mb={3} px={5} fontSize="md" fontWeight={'normal'}></Text>
                </Modal.Body>
                <Modal.Footer bg="primary.boxsolid" borderColor={'primary.popupbordercolor'} flexDirection={'column'} display={'flex'}  justifyContent={'flex-start'} p={0}>
                    <Button.Group variant={'unstyled'} space={0}>
                        <Container borderRightWidth={1} borderRightColor={'primary.popupbordercolor'} w="50%">
                            <Button py={4} bg={'none'} w="100%" rounded={0} variant="unstyled" onPress={onClose} textTransform={'uppercase'}  _text={{ fontSize:"2xl",fontWeight:"medium",color:'primary.text',textTransform:'uppercase' }}>
                            {event.labels.GENERAL_NO}
                                </Button>
                        </Container>
                        <Container borderRightWidth={0}  w="50%">
                            <Button py={4} 
                            _text={{ fontSize:"2xl",fontWeight:"medium",color:'primary.text',textTransform:'uppercase' }}
                            onPress={()=>handleConfirmDelete(AvaiblityID)} bg={'none'} w="100%" rounded={0} variant="unstyled" textTransform={'uppercase'}>
                            {event.labels.GENERAL_YES}
                            </Button>
                        </Container>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </>

  )
}

export default AvailabilityModal