import * as React from 'react';
import PropTypes from 'prop-types';
import { images } from 'application/styles';
import Master from 'application/screens/mobile/layouts/Master';
import { Button, Center, Flex, Text, VStack, Image, Input, FormControl, Icon } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import { useRouter } from 'solito/router'
import UseAuthService from 'application/store/services/UseAuthService';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import UseEventService from 'application/store/services/UseEventService';
import UseErrorService from 'application/store/services/UseErrorService';
import { Link } from 'solito/link'
import validateEmail from 'application/utils/validations/ValidateEmail'

type Inputs = {
    email: string,
    password: string,
};

const Login = ({ navigation }: any) => {

    const { event } = UseEventService();

    const { message } = UseErrorService();

    const { isLoggedIn, processing, login, error } = UseAuthService();

    const { push } = useRouter();

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = input => {
        login({ email: input.email, password: input.password })
    };

    return (
        <Master navigation={navigation}>
            <Center w={'100%'} pt={20} px={15}>
                <Flex w="100%" rounded="10">
                    <Image alt='logo' mb={8} source={images.Logo} w="180px" h="39px" alignSelf={'center'} />
                    <VStack opacity="0.7" space='4' bg='primary.box' py='5' px='4' borderRadius='lg'>
                        {event.attendee_settings?.cpr === 1 && (
                            <>
                                <Link href={`/${event.url}/auth/cpr-login`}>
                                    <Button
                                        isLoading={processing}
                                        onPress={handleSubmit(onSubmit)}
                                        minH='48px'
                                        _hover={{ bg: 'primary.secondary' }}
                                    >
                                        {event.labels.GENERAL_NEM_ID_LOGIN}
                                    </Button>
                                </Link>
                                {event.attendee_settings?.email_enable && (
                                    <Text textAlign={'center'} w={'100%'} fontSize='lg' lineHeight='sm'>OR</Text>
                                )}
                            </>
                        )}
                        {event.attendee_settings?.email_enable && (
                            <>
                                {event.attendee_settings?.hide_password === 0 && event.attendee_settings?.registration_password === 0 && event.attendee_settings?.authentication === 0 ? (
                                    <VStack space="20px" w={'100%'}>
                                        <Text w={'100%'} fontSize='lg' lineHeight='sm'>Enter the credentials you have received from your organizer.</Text>
                                        <FormControl isRequired isInvalid={'email' in errors || error !== ''}>
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
                                                    : (error ? error : errors.email?.message)}
                                            </FormControl.ErrorMessage>
                                        </FormControl>
                                        <FormControl isRequired isInvalid={'password' in errors}>
                                            <Controller
                                                control={control}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Input onChangeText={(val) => onChange(val)} type="password" leftElement={<Icon as={<Ionicons name="lock-closed-outline" />} size={5} ml="2" color="primary.text" />} w={'100%'} placeholder={event.labels.GENERAL_PASSWORD} />
                                                )}
                                                name="password"
                                                rules={{
                                                    required: 'Field is required'
                                                }}
                                                defaultValue=""
                                            />
                                            <FormControl.ErrorMessage>
                                                {errors.email?.type === 'required'
                                                    ? 'Password is required'
                                                    : errors.email?.message}
                                            </FormControl.ErrorMessage>
                                        </FormControl>
                                        {event.attendee_settings?.default_password_label === 1 && event.attendee_settings?.default_password && event.attendee_settings?.authentication === 0 && (
                                            <Text w={'100%'} fontSize='md' lineHeight='sm'>{event.labels.EVENTSITE_DEFAULT_PASSWORD} {event.attendee_settings?.default_password}</Text>
                                        )}
                                        {event.attendee_settings?.hide_password === 0 && event.attendee_settings?.forgot_link === 0 && event.attendee_settings?.authentication === 0 && (
                                            <Link href={`/reset-password-request`}>
                                                <Text w={'100%'} fontSize='md' lineHeight='sm'>{event.labels.EVENTSITE_FORGOT_PASSWORD}</Text>
                                            </Link>
                                        )}
                                        <Button
                                            isLoading={processing}
                                            onPress={handleSubmit(onSubmit)}
                                            minH='48px'
                                            endIcon={<IcoLongArrow />}
                                            _hover={{ bg: 'primary.secondary' }}
                                        >
                                        </Button>
                                    </VStack>
                                ) : (
                                    <VStack space="10px">
                                        <Text w={'100%'} fontSize='lg' lineHeight='sm' >Please enter the Email address to find your events.</Text>
                                        <FormControl isRequired isInvalid={'email' in errors || error !== ''}>
                                            <Controller
                                                control={control}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Input onBlur={onBlur} onChangeText={(val) => onChange(val)} value={value} w={'100%'} placeholder={event.labels.GENERAL_EMAIL} InputRightElement={<Button isLoading={processing} h="46px" onPress={handleSubmit(onSubmit)}><IcoLongArrow /></Button>} />
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
                                                    : (error ? error : errors.email?.message)}
                                            </FormControl.ErrorMessage>
                                        </FormControl>
                                    </VStack>
                                )}
                            </>
                        )}
                    </VStack>
                </Flex>
            </Center>
        </Master>
    );
};

Login.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Login;
