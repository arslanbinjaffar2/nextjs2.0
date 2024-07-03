import * as React from 'react';
import { Button, Center, Flex, Text, Image, Input, VStack, Icon, FormControl, HStack, Pressable } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import { images, func } from 'application/styles';
import BackgroundLayout from 'application/screens/web/layouts/BackgroundLayout';
import UseEventService from 'application/store/services/UseEventService';
import UseAuthService from 'application/store/services/UseAuthService';
import { useRouter } from 'solito/router'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import AuthLayout from 'application/screens/web/layouts/AuthLayout';
import { Link } from 'solito/link'
import { createParam } from 'solito';
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import UseEnvService from 'application/store/services/UseEnvService';

type Inputs = {
    password: string,
    password_confirmation: string,
};

type ScreenParams = { token: string }

const { useParam } = createParam<ScreenParams>()

const ResetPassword = ({ props }: any) => {

    const { event } = UseEventService();
    
    const { _env } = UseEnvService();

    const { isLoggedIn, processing, reset, error, response } = UseAuthService();

    const { push } = useRouter();
    const router = useRouter();
      const nativeButton = React.useRef<HTMLElement | null>(null);
    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            nativeButton.current?.click();
        }
    };

    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is mendatory')
            .min(3, 'Password must be at 3 char long'),
        password_confirmation: Yup.string()
            .required('Password is mendatory')
            .oneOf([Yup.ref('password')], 'Passwords doess not match'),
    });

    const formOptions = { resolver: yupResolver(formSchema) }

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<Inputs>(formOptions);

    const [token] = useParam('token');

    const onSubmit: SubmitHandler<Inputs> = input => {
        reset({ password: input.password, password_confirmation: input.password_confirmation, token: token! })
    };

    React.useEffect(() => {
        if (response.redirect === "login") {
            push(`/${event.url}/auth/login`)
        } else if (response.redirect === "dashboard") {
            push(`/${event.url}/dashboard`)
        }
    }, [response.redirect])
    return (
        <Center w={'100%'} h="100%" alignItems={'center'} px={15}>
            <Flex borderWidth="0px" borderColor="primary.bdColor" maxWidth={'550px'} bg="primary.box" p={{ base: '30px', md: '50px' }} w="100%" rounded="10">
                <Image
                  alt='logo' mb={{ base: 5, lg: 10 }} resizeMode='contain'  source={{ uri: event.settings?.app_header_logo ? `${_env.eventcenter_base_url}/assets/event/branding/${event.settings.app_header_logo}`
                        : event.settings?.header_logo !== undefined && event.settings?.header_logo !== ''
                          ? `${_env.eventcenter_base_url}/assets/event/branding/${event.settings.header_logo}`
                          : images.Logo }} w="250px" h="85px" alignSelf={'center'} />
                <VStack w={'100%'} alignItems={'center'} space='4'>
                    <Text w={'100%'} fontSize='lg' lineHeight='sm'>{event?.labels?.CHANGE_PASSWORD}</Text>
                    <FormControl isRequired isInvalid={'password' in errors || error !== ''}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input onKeyPress={handleKeyPress} onChangeText={(val) => onChange(val)} type="password" leftElement={<Icon as={<Ionicons name="lock-closed-outline" />} size={5} ml="2" color="primary.text" />} placeholder={event.labels.GENERAL_PASSWORD} />
                            )}
                            name="password"
                            defaultValue=""
                        />
                        <FormControl.ErrorMessage>
                            {error
                                ? error
                                : errors.password?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired isInvalid={'password_confirmation' in errors}>
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input onKeyPress={handleKeyPress}  onChangeText={(val) => onChange(val)} type="password" leftElement={<Icon as={<Ionicons name="lock-closed-outline" />} size={5} ml="2" color="primary.text" />} placeholder={event.labels.CONFIRM_PASSWORD} />
                            )}
                            name="password_confirmation"
                            defaultValue=""
                        />
                        <FormControl.ErrorMessage>
                            {errors.password_confirmation?.message
                                ? errors.password_confirmation?.message
                                : errors.password_confirmation?.message}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <HStack  width={'100%'} alignItems={'flex-start'} fontSize="md" > 
                        <Pressable
                            p="0"
                            bg={'transparent'}
                            borderWidth="0"
                            display={'inline-block'}
                            textDecorationLine={'underline'}
                            variant={'unstyled'}
                            _hover={{bg: 'transparent',textDecorationLine:'none'}}
                            _pressed={{bg: 'transparent',textDecorationLine:'none'}}
                            onPress={()=>{
                                router.push(`/${event.url}/auth/login`)
                            }}
                        
                        >
                             <Text  fontSize="md">{event?.labels?.DESKTOP_APP_LABEL_GO_BACK_TO}{event?.labels?.DESKTOP_APP_LABEL_LOGIN}</Text>
                             
                        </Pressable>
                    </HStack>
                    <Button
                        ref={nativeButton}
                        isLoading={processing}
                        onPress={handleSubmit(onSubmit)}
                        minH='48px'
                        w={'100%'}
                        endIcon={<IcoLongArrow color={func.colorType(event?.settings?.primary_color)} />}
                        _hover={{ bg: 'primary.secondary' }}
                    >
                    </Button>
                </VStack>
            </Flex>
        </Center >
    );
};

export default ResetPassword;
