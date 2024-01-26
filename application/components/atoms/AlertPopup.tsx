import { AlertDialog, Button, Center, Container, HStack, Text } from "native-base";
import React from 'react';
import IcoNewsUpdate from "application/assets/icons/IcoNewsUpdate";

const AlertPopup = ({ isOpen, onClose, btnLeftFunc, btnRightFunc, cancelRef, title, text, btnLeftText, btnRightText}:any) => {

    return <AlertDialog size={'xl'} leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content bg={'primary.darkbox'}>
            <AlertDialog.CloseButton />
            <AlertDialog.Header borderColor={'primary.bdColor'} bg={'primary.darkbox'} fontWeight={600}>
              <HStack  space="1" alignItems="center">
               <Center w="35px">
                <IcoNewsUpdate width={25} height={22} /> 
               </Center>
               
               <Text fontSize="md" fontWeight={600}>{title}</Text>
              </HStack>
            </AlertDialog.Header>
            <AlertDialog.Body bg={'primary.darkbox'}>
              {text}
            </AlertDialog.Body>
            <AlertDialog.Footer borderColor={'primary.bdColor'} flexDirection={'column'} display={'flex'}  justifyContent={'flex-start'} p={0} bg={'primary.darkbox'}>
              <Button.Group variant={'unstyled'} space={0}>
              {btnLeftText  && <Container borderRightWidth={1} borderRightColor={'primary.bdColor'} w="50%">
                <Button bg={'none'} w="100%" rounded={0} variant="unstyled"  onPress={btnLeftFunc} ref={cancelRef}>
                  {btnLeftText}
                </Button>
              </Container>
              }
              {btnRightText && <Center w="50%">
                <Button bg={'none'} w="100%" rounded={0} variant="unstyled"  onPress={btnRightFunc}>
                  {btnRightText}
                </Button>
              </Center>
              }
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>;
  };

export default AlertPopup;