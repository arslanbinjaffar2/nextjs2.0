import React from 'react'
import { Box, Container, HStack, Pressable, Icon, Text, VStack, Button, Spacer, IconButton } from 'native-base'
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
import IcoVCF from 'application/assets/icons/small/IcoVCF'
import { store } from 'application/store/Index';
import { getContactAttendeeApi } from 'application/store/api/Attendee.Api'

type AppProps = {
    detail: Detail,
}

async function getAttendeeContact(id:any) {
  const mystate=store.getState()
  try {
    const response = await getContactAttendeeApi({id},mystate); // Call the API function
    console.log(response.data.data,'fgfdgfd')
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
const ContactInfo = ({ detail }: AppProps) => {

    const { event  } = UseEventService();

  return (
    <>
      <Box p="0" w="100%" bg={'primary.box'} mb={5} rounded={8}>
        <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="2" alignItems="center" roundedTop={8}>
          <IcouserFilled width="18px" height="18px" />
          <Text fontSize="lg">{event?.labels?.GENERAL_CONTACT_INFO}</Text>
          <Spacer />
          {detail?.setting?.contact_vcf && detail?.setting?.contact_vcf && detail?.detail?.attendee_type_name =='Attendee' ? (
            <Pressable>
              <IconButton
                variant="unstyled"
                p={0}
                icon={<IcoVCF />}
                onPress={() => {
                  getAttendeeContact(detail?.detail?.id ?? 0);
                }}>
              </IconButton>
            </Pressable>
          ) : ''}
        </HStack>
        {detail?.attendee_tabs_settings?.map((row: any, key: number) => (
          <React.Fragment key={key}>
            {row?.tab_name === 'contact_info' && row?.status == 1 ? (
              <VStack p="3" w="100%" space="3">
                {(detail?.detail?.email !== '' || detail?.detail?.phone !== '') ? (
                  <>
                    {detail?.detail?.email && detail?.detail?.email !== '' ? (
                      <HStack space="1" alignItems="center">
                        <Box>
                        <IcoEnvelope />
                        </Box>
                        <Box pl="1">
                            <Text fontSize="14px">{detail?.detail?.email}</Text>
                        </Box>
                      </HStack>
                    ) : ''}
                    {detail?.detail?.phone && detail?.detail?.phone !== '' ? (
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
              </VStack>
            ) : ''}
          </React.Fragment>
        ))}
        {(detail?.detail?.info?.facebook && detail?.field_setting?.facebook) || (detail?.detail?.info?.twitter && detail?.field_setting?.twitter) || (detail?.detail?.info?.linkedin && detail?.field_setting?.linkedin) || (detail?.detail?.info?.website && detail?.field_setting?.website) ?
        <Box py="0" px="0" w="100%">
          <HStack space={3} p={3} py={2} w={'100%'} justifyContent={'flex-start'} alignItems={'center'} mt={'1'}>
            {detail?.detail?.info?.facebook  && detail?.sort_field_setting.find((item: { name: string }) => item.name === 'facebook') && detail?.detail?.info?.facebook !== '' && detail?.detail?.info?.facebook !== 'http://' &&  detail?.detail?.info?.facebook !== 'https://' ? (
              <Pressable
                onPress={async () => {
                  const url: any = `${detail?.detail?.info?.facebook_protocol}${detail?.detail?.info?.facebook}`;
                  const supported = await Linking.canOpenURL(url);
                  console.log("🚀 ~ onPress={ ~ url:", url)
                  if (supported) {
                    
                    await Linking.openURL(url);
                  }
                }}>
                <IcoFacebook width={30} height={30} />
              </Pressable>
            ) : ' '}
            {detail?.detail?.info?.twitter && detail?.sort_field_setting.find((item: { name: string }) => item.name === 'twitter') && detail?.detail?.info?.twitter !== '' && detail?.detail?.info?.twitter !== 'http://' &&  detail?.detail?.info?.twitter !== 'https://' ? (
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
            ) : ' '}
            {detail?.detail?.info?.linkedin && detail?.sort_field_setting.find((item: { name: string }) => item.name === 'linkedin') && detail?.detail?.info?.linkedin !== '' && detail?.detail?.info?.linkedin !== 'http://' &&  detail?.detail?.info?.linkedin !== 'https://' ? (
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
            ) : ' '}
            {detail?.detail?.info?.website && detail?.sort_field_setting.find((item: { name: string }) => item.name === 'website') && detail?.detail?.info?.website !== '' && detail?.detail?.info?.website !== 'http://' &&  detail?.detail?.info?.website !== 'https://' ? (
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
            ) : ' '}

          </HStack>
        </Box>
        : null}
      </Box>
    </>
  )

}

export default ContactInfo