import React from 'react'
import { Box, Container, HStack, Icon, Spacer, Text, VStack, Divider, Button, ScrollView, Pressable, Heading, IconButton } from 'native-base';
import Icouser from 'application/assets/icons/small/Icouser';
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
import UseEventService from '../../../../store/services/UseEventService'
import Icodocument from 'application/assets/icons/small/Icodocument';

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
              <Spacer />
              <IconButton
                variant="unstyled"
                p={0}
                icon={<IcoVCF />}
                onPress={()=>{
                  console.log('hello')
                }}
              />
            </HStack>
            {(detail?.detail?.email !== '' || detail?.detail?.phone_number !== '') && <VStack p="3" w="100%" space="3">
                {detail?.detail?.email && detail?.detail?.email !== '' && <HStack space="1" alignItems="center">
                    <Box>
                    <IcoEnvelope />
                    </Box>
                    <Box pl="1">
                        <Text fontSize="14px">{detail?.detail?.email}</Text>
                    </Box>
                </HStack>}
                {detail?.detail?.phone_number && detail?.detail?.phone_number !== '' && <HStack space="0" alignItems="center">
                    <Box>
                    <IcoPhone />
                    </Box>
                    <Box pl="1">
                        <Text fontSize="14px">{detail?.detail?.phone_number}</Text>
                    </Box>
                </HStack>}
            </VStack>}
            <HStack space={3} p={3} py={2} w={'100%'} justifyContent={'flex-start'} alignItems={'center'} mt={'1'}>
                        {detail?.detail?.facebook && detail?.detail?.facebook !== '' && detail?.detail?.facebook !== 'http://' &&  detail?.detail?.facebook !== 'https://' ? (
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
                                <IcoTwitterX width={30} height={30} />
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
                                <IcoLinkedIN width={30} height={30} />
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
                                <IcoWebLink width={30} height={30} />
                            </Pressable>
                        ) : ''}

                    </HStack>
    
        </Box>}
    </>
  )
}

export default ContactInfo