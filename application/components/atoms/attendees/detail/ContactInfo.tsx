import React from 'react'
import { Box, Container, HStack, Pressable, Icon, Text } from 'native-base';
import { Detail } from 'application/models/attendee/Detail';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Linking } from 'react-native';
import UseEventService from 'application/store/services/UseEventService';

type AppProps = {
  detail: Detail,
}

const ContactInfo = ({ detail }: AppProps) => {

  const { event } = UseEventService();


  return (
    <Container borderWidth="1" borderColor="primary.darkbox" bg="primary.500" rounded="10" overflow="hidden" mb="3" maxW="100%" w="100%" >
      <Box w="100%" p="4" py="5" rounded="10" >
        <HStack space={5}>
          {detail?.detail?.info?.facebook && detail?.field_setting?.facebook ? (
            <Pressable
              onPress={async () => {
                const url: any = `${detail?.detail?.info?.facebook_protocol!}${detail?.detail?.info?.facebook}`;
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                  await Linking.openURL(url);
                }
              }}>
              <Icon size="md" as={AntDesign} name="facebook-square" color={'primary.secondary'} />
            </Pressable>
          ) : ''}
          {detail?.detail?.info?.twitter && detail?.field_setting?.twitter ? (
            <Pressable
              onPress={async () => {
                const url: any = `${detail?.detail?.info?.twitter_protocol!}${detail?.detail?.info?.twitter}`;
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                  await Linking.openURL(url);
                }
              }}>
              <Icon size="md" as={AntDesign} name="twitter" color={'primary.secondary'} />
            </Pressable>
          ) : ''}
          {detail?.detail?.info?.linkedin && detail?.field_setting?.linkedin ? (
            <Pressable
              onPress={async () => {
                const url: any = `${detail?.detail?.info?.linkedin_protocol!}${detail?.detail?.info?.linkedin}`;
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                  await Linking.openURL(url);
                }
              }}>
              <Icon size="md" as={AntDesign} name="linkedin-square" color={'primary.secondary'} />
            </Pressable>
          ) : ''}
          {detail?.detail?.info?.website && detail?.field_setting?.website ? (
            <Pressable
              onPress={async () => {
                const url: any = `${detail?.detail?.info?.website_protocol!}${detail?.detail?.info?.website}`;
                const supported = await Linking.canOpenURL(url);
                if (supported) {
                  await Linking.openURL(url);
                }
              }}>
              <Icon size="md" as={FontAwesome} name="tv" color={'primary.secondary'} />
            </Pressable>
          ) : ''}

        </HStack>
      </Box>
    </Container>
  )

}

export default ContactInfo