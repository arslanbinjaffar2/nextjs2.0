import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Heading, IconButton } from 'native-base';
import IcouserFilled from 'application/assets/icons/small/IcouserFilled';
import IcoVCF from 'application/assets/icons/small/IcoVCF';
import IcoFacebook from 'application/assets/icons/small/IcoFacebook';
import IcoTwitterX from 'application/assets/icons/small/IcoTwitterX';
import IcoLinkedIN from 'application/assets/icons/small/IcoLinkedIN';
import IcoWebLink from 'application/assets/icons/small/IcoWebLink';
import IcoEnvelope from 'application/assets/icons/small/IcoEnvelope';
import IcoPhone from 'application/assets/icons/small/IcoPhone';
import { Linking } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import UseEventService from 'application/store/services/UseEventService'
import Icodocument from 'application/assets/icons/small/Icodocument';
import { store } from 'application/store/Index';
import { getContactExhibitorApi } from 'application/store/api/Exhibitor.api';

async function getExhibitorContact(id:any) {
  const mystate=store.getState()
  try {
    const response = await getContactExhibitorApi({id},mystate); // Call the API function
    downloadFile(response.data.data.filedata,response.data.data.filename);
  } catch (error) {
    console.log('error', error);
  }
}
const downloadFile = (fileData:any, filename:any) => {
  // Create a Blob object from the file data
  const blob = new Blob([fileData], { type: 'application/octet-stream' });

  const url = window.URL.createObjectURL(blob);

  const anchorElement = document.createElement('a');
  anchorElement.href = url;

  anchorElement.download = filename;

  anchorElement.style.display = 'none';
  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement);
  window.URL.revokeObjectURL(url);
};
const ContactInfo = () => {
  const { detail,settings } = UseExhibitorService();
  const { event  } = UseEventService();

  return (
    <>
        {detail && (
            detail?.detail?.email !== '' 
            || detail?.detail?.phone_number !== ''
            || (detail?.detail?.facebook !== '' && detail?.detail?.facebook !== 'http://' &&  detail?.detail?.facebook !== 'https://')
            || (detail?.detail?.twitter !== '' && detail?.detail?.twitter !== 'http://' &&  detail?.detail?.twitter !== 'https://')
            || (detail?.detail?.linkedin !== '' && detail?.detail?.linkedin !== 'http://' &&  detail?.detail?.linkedin !== 'https://')
            || (detail?.detail?.website !== '' && detail?.detail?.website !== 'http://' &&  detail?.detail?.linkedin !== 'https://')
        ) && <Box p="0" w="100%" bg={'primary.box'} mb={5} rounded={8} height={'155px'}>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" roundedTop={8} space="2" alignItems="center" height={'31px'}>
                <IcouserFilled width="18px" height="18px" />
                <Text fontSize="lg">{event?.labels?.GENERAL_CONTACT_INFO}</Text>
                <Spacer />
              {settings.exhibitorContact && settings.exhibitorContact ? (
              <IconButton
                variant="unstyled"
                p={0}
                icon={<IcoVCF />}
                onPress={() => {
                  getExhibitorContact(detail?.detail?.id ?? 0);
                }}>
              </IconButton>
              ) : ''}
            </HStack>
            <Box  p={4} height={'calc(100% - 31px)'}>
            {(detail?.detail?.email !== '' || detail?.detail?.phone_number !== '') && <VStack  w="100%" space="0">
                {detail?.detail?.email && detail?.detail?.email !== '' && <HStack space="1" alignItems="center">
                    <Box>
                    <IcoEnvelope />
                    </Box>
                    <Box pl="12px">
                        <Text fontSize="14px">{detail?.detail?.email}</Text>
                    </Box>
                </HStack>}
                {detail?.detail?.phone_number && detail?.detail?.phone_number !== '' && <HStack mt={detail?.detail?.email && detail?.detail?.email !== '' ? 2 : 0} space="0" alignItems="center">
                    <Box>
                    <IcoPhone />
                    </Box>
                    <Box pl="12px">
                        <Text fontSize="14px">{detail?.detail?.phone_number}</Text>
                    </Box>
                </HStack>}
            </VStack>}
            <HStack space={3}  w={'100%'} pt={'10px'} justifyContent={'flex-start'} alignItems={'center'}>
                        {detail?.detail?.facebook && detail?.detail?.facebook !== '' && detail?.detail?.facebook !== 'http://' &&  detail?.detail?.facebook !== 'https://' && (
                            <Pressable
                                onPress={async () => {
                                    const url: any = `${detail?.detail?.facebook}`;
                                    const supported = await Linking.canOpenURL(url);
                                    if (supported) {
                                        await Linking.openURL(url);
                                    }
                                }}>
                               	<IcoFacebook width={30} height={30} />
                            </Pressable>
                        )}
                        {detail?.detail?.twitter && detail?.detail?.twitter !== '' && detail?.detail?.twitter !== 'http://' &&  detail?.detail?.twitter !== 'https://' && (
                            <Pressable
                                onPress={async () => {
                                    const url: any = `${detail?.detail?.twitter}`;
                                    const supported = await Linking.canOpenURL(url);
                                    if (supported) {
                                        await Linking.openURL(url);
                                    }
                                }}>
                                <IcoTwitterX width={30} height={30} />
                            </Pressable>
                        )}
                        {detail?.detail?.linkedin && detail?.detail?.linkedin !== '' && detail?.detail?.linkedin !== 'http://' &&  detail?.detail?.linkedin !== 'https://' && (
                            <Pressable
                                onPress={async () => {
                                    const url: any = `${detail?.detail?.linkedin}`;
                                    const supported = await Linking.canOpenURL(url);
                                    if (supported) {
                                        await Linking.openURL(url);
                                    }
                                }}>
                                <IcoLinkedIN width={30} height={30} />
                            </Pressable>
                        )}
                        {detail?.detail?.website && detail?.detail?.website !== '' && detail?.detail?.website !== 'http://' &&  detail?.detail?.website !== 'https://'  && (
                            <Pressable
                                onPress={async () => {
                                    const url: any = `${detail?.detail?.website}`;
                                    const supported = await Linking.canOpenURL(url);
                                    if (supported) {
                                        await Linking.openURL(url);
                                    }
                                }}>
                                <IcoWebLink width={30} height={30} />
                            </Pressable>
                        )}

                    </HStack>
                    </Box>
    
        </Box>}
    </>
  )
}

export default ContactInfo