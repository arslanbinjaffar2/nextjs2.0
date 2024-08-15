import { AlertDialog, Center, HStack, Text, Spacer, IconButton, Icon, ScrollView } from "native-base";
import React from 'react';
import IcoNewsUpdate from "application/assets/icons/IcoNewsUpdate";
import AntDesign from '@expo/vector-icons/AntDesign';
import { getColorScheme } from "application/styles/colors";
import UseEventService from "application/store/services/UseEventService";
import { useWindowDimensions } from "react-native";


const PolicyModal = ({ isOpen, onClose, cancelRef, title, body}:any) => {
        const RenderHtml = require('react-native-render-html').default;
        const { event } = UseEventService();
        const {width, height } = useWindowDimensions();
        const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
        const mixedStyle = {
          body: {
              fontFamily: 'Avenir',
              fontSize: '16px',
              userSelect: 'auto',
              color: colors.text
          },
          p: {
              fontFamily: 'Avenir',
          }
      }
    return <AlertDialog  leastDestructiveRef={cancelRef} size={'lg'} isOpen={isOpen} onClose={onClose}>
          <AlertDialog.Content  bg={'primary.boxsolid'}>
            <AlertDialog.Header borderColor={'transparent'} bg={'transparent'} fontWeight={600}>
              <HStack  space="0" alignItems="center">
               <Center w="40px">
                <IcoNewsUpdate width={40} height={22} /> 
               </Center>
               
               <Text pl={3} w={'calc(100% - 80px)'} fontSize="24px" fontWeight={600}>{title}</Text>
               <Spacer />
              <IconButton
                p={1}
                variant="unstyled"
                icon={<Icon size="md" as={AntDesign} name="close" color="primary.text" />}
                onPress={onClose}
                
              />
              
              
              </HStack>
            </AlertDialog.Header>
            {body && <AlertDialog.Body px={5} pt={0}  bg={'transparent'}>
              <Text fontSize="md">
                <ScrollView maxHeight={350}>
                 <RenderHtml
                    defaultTextProps={{selectable:true}}
                    contentWidth={width > 600 ? 600 : width - 90}
                    systemFonts={['Avenir']}
                    tagsStyles={mixedStyle}
                    source={{ html: body }}
                />

                </ScrollView>
              </Text>
            </AlertDialog.Body>}
          </AlertDialog.Content>
        </AlertDialog>;
  };

export default PolicyModal;