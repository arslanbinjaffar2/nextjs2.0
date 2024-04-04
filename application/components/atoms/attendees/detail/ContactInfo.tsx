import React from 'react'
import { Box, Container, HStack, Pressable, Icon, Text, VStack, Button, Spacer } from 'native-base'
import { Detail } from 'application/models/attendee/Detail';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Linking } from 'react-native';
import UseEventService from 'application/store/services/UseEventService';
import IcoFacebook from 'application/assets/icons/small/IcoFacebook';
import IcoTwitterX from 'application/assets/icons/small/IcoTwitterX';
import IcoLinkedIN from 'application/assets/icons/small/IcoLinkedIN';
import IcoWebLink from 'application/assets/icons/small/IcoWebLink';
import IcoEnvelope from 'application/assets/icons/small/IcoEnvelope';
import IcoPhone from 'application/assets/icons/small/IcoPhone';
import IcouserFilled from 'application/assets/icons/small/IcouserFilled';
import Vcfcontact from 'application/assets/icons/small/vcfcontact';
import DynamicIcon from 'application/utils/DynamicIcon';

type AppProps = {
    detail: Detail,
}

interface SortFieldSetting {
  name: string;
  is_editable: number;
  is_private: number;
}

const ContactInfo = ({ detail }: AppProps) => {

    const { event  } = UseEventService();

    const isFieldVisible = (fieldName: string) => {
      const field = detail.sort_field_setting.find((field: SortFieldSetting) => field.name === fieldName);
      return field && !field.is_private;
    };
     
    // Check if any contact information is available and its corresponding field setting is enabled
    const hasContactInfo = isFieldVisible('email') && detail?.detail?.email ||
                           isFieldVisible('phone') && detail?.detail?.phone ||
                           isFieldVisible('facebook') && detail?.detail?.info?.facebook ||
                           isFieldVisible('twitter') && detail?.detail?.info?.twitter ||
                           isFieldVisible('linkedin') && detail?.detail?.info?.linkedin ||
                           isFieldVisible('website') && detail?.detail?.info?.website;
                           
    // Only render the component if there's contact info
    if (!hasContactInfo) return null;

  return (
    <>
      <Box p="0" w="100%" bg={'primary.box'} mb={5} rounded={8}>
        <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="2" alignItems="center" roundedTop={8}>
          <IcouserFilled width="18px" height="18px" />
          <Text fontSize="lg">{event?.labels?.GENERAL_CONTACT_INFO}</Text>
          <Spacer />
          {detail?.setting?.contact_vcf && detail?.setting?.contact_vcf && detail?.detail?.attendee_type_name !='Attendee' ? (
            <Pressable>
              <Vcfcontact width="18px" height="20px" />
            </Pressable>
          ) : ''}
        </HStack>
        {detail?.attendee_tabs_settings?.map((row: any, key: number) => (
          <React.Fragment key={key}>
            {row?.tab_name === 'contact_info' && row?.status == 1 ? (
              <>
              {(detail?.detail?.email !== '' || detail?.detail?.phone !== '') && <VStack p="3" pb={1} w="100%" space="3">
                {(detail?.detail?.email !== '' || detail?.detail?.phone !== '') ? (
                  <>
                    {detail?.detail?.email && detail?.detail?.email !== '' && isFieldVisible('email') ? (
                      <HStack space="1" alignItems="center">
                        <Box>
                        <IcoEnvelope />
                        </Box>
                        <Box pl="1">
                            <Text fontSize="14px">{detail?.detail?.email}</Text>
                        </Box>
                      </HStack>
                    ) : ''}
                    {detail?.detail?.phone && detail?.detail?.phone !== '' && isFieldVisible('phone') ? (
                      <HStack space="1" alignItems="center">
                       <Box>
                        <IcoPhone />
                        </Box>
                        <Box pl="1">
                            <Text fontSize="14px">{detail?.detail?.phone}</Text>
                        </Box>
                      </HStack>
                    ) : ''}
                  </>
                ) : ''}
              </VStack>}
              </>
            ) : ''}
          </React.Fragment>
        ))}
        {(detail?.detail?.info?.facebook && isFieldVisible('facebook')) || (detail?.detail?.info?.twitter && isFieldVisible('twitter')) || (detail?.detail?.info?.linkedin && isFieldVisible('linkedin')) || (detail?.detail?.info?.website && isFieldVisible('website')) ?
        <Box py="0" px="0" w="100%">
          <HStack space={3} p={3} py={2} w={'100%'} justifyContent={'flex-start'} alignItems={'center'} mt={'1'}>
            {detail?.detail?.info?.facebook  && isFieldVisible('facebook') && detail?.detail?.info?.facebook !== '' && detail?.detail?.info?.facebook !== 'http://' &&  detail?.detail?.info?.facebook !== 'https://' ? (
              <Pressable
                onPress={async () => {
                  const url: any = `${detail?.detail?.info?.facebook_protocol}${detail?.detail?.info?.facebook}`;
                  const supported = await Linking.canOpenURL(url);
                  if (supported) {
                    
                    await Linking.openURL(url);
                  }
                }}>
                <IcoFacebook width={30} height={30} />
              </Pressable>
            ) : null}
            {detail?.detail?.info?.twitter && isFieldVisible('twitter') && detail?.detail?.info?.twitter !== '' && detail?.detail?.info?.twitter !== 'http://' &&  detail?.detail?.info?.twitter !== 'https://' ? (
              <Pressable
                onPress={async () => {
                  const url: any = `${detail?.detail?.info?.twitter_protocol}${detail?.detail?.info?.twitter}`;
                  const supported = await Linking.canOpenURL(url);
                  if (supported) {
                    await Linking.openURL(url);
                  }
                }}>
                <IcoTwitterX width={30} height={30} />
              </Pressable>
            ) : null}
            {detail?.detail?.info?.linkedin && isFieldVisible('linkedin') && detail?.detail?.info?.linkedin !== '' && detail?.detail?.info?.linkedin !== 'http://' &&  detail?.detail?.info?.linkedin !== 'https://' ? (
              <Pressable
                onPress={async () => {
                  const url: any = `${detail?.detail?.info?.linkedin_protocol}${detail?.detail?.info?.linkedin}`;
                  const supported = await Linking.canOpenURL(url);
                  if (supported) {
                    await Linking.openURL(url);
                  }
                }}>
                <IcoLinkedIN width={30} height={30} />
              </Pressable>
            ) : null}
            {detail?.detail?.info?.website && isFieldVisible('website') && detail?.detail?.info?.website !== '' && detail?.detail?.info?.website !== 'http://' &&  detail?.detail?.info?.website !== 'https://' ? (
              <Pressable
                onPress={async () => {
                  const url: any = `${detail?.detail?.info?.website_protocol}${detail?.detail?.info?.website}`;
                  const supported = await Linking.canOpenURL(url);
                  if (supported) {
                    await Linking.openURL(url);
                  }
                }}>
                <IcoWebLink width={30} height={30} />
              </Pressable>
            ) : null}

          </HStack>
        </Box>
        : null}
      </Box>
    </>
  )

}

export default ContactInfo