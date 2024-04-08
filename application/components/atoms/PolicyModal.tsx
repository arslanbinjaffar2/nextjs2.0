import { AlertDialog, Center, HStack, Text, Spacer } from "native-base";
import React from 'react';
import IcoNewsUpdate from "application/assets/icons/IcoNewsUpdate";

const PolicyModal = ({ isOpen, onClose, cancelRef, title, body}:any) => {

    return <AlertDialog leastDestructiveRef={cancelRef} size={'lg'} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content nativeID="ebs-alert-dialog" bg={'primary.box'}>
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
            {body && <AlertDialog.Body bg={'transparent'}>
                <div dangerouslySetInnerHTML={{ __html: body }} />
            </AlertDialog.Body>}
          </AlertDialog.Content>
        </AlertDialog>;
  };

export default PolicyModal;