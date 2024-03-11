import React from 'react'
import { Box, Container, HStack, Pressable, Icon, Text } from 'native-base';
import { Detail } from 'application/models/attendee/Detail';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Linking } from 'react-native';
import UseEventService from 'application/store/services/UseEventService';
import DynamicIcon from 'application/utils/DynamicIcon';
import Icodocument from 'application/assets/icons/small/Icodocument';

type AppProps = {
    detail: Detail,
}

const ContactInfo = ({ detail }: AppProps) => {

    const { event  } = UseEventService();


  return (
    <>
      <Box p="0" w="100%" bg={'primary.box'} mb={5} rounded={8}>
        <HStack px="3" py="1" bg="primary.darkbox" w="100%" space="3" alignItems="center" roundedTop={8}>
          <Icodocument width="15px" height="18px" />
          <Text fontSize="lg">{event?.labels?.ATTENDEE_TAB_CONTACT_INFO}</Text>
          {detail?.setting?.contact_vcf && detail?.setting?.contact_vcf ? (
            <Pressable>
            <a href={'#'} style={{ margin: 'auto', position: 'relative', left: '15vh'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="14.253" viewBox="0 0 20 14.253">
              <path
                id="badge_FILL0_wght100_GRAD0_opsz24"
                d="M133.724-808a1.675,1.675,0,0,1-1.236-.489,1.674,1.674,0,0,1-.489-1.236v-10.8a1.675,1.675,0,0,1,.489-1.236,1.675,1.675,0,0,1,1.236-.488h16.552a1.675,1.675,0,0,1,1.236.488,1.675,1.675,0,0,1,.488,1.236v10.8a1.675,1.675,0,0,1-.488,1.236,1.675,1.675,0,0,1-1.236.489Zm0-.8h16.552a.9.9,0,0,0,.661-.259.9.9,0,0,0,.259-.661v-10.8a.9.9,0,0,0-.259-.661.9.9,0,0,0-.661-.259h-6.322c0,1.36-3.908,1.36-3.908,0h-6.322a.9.9,0,0,0-.661.259.9.9,0,0,0-.259.661v10.8a.9.9,0,0,0,.259.661A.9.9,0,0,0,133.724-808.8Zm1.839-3.161h5.977v-.057a1.19,1.19,0,0,0-.2-.675,1.387,1.387,0,0,0-.546-.474,5.906,5.906,0,0,0-1.106-.345,5.636,5.636,0,0,0-1.135-.115,5.636,5.636,0,0,0-1.135.115,5.906,5.906,0,0,0-1.106.345,1.386,1.386,0,0,0-.546.474,1.19,1.19,0,0,0-.2.675Zm8.736-1.782h4.6v-.8h-4.6Zm-5.747-.8a1.217,1.217,0,0,0,.891-.374,1.217,1.217,0,0,0,.374-.891,1.216,1.216,0,0,0-.374-.891,1.216,1.216,0,0,0-.891-.374,1.216,1.216,0,0,0-.891.374,1.216,1.216,0,0,0-.374.891,1.216,1.216,0,0,0,.374.891A1.217,1.217,0,0,0,138.552-814.552Zm5.747-1.724h4.6v-.8h-4.6ZM142-815.126Z"
                transform="translate(-132 822.253)"
                fill="#fff"
              />
            </svg>
           </a>
           </Pressable>
          ) : ''}
        </HStack>
        <Box py="3" px="4" w="100%">
          <HStack>
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
                <Icon ml={5} size="md" as={AntDesign} name="twitter" color={'primary.secondary'} />
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
                <Icon ml={5} size="md" as={AntDesign} name="linkedin-square" color={'primary.secondary'} />
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
                <Icon ml={5} size="md" as={FontAwesome} name="tv" color={'primary.secondary'} />
              </Pressable>
            ) : ''}

          </HStack>

        </Box>
      </Box>

      {/* <Container borderWidth="1" borderColor="primary.darkbox" bg="primary.500" rounded="10" overflow="hidden" mb="3" maxW="100%" w="100%">
            <Box w="100%" p="4" py="5" rounded="10">
                <HStack>
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
                            <Icon ml={5} size="md" as={AntDesign} name="twitter" color={'primary.secondary'} />
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
                            <Icon ml={5} size="md" as={AntDesign} name="linkedin-square" color={'primary.secondary'} />
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
                            <Icon ml={5} size="md" as={FontAwesome} name="tv" color={'primary.secondary'} />
                        </Pressable>
                    ) : ''}

                </HStack>
            </Box>
        </Container> */}
    </>
  )

}

export default ContactInfo