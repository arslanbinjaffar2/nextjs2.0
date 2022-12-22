import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Center, Flex, Text, Image, Input, VStack, Icon, Heading, FormControl } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import { images } from 'application/styles';
import BackgroundLayout from 'application/screens/web/layouts/BackgroundLayout';
import { Link as SolitoLink } from 'solito/link'
import UseEventService from 'application/hooks/UseEventService';
import UseAuthService from 'application/hooks/UseAuthService';
import { useRouter } from 'solito/router'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import validateEmail from 'application/utils/validations/ValidateEmail'

type Inputs = {
  email: string,
  password: string,
};

const Login = ({ props }: any) => {

  const { event } = UseEventService();

  const { isLoggedIn, logging, login } = UseAuthService();

  const { push } = useRouter();

  const { register, handleSubmit, watch, control, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = input => {
    login({ email: input?.email, password: input?.password })
  };

  return (
    <BackgroundLayout>
      <Center w={'100%'} h="100%" alignItems={'center'} px={15}>
        <Flex borderWidth="1px" borderColor="primary.bdColor" maxWidth={'550px'} bg="primary.box" p={{ base: '30px', md: '50px' }} w="100%" rounded="10">
          <Image alt='logo' mb={{ base: 5, lg: 10 }} source={{ uri: images.Logo }} w="180px" h="39px" alignSelf={'center'} />
          <VStack w={'100%'} alignItems={'center'} space='4'>
            {event.attendee_settings.email_enable && (
              <>
                {event.attendee_settings.hide_password === 0 && event.attendee_settings.registration_password === 0 && event.attendee_settings.authentication === 0 ? (
                  <VStack space="20px">
                    <Text w={'100%'} fontSize='lg' lineHeight='sm'>Enter the event code you have received from your organizer.</Text>
                    <FormControl isRequired isInvalid={'email' in errors}>
                      <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input onChangeText={(val) => onChange(val)} type="text" InputLeftElement={<Icon as={<Ionicons name="mail-outline" />} size={5} ml="2" color="primary.text" />} w={'100%'} placeholder={event.labels.GENERAL_EMAIL} />
                        )}
                        name="email"
                        rules={{
                          required: 'Field is required',
                          validate: (value) =>
                            validateEmail(value) || 'Please enter valid email!',
                        }}
                        defaultValue=""
                      />
                      <FormControl.ErrorMessage>
                        {errors.email?.type === 'required'
                          ? 'Email is required'
                          : errors.email?.message}
                      </FormControl.ErrorMessage>
                    </FormControl>
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
                    <FormControl isRequired isInvalid={'email' in errors}>
                      <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input onBlur={onBlur} onChangeText={(val) => onChange(val)} value={value} w={['200px', '400px', '500px']} placeholder={event.labels.GENERAL_EMAIL} InputRightElement={<Button h="46px" onPress={handleSubmit(onSubmit)}><IcoLongArrow /></Button>} />
                        )}
                        name="email"
                        rules={{
                          required: 'Field is required',
                          validate: (value) =>
                            validateEmail(value) || 'Please enter valid email!',
                        }}
                        defaultValue=""
                      />
                      <FormControl.ErrorMessage>
                        {errors.email?.type === 'required'
                          ? 'Email is required'
                          : errors.email?.message}
                      </FormControl.ErrorMessage>
                    </FormControl>
                  </VStack>
                )}
              </>
            )}
          </VStack>
        </Flex>
      </Center >
    </BackgroundLayout >
  );
};

export default Login;
