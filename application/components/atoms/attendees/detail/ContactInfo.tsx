import React, { useState } from 'react';
import { Box, Pressable, Text, VStack, HStack, IconButton, Spacer } from 'native-base';
import { Linking } from 'react-native';
import IcoFacebook from 'application/assets/icons/small/IcoFacebook';
import IcoTwitterX from 'application/assets/icons/small/IcoTwitterX';
import IcoLinkedIN from 'application/assets/icons/small/IcoLinkedIN';
import IcoWebLink from 'application/assets/icons/small/IcoWebLink';
import IcoEnvelope from 'application/assets/icons/small/IcoEnvelope';
import IcoPhone from 'application/assets/icons/small/IcoPhone';
import IcoUserFilled from 'application/assets/icons/small/IcouserFilled';
import IcoVCF from 'application/assets/icons/small/IcoVCF';
import { Detail } from 'application/models/attendee/Detail';
import { getContactAttendeeApi } from 'application/store/api/Attendee.Api';
import { store } from 'application/store/Index';
import UseEventService from 'application/store/services/UseEventService';
import UseAuthService from 'application/store/services/UseAuthService'

type SocialIcon = {
  name: string;
  component: JSX.Element;
};

type AppProps = {
  detail: Detail;
};

const ContactInfo = ({ detail }: AppProps) => {
  const socialIcons: SocialIcon[] = [
    { name: 'facebook', component: <IcoFacebook width={30} height={30} /> },
    { name: 'twitter', component: <IcoTwitterX width={30} height={30} /> },
    { name: 'linkedin', component: <IcoLinkedIN width={30} height={30} /> },
    { name: 'website', component: <IcoWebLink width={30} height={30} /> }
  ];

  const [sortedFields, setSortedFields]=useState([]);
  
  const { event } = UseEventService();
  const { response } = UseAuthService()
  const loggedInUser = detail?.detail?.id === response.data?.user?.id;


  const isFieldVisible = (fieldName: string) => {
    const field = detail.sort_field_setting.find((field: any) => field.name === fieldName);
    if (!loggedInUser) {
      return field && !field.is_private;
    }
    return !!field;
  };

  const hasContactInfo = ['facebook', 'twitter', 'linkedin', 'website', 'phone']
    .some(fieldName => isFieldVisible(fieldName) && detail?.detail?.info?.[fieldName]) || 
    (isFieldVisible('email') && detail?.detail?.email);

  const visibleSocialIcons = detail.sort_field_setting
    .filter((field: any) => {
      if (loggedInUser) {
        return socialIcons.some(icon => icon.name === field.name) && detail?.detail?.info?.[field.name] !== '' && detail?.detail?.info?.[field.name] !== 'http://' && detail?.detail?.info?.[field.name] !== 'https://';
      } else {
        return field.is_private === 0 && socialIcons.some(icon => icon.name === field.name) && detail?.detail?.info?.[field.name] !== '' && detail?.detail?.info?.[field.name] !== 'http://' && detail?.detail?.info?.[field.name] !== 'https://';
      }
    })
    .map((field: any) => socialIcons.find(icon => icon.name === field.name))
    .filter((icon: any) => icon !== undefined) as SocialIcon[];

  React.useEffect(() => { 
    const fields=detail.sort_field_setting
    .filter((field: any) => {
      if (loggedInUser) {
        return ['email', 'phone'].includes(field.name) && detail?.detail?.[field.name as keyof typeof detail.detail] !== '';
      } else {
        return field.is_private === 0 && ['email', 'phone'].includes(field.name) && detail?.detail?.[field.name as keyof typeof detail.detail] !== '';
      }
    })
    .sort((a: any, b: any) => detail.sort_field_setting.findIndex((field: any) => field.name === a.name) - detail.sort_field_setting.findIndex((field: any) => field.name === b.name))
    .map((field: any) => ({
      name: field.name,
      isVisible: isFieldVisible(field.name) && detail?.detail?.[field.name as keyof typeof detail.detail] !== '',
      value: detail?.detail?.[field.name as keyof typeof detail.detail] || ''
    }));
    setSortedFields(fields);
  }
  , [detail]);

  const findStatusForContactInfo = () => {
    const contactInfoTab = detail?.attendee_tabs_settings?.find(tab => tab.tab_name === 'contact_info');
      return contactInfoTab ? contactInfoTab.status : 0;
  };

  if (!hasContactInfo || !findStatusForContactInfo()) return null;

  return (
    <Box p="0" w="100%" bg="primary.box" mb={5} rounded={8}>
      <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="2" alignItems="center" roundedTop={8}>
        <IcoUserFilled width="18px" height="18px" />
        <Text fontSize="lg">{event?.labels?.GENERAL_CONTACT_INFO}</Text>
        <Spacer />
        {detail?.setting?.contact_vcf && detail?.setting?.contact_vcf && detail?.detail?.current_event_attendee?.speaker == '0' ? (
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
      <Box py={3}>
      {sortedFields.length > 0 && <VStack px="3" pb={visibleSocialIcons.length > 0 ? 3 : 0}  w="100%" space="3">
        {sortedFields.map((field: any) => (
            <HStack key={field.name} space="1" alignItems="center">
              <Box>
                {field.name === 'email' && <IcoEnvelope />}
                {field.name === 'phone' && <IcoPhone />}
              </Box>
              <Box pl="1">
                <Text fontSize="14px">{field.value}</Text>
              </Box>
            </HStack>
          ))}
        </VStack>}
        {visibleSocialIcons.length > 0 && <HStack space={3} px={3} pt={0} w="100%" justifyContent="flex-start" alignItems="center">
          {visibleSocialIcons.map(icon => (
            <Pressable
              key={icon.name}
              onPress={async () => {
                const url = `${detail?.detail?.info && detail?.detail?.info[`${icon?.name}_protocol`]}${detail?.detail?.info && detail?.detail?.info[icon?.name]}`;
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                  await Linking.openURL(url);
                }
              }}>
              {icon.component}
            </Pressable>
          ))}
        </HStack>}
      </Box>
    </Box>
  );
};

async function getAttendeeContact(id: any) {
  const mystate = store.getState();
  try {
    const response = await getContactAttendeeApi({ id }, mystate); // Call the API function
    downloadFile(response.data.data.filedata, response.data.data.filename);
  } catch (error) {
    console.log('error', error);
  }
}

const downloadFile = (fileData: any, filename: any) => {
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

export default ContactInfo;
