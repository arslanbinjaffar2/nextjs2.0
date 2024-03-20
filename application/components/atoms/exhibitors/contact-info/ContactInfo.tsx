import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Heading } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Linking } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import UseExhibitorService from 'application/store/services/UseExhibitorService';
import UseEventService from '../../../../store/services/UseEventService'

const ContactInfo = () => {
  const { detail } = UseExhibitorService();
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
        ) && <Box p="0" w="100%" bg={'primary.box'} mb={5} rounded={8}>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" roundedTop={8} space="3" alignItems="center">
                <Icodocument width="15px" height="18px" />
                <Text fontSize="lg">{event?.labels?.ATTENDEE_CONTACT_INFO}</Text>
            </HStack>
            {(detail?.detail?.email !== '' || detail?.detail?.phone_number !== '') && <VStack px="3" py="2" w="100%" space="3">
                {detail?.detail?.email && detail?.detail?.email !== '' && <HStack space="0" alignItems="flex-start">
                    <Box w="20%">
                    <Icon size="md" as={AntDesign} name="mail" color={'primary.text'} />
                    </Box>
                    <Box w="70%" pl="1">
                        <Text fontSize="14px">{detail?.detail?.email}</Text>
                    </Box>
                </HStack>}
                {detail?.detail?.phone_number && detail?.detail?.phone_number !== '' && <HStack space="0" alignItems="flex-start">
                    <Box w="20%">
                    <Icon size="md" as={AntDesign} name="phone" color={'primary.text'} />
                    </Box>
                    <Box w="70%" pl="1">
                        <Text fontSize="14px">{detail?.detail?.phone_number}</Text>
                    </Box>
                </HStack>}
            </VStack>}
            <HStack p={2}>
                        {detail?.detail?.facebook && detail?.detail?.facebook !== '' && detail?.detail?.facebook !== 'http://' &&  detail?.detail?.facebook !== 'https://' ? (
                            <Pressable
                                onPress={async () => {
                                    const url: any = `${detail?.detail?.facebook}`;
                                    const supported = await Linking.canOpenURL(url);
                                    if (supported) {
                                        await Linking.openURL(url);
                                    }
                                }}>
                                <Icon size="md" as={AntDesign} name="facebook-square" color={'primary.text'} />
                            </Pressable>
                        ) : ''}
                        {detail?.detail?.twitter && detail?.detail?.twitter !== '' && detail?.detail?.twitter !== 'http://' &&  detail?.detail?.twitter !== 'https://' ? (
                            <Pressable
                                onPress={async () => {
                                    const url: any = `${detail?.detail?.twitter}`;
                                    const supported = await Linking.canOpenURL(url);
                                    if (supported) {
                                        await Linking.openURL(url);
                                    }
                                }}>
                                <Icon ml={5} size="md" as={AntDesign} name="twitter" color={'primary.text'} />
                            </Pressable>
                        ) : ''}
                        {detail?.detail?.linkedin && detail?.detail?.linkedin !== '' && detail?.detail?.linkedin !== 'http://' &&  detail?.detail?.linkedin !== 'https://' ? (
                            <Pressable
                                onPress={async () => {
                                    const url: any = `${detail?.detail?.linkedin}`;
                                    const supported = await Linking.canOpenURL(url);
                                    if (supported) {
                                        await Linking.openURL(url);
                                    }
                                }}>
                                <Icon ml={5} size="md" as={AntDesign} name="linkedin-square" color={'primary.text'} />
                            </Pressable>
                        ) : ''}
                        {detail?.detail?.website && detail?.detail?.website !== '' && detail?.detail?.website !== 'http://' &&  detail?.detail?.website !== 'https://'  ? (
                            <Pressable
                                onPress={async () => {
                                    const url: any = `${detail?.detail?.website}`;
                                    const supported = await Linking.canOpenURL(url);
                                    if (supported) {
                                        await Linking.openURL(url);
                                    }
                                }}>
                                <Icon ml={5} size="md" as={FontAwesome} name="tv" color={'primary.text'} />
                            </Pressable>
                        ) : ''}

                    </HStack>
    
        </Box>}
    </>
  )
}

export default ContactInfo