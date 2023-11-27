import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Heading } from 'native-base';
import Icodocument from 'application/assets/icons/small/Icodocument';
import { Linking } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import UseSponsorService from 'application/store/services/UseSponsorService';

const ContactInfo = () => {
  const { detail } = UseSponsorService();
  return (
    <>
        {detail && <Box p="0" w="100%" bg={'primary.box'} mb={5} rounded={8}>
            <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center">
                <Icodocument width="15px" height="18px" />
                <Text fontSize="lg">Contact Info</Text>
            </HStack>
            {(detail?.detail?.email !== '' || detail?.detail?.phone_number !== '') && <VStack px="3" py="2" w="100%" space="3">
                {detail?.detail?.email && detail?.detail?.email !== '' && <HStack space="0" alignItems="flex-start">
                    <Box w="25%">
                    <Icon size="md" as={AntDesign} name="mail" color={'primary.darkbox'} />
                    </Box>
                    <Box w="65%" pl="1">
                        <Text fontSize="14px">{detail?.detail?.email}</Text>
                    </Box>
                </HStack>}
                {detail?.detail?.phone_number && detail?.detail?.phone_number !== '' && <HStack space="0" alignItems="flex-start">
                    <Box w="25%">
                    <Icon size="md" as={AntDesign} name="phone" color={'primary.darkbox'} />
                    </Box>
                    <Box w="65%" pl="1">
                        <Text fontSize="14px">{detail?.detail?.phone_number}</Text>
                    </Box>
                </HStack>}
            </VStack>}
            <HStack p={2}>
                        {detail?.detail?.facebook ? (
                            <Pressable
                                onPress={async () => {
                                    const url: any = `${detail?.detail?.facebook}`;
                                    const supported = await Linking.canOpenURL(url);
                                    if (supported) {
                                        await Linking.openURL(url);
                                    }
                                }}>
                                <Icon size="md" as={AntDesign} name="facebook-square" color={'primary.darkbox'} />
                            </Pressable>
                        ) : ''}
                        {detail?.detail?.twitter ? (
                            <Pressable
                                onPress={async () => {
                                    const url: any = `${detail?.detail?.twitter}`;
                                    const supported = await Linking.canOpenURL(url);
                                    if (supported) {
                                        await Linking.openURL(url);
                                    }
                                }}>
                                <Icon ml={5} size="md" as={AntDesign} name="twitter" color={'primary.darkbox'} />
                            </Pressable>
                        ) : ''}
                        {detail?.detail?.linkedin ? (
                            <Pressable
                                onPress={async () => {
                                    const url: any = `${detail?.detail?.linkedin}`;
                                    const supported = await Linking.canOpenURL(url);
                                    if (supported) {
                                        await Linking.openURL(url);
                                    }
                                }}>
                                <Icon ml={5} size="md" as={AntDesign} name="linkedin-square" color={'primary.darkbox'} />
                            </Pressable>
                        ) : ''}
                        {detail?.detail?.website  ? (
                            <Pressable
                                onPress={async () => {
                                    const url: any = `${detail?.detail?.website}`;
                                    const supported = await Linking.canOpenURL(url);
                                    if (supported) {
                                        await Linking.openURL(url);
                                    }
                                }}>
                                <Icon ml={5} size="md" as={FontAwesome} name="tv" color={'primary.darkbox'} />
                            </Pressable>
                        ) : ''}

                    </HStack>
    
        </Box>}
    </>
  )
}

export default ContactInfo