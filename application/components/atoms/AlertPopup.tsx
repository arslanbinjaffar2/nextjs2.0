import { AlertDialog, Button, Center, Container, HStack, Text, Spacer, Wrap, Box } from "native-base";
import React from 'react';
import IcoNewsUpdate from "application/assets/icons/IcoNewsUpdate";

const AlertPopup = ({ isOpen, onClose, btnLeftFunc, btnRightFunc, cancelRef, title, text, btnLeftText, btnRightText}:any) => {

    return <AlertDialog  size={'lg'} leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content bg={'primary.boxsolid'}>
            <AlertDialog.Header borderColor={'primary.bordercolor'} bg={'transparent'} fontWeight={600}>
              <HStack  space="0" alignItems="center">
               <Center w="40px">
                <IcoNewsUpdate width={25} height={22} /> 
               </Center>
               
               <Text pl={3} w={'calc(100% - 80px)'} fontSize="lg" fontWeight={600}>{title}</Text>
               <Spacer />
              <AlertDialog.CloseButton right={0} top={'-5px'} />
              </HStack>
            </AlertDialog.Header>
            {text && <AlertDialog.Body bg={'transparent'}>
              <Text  fontSize="md">{text}</Text>
              
            </AlertDialog.Body>}
            <AlertDialog.Footer borderColor={'primary.bordercolor'} flexDirection={'column'} display={'flex'}  justifyContent={'flex-start'} p={0} bg={'transparent'}>
              <Button.Group flexWrap="wrap" variant={'unstyled'} space={0}>
                {btnRightText && <Box flex={1}>
                  <Button  _text={{fontSize: 'xl',textTransform: 'uppercase'}} fontWeight={500} bg={'none'} w="100%" rounded={0} variant="unstyled"  onPress={btnRightFunc}>
                    {btnRightText}
                  </Button>
                </Box>
                }
              {btnLeftText  && <Box borderLeftWidth={btnRightText ? '1':'0'} borderLeftColor={'primary.bordercolor'} flex={1}>
                <Button _text={{fontSize: 'xl',textTransform: 'uppercase'}}  bg={'none'} w="100%" rounded={0} variant="unstyled"  fontWeight={500} onPress={btnLeftFunc} ref={cancelRef}>
                  {btnLeftText}
                </Button>
              </Box>
              }
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>;
  };

export default AlertPopup;