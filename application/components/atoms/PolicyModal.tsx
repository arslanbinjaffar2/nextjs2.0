import { AlertDialog, Center, HStack, Text, Spacer, IconButton, Icon, ScrollView } from "native-base";
import React from 'react';
import IcoNewsUpdate from "application/assets/icons/IcoNewsUpdate";
import AntDesign from '@expo/vector-icons/AntDesign';

const PolicyModal = ({ isOpen, onClose, cancelRef, title, body}:any) => {
    
    return <AlertDialog  leastDestructiveRef={cancelRef} size={'lg'} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content  bg={'primary.boxsolid'}>
            <AlertDialog.Header borderColor={'primary.bordercolor'} bg={'transparent'} fontWeight={600}>
              <HStack  space="0" alignItems="center">
               <Center w="40px">
                <IcoNewsUpdate width={25} height={22} /> 
               </Center>
               
               <Text pl={3} w={'calc(100% - 80px)'} fontSize="lg" fontWeight={600}>{title}</Text>
               <Spacer />
              <IconButton
                p={1}
                variant="unstyled"
                icon={<Icon size="md" as={AntDesign} name="close" color="primary.text" />}
                onPress={onClose}
                
              />
              
              
              </HStack>
            </AlertDialog.Header>
            {body && <AlertDialog.Body bg={'transparent'}>
              <Text fontSize="md">
                <ScrollView maxHeight={350}>
                <div className="ebs-iframe-content" dangerouslySetInnerHTML={{ __html: body }} />

                </ScrollView>
              </Text>
            </AlertDialog.Body>}
          </AlertDialog.Content>
        </AlertDialog>;
  };

export default PolicyModal;