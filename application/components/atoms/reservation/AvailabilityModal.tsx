import React, { useRef } from 'react'
import Icocheck from 'application/assets/icons/Icocheck';
import Icocross from 'application/assets/icons/Icocross';
import useMeetingReservationService from 'application/store/services/UseMeetingReservationService';
import { Button, Container, Modal, Text } from 'native-base'
type AvailabilityModalProps = {
	onClose: ()=>void
	isOpen: boolean,
    title:string
    message:string
    AvaiblityID:any
}
export const AvailabilityModal = ({isOpen, onClose,message,title,AvaiblityID}: AvailabilityModalProps) => {
    const _element =useRef<HTMLDivElement>() ;
    const {DeleteAvailabilityCalendarSlot}=useMeetingReservationService();

    const handleConfirmDelete=(id:any)=>{
        DeleteAvailabilityCalendarSlot({id:id})
    }
  return (
    <>
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
                   
                </Modal.Body>
                <Modal.Footer bg="primary.boxsolid" borderColor={'primary.popupbordercolor'} flexDirection={'column'} display={'flex'}  justifyContent={'flex-start'} p={0}>
                    <Button.Group variant={'unstyled'} space={0}>
                        <Container borderRightWidth={1} borderRightColor={'primary.popupbordercolor'} w="50%">
                            <Button py={4} bg={'none'} w="100%" rounded={0} variant="unstyled" onPress={onClose} textTransform={'uppercase'}><Icocross  width={19} height={19} /></Button>
                        </Container>
                        <Container borderRightWidth={0}  w="50%">
                            <Button py={4} onPress={()=>handleConfirmDelete(AvaiblityID)} bg={'none'} w="100%" rounded={0} variant="unstyled" textTransform={'uppercase'}><Icocheck width={19} height={19} /></Button>
                        </Container>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </>

  )
}

export default AvailabilityModal