import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Center, Flex, Text, Image, Input, VStack, Icon, Heading } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import { images } from 'application/styles';
import BackgroundLayout from 'application/screens/web/layouts/BackgroundLayout';
import { Link as SolitoLink } from 'solito/link'
import UseEventService from 'application/hooks/UseEventService';
import { createParam } from 'solito';
import { useRouter } from 'solito/router'
import { useAppDispatch, useAppSelector } from 'application/store/Hooks';

type ScreenParams = { page: string }

const { useParam } = createParam<ScreenParams>()

const Login = ({ props }: any) => {

  const { event } = UseEventService()

  const [page] = useParam('page');

  const { push } = useRouter()

  const dispatch = useAppDispatch();
  
  const isLogging = useAppSelector((state) => state.auth.logging);

  return (
    <BackgroundLayout>
      <Center w={'100%'} h="100%" alignItems={'center'} px={15}>
        <Flex borderWidth="1px" borderColor="primary.bdColor" maxWidth={'550px'} bg="primary.box" p={{ base: '30px', md: '50px' }} w="100%" rounded="10">
          <Image alt='logo' mb={{ base: 5, lg: 10 }} source={{ uri: images.Logo }} w="180px" h="39px" alignSelf={'center'} />
          <VStack w={'100%'} alignItems={'center'} space='4'>
            {
              (() => {
                if (page === 'selection')
                  return (
                    <>
                      <Heading textTransform={'uppercase'} fontSize={'3xl'}>Welcome</Heading>
                      <Button borderRadius={'5'} bg="#000" w={['200px', '400px', '500px']} textTransform={'uppercase'} _text={{ fontWeight: '600', fontSize: '20' }} onPress={() => {
                        push(`/${event.url}/auth/code`)
                      }}>
                        Login with event code
                      </Button>
                      <Button borderRadius={'5'} bg="primary.600" w={['200px', '400px', '500px']} textTransform={'uppercase'} _text={{ fontWeight: '600', fontSize: '20' }} onPress={() => {
                        push(`/${event.url}/auth/login`)
                      }}>
                        Login with email
                      </Button>
                    </>
                  )
                else if (page === 'code')
                  return (
                    <>
                      <Text w={'100%'} fontSize='lg' lineHeight='sm'>Enter the event code you have received from your organizer.</Text>
                      <Input w={['200px', '400px', '500px']} placeholder="Event code..." InputRightElement={<Button h="46px"><IcoLongArrow /></Button>} />
                    </>
                  )
                else if (page === 'login')
                  return (
                    <>
                      {event.attendee_settings.email_enable && (
                        <>
                          {event.attendee_settings.hide_password === 0 && event.attendee_settings.registration_password === 0 && event.attendee_settings.authentication === 0 ? (
                            <VStack space="20px">
                              <Text w={'100%'} fontSize='lg' lineHeight='sm'>Enter the event code you have received from your organizer.</Text>
                              <Input type="text" InputLeftElement={<Icon as={<Ionicons name="mail-outline" />} size={5} ml="2" color="primary.text" />} w={'100%'} placeholder={event.labels.GENERAL_EMAIL} />
                              <Input type="password" leftElement={<Icon as={<Ionicons name="lock-closed-outline" />} size={5} ml="2" color="primary.text" />} w={'100%'} placeholder={event.labels.GENERAL_PASSWORD} />
                              <SolitoLink viewProps={{ style: { maxWidth: 230, width: '100%' } }} href={`/${event.url}/dashboard`}>
                                <Button
                                  minH='48px'
                                  endIcon={<IcoLongArrow />}
                                  _hover={{ bg: 'primary.secondary' }}
                                >
                                </Button>
                              </SolitoLink>
                            </VStack>
                          ) : (
                            <VStack space="10px">
                              <Text w={'100%'} fontSize='lg' lineHeight='sm' >Please enter the Email address to find your events.</Text>
                              <Input w={['200px', '400px', '500px']} placeholder={event.labels.GENERAL_EMAIL} InputRightElement={<Button h="46px"><IcoLongArrow /></Button>} />
                            </VStack>
                          )}
                        </>
                      )}
                    </>
                  )
              })()
            }
          </VStack>
        </Flex>
      </Center >
    </BackgroundLayout >
  );
};

export default Login;
