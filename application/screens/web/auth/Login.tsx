import * as React from 'react';
import { Button, Center, Flex, Text, Image, Input, VStack, Icon, Heading, FormControl, Pressable } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import { images, func } from 'application/styles';
import BackgroundLayout from 'application/screens/web/layouts/BackgroundLayout';
import UseEventService from 'application/store/services/UseEventService';
import UseAuthService from 'application/store/services/UseAuthService';
import { useRouter } from 'solito/router'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import validateEmail from 'application/utils/validations/ValidateEmail'
import AuthLayout from 'application/screens/web/layouts/AuthLayout';
import { Link } from 'solito/link'
import WebLoading from 'application/components/atoms/WebLoading';
import UseEnvService from 'application/store/services/UseEnvService';

type Inputs = {
    email: string,
    password: string,
};

const Login = ({ props }: any) => {

    const { event } = UseEventService();

    const { _env } = UseEnvService();

    const { isLoggedIn, processing, login, error, response, loginWithToken } = UseAuthService();

    const  { push } = useRouter();
		  const router = useRouter();

    const nativeButton = React.useRef<HTMLElement | null>(null)

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = input => {
        login({ email: input.email, password: input.password })
    };

      const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            nativeButton.current?.click();
        }
    };

    React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
        loginWithToken({ token });
    }
    }, []);

    const handleAADLogin = () => {
        window.location.href = `${_env.api_base_url}/event/${event.url}/auth/login/azure`;
    };

    React.useEffect(() => {
        if (response.redirect === "choose-provider") {
            push(`/${event.url}/auth/choose-provider/${response.data.authentication_id}`)
        } 
        if (response.redirect === "verification") {
            push(`/${event.url}/auth/verification/${response.data.authentication_id}`)
        } 
    }, [response.redirect]);

    if(processing) {
        return <WebLoading />
    }
		

    return (
        <Center w={'100%'} h="100%" alignItems={'center'} px={15}>
            <Flex borderWidth="0px" borderColor="primary.bdColor" maxWidth={'550px'} bg="primary.box" p={['30px','50px','30px']} w={"100%"}
            rounded="10">
                <Image
                  alt='logo' display={'flex'} resizeMode='contain' mb={{ base: 5, lg: 10 }} source={{ uri: event.settings?.app_header_logo ? `${_env.eventcenter_base_url}/assets/event/branding/${event.settings.app_header_logo}`
                        : event.settings?.header_logo !== undefined && event.settings?.header_logo !== ''
                          ? `${_env.eventcenter_base_url}/assets/event/branding/${event.settings.header_logo}`
                          : images.Logo }} w="250px" h="85px" alignSelf={'center'} />
                <VStack w={'100%'} alignItems={'center'} space='4'>
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
                    {event.attendee_settings?.email_enable === 1 && (
                        <>
                            {event.attendee_settings?.hide_password === 0 && event.attendee_settings?.registration_password === 0 && event.attendee_settings?.authentication === 0 ? (
                                <VStack space="20px" w={'100%'}>
                                    <Text w={'100%'} fontSize='lg' lineHeight='sm' textAlign={'center'}>{event?.name}</Text>
                                    <FormControl isRequired isInvalid={'email' in errors || error !== ''}>
                                        <Controller
                                            control={control}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Input onKeyPress={handleKeyPress} onChangeText={(val) => onChange(val)} type="text" InputLeftElement={<Icon as={<Ionicons name="mail-outline" />} size={5} mx="2" color="primary.text" />} w={'100%'} placeholder={event.labels.GENERAL_EMAIL} />
                                            )}
                                            name="email"
                                            rules={{
                                                required: 'Field is required',
                                                validate: (value) =>
                                                    validateEmail(value) || 'Please enter valid email!',
                                            }}
                                            defaultValue=""
                                        />
                                        <FormControl.ErrorMessage bg={'red.100'} color={'red.900'} _text={{fontSize: 'md'}} p={2} rounded={4}>
                                            {errors.email?.type === 'required'
                                                ? 'Email is required'
                                                : (error ? error : errors.email?.message)}
                                        </FormControl.ErrorMessage>
                                    </FormControl>
                                    <FormControl isRequired isInvalid={'password' in errors}>
                                        <Controller
                                            control={control}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Input onKeyPress={handleKeyPress} onChangeText={(val) => onChange(val)} type="password" leftElement={<Icon as={<Ionicons name="lock-closed-outline" />} size={5} mx="2" color="primary.text" />} w={'100%'} placeholder={event.labels.GENERAL_PASSWORD} />
                                            )}
                                            name="password"
                                            rules={{
                                                required: 'Field is required'
                                            }}
                                            defaultValue=""
                                        />
                                        <FormControl.ErrorMessage bg={'red.100'} color={'red.900'} _text={{fontSize: 'md'}} p={2} rounded={4}>
                                            {errors.email?.type === 'required'
                                                ? 'Password is required'
                                                : errors.email?.message}
                                        </FormControl.ErrorMessage>
                                    </FormControl>
                                    {event.attendee_settings?.default_password_label === 1 && event.attendee_settings?.default_password && event.attendee_settings?.authentication === 0 && (
                                        <Text w={'100%'} fontSize='md' lineHeight='sm'>{event.labels.EVENTSITE_DEFAULT_PASSWORD} {event.attendee_settings?.default_password}</Text>
                                    )}
                                    {event.attendee_settings?.hide_password === 0 && event.attendee_settings?.forgot_link === 0 && event.attendee_settings?.authentication === 0 && (
                                        <Text fontSize="md" > 
																					<Button
																						p="0"
																						bg={'transparent'}
																						borderWidth="0"
																						textDecorationLine={'underline'}
																						variant={'unstyled'}
																						_hover={{bg: 'transparent',textDecorationLine:'none',_text:{color: 'primary.500'}}}
																						_pressed={{bg: 'transparent',textDecorationLine:'none',_text:{color: 'primary.500'}}}
																						onPress={()=>{
																							router.push(`/${event.url}/auth/reset-password-request`)
																						}}
																					
																					>
																						{event.labels.EVENTSITE_FORGOT_PASSWORD}
																					</Button>
                                        </Text>
                                    )}
                                    <Button
                                        isLoading={processing}
                                        onPress={handleSubmit(onSubmit)}
                                        minH='48px'
                                        ref={nativeButton}
                                        endIcon={<IcoLongArrow color={func.colorType(event?.settings?.primary_color)} />}
                                        _hover={{ bg: 'primary.secondary' }}
                                    >
                                    </Button>
                                    {event.attendee_settings?.enable_login_directory === 1 && (
                                     <Button
																		variant={"unstyled"}
																		background={"transparent"}
																		borderWidth={1}
																		_text={{fontSize:24,fontWeight:500}}
																		borderColor={"primary.darkbox"}
                                           onPress={handleAADLogin}
                                           minH='48px'
                                           _hover={{ bg: 'primary.secondary' }} >
                                           Sign in With Microsoft
                                       </Button>
																		)}
                                </VStack>
                            ) : (
                                <VStack w={'100%'} space="10px">
                                    <Text w={'100%'} fontSize='lg' lineHeight='sm' textAlign={'center'} >{event?.name}</Text>
                                    
                                    <FormControl width={'100%'} isRequired isInvalid={'email' in errors || error !== ''}>
                                        <Controller
                                            control={control}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Center><Input onKeyPress={handleKeyPress} onBlur={onBlur} onChangeText={(val) => onChange(val)} value={value} w={'100%'} maxW={['300px', '400px', '500px']} placeholder={event.labels.GENERAL_EMAIL} InputRightElement={<Button isLoading={processing} ref={nativeButton} h="46px" onPress={handleSubmit(onSubmit)}><IcoLongArrow color={func.colorType(event?.settings?.primary_color)} /></Button>} /></Center>
                                            )}
                                            name="email"
                                            rules={{
                                                required: 'Field is required',
                                                validate: (value) => validateEmail(value) || 'Please enter valid email!',
                                            }}
                                            defaultValue=""
                                        />
                                        <FormControl.ErrorMessage bg={'red.100'} color={'red.900'} _text={{fontSize: 'md'}} p={2} rounded={4}>
                                            {errors.email?.type === 'required'
                                                ? 'Email is required'
                                                : (error ? error : errors.email?.message)}
                                        </FormControl.ErrorMessage>
                                    </FormControl>
																		 {event.attendee_settings?.enable_login_directory === 1 && (
                                    <Button
																		variant={"unstyled"}
																		background={"transparent"}
																		borderWidth={1}
																		_text={{fontSize:24,fontWeight:500}}
																		borderColor={"primary.darkbox"}
                                           onPress={handleAADLogin}
                                           minH='48px'
                                           _hover={{ bg: 'primary.secondary' }} >
                                        Sign in With Microsoft
                                       </Button>
																		 )}
                                </VStack>
                            )}
                        </>
                    )}
                </VStack>
            </Flex>
        </Center >
    );
};

export default Login;
