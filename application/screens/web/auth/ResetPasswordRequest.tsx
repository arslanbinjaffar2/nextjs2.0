import * as React from 'react';
import { Button, Center, Flex, Text, Image, Input, VStack, Icon, FormControl, Pressable } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import { images } from 'application/styles';
import BackgroundLayout from 'application/screens/web/layouts/BackgroundLayout';
import UseEventService from 'application/store/services/UseEventService';
import UseAuthService from 'application/store/services/UseAuthService';
import { useRouter } from 'solito/router'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import validateEmail from 'application/utils/validations/ValidateEmail'
import AuthLayout from 'application/screens/web/layouts/AuthLayout';
import UseEnvService from 'application/store/services/UseEnvService';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { Link } from 'solito/link'
import { getColorScheme } from 'application/styles/colors';


type Inputs = {
    email: string,
};

const ResetPasswordRequest = ({ props }: any) => {

    const { event } = UseEventService();
    
    const { _env } = UseEnvService();

    const { processing, passwordReset, error, response } = UseAuthService();

    const { push } = useRouter();

    const router = useRouter();

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = input => {
        passwordReset({ email: input.email })
    };

    React.useEffect(() => {
        if (response.redirect === "choose-provider") {
            push(`/${event.url}/auth/choose-provider/${response.data.authentication_id}`)
        } else if (response.redirect === "verification") {
            push(`/${event.url}/auth/verification/${response.data.authentication_id}`)
        }
    }, [response.redirect])
    const colors = getColorScheme(event?.settings?.app_background_color ?? '#343d50', event?.settings?.app_text_mode);
    console.log(colors)
    return (
        <Center w={'100%'} h="100%" alignItems={'center'} px={15}>
            <Flex borderWidth="1px" borderColor="primary.bdColor" maxWidth={'550px'} bg="primary.box" p={{ base: '30px', md: '50px' }} w="100%" rounded="10">
                <Image alt='logo' mb={{ base: 5, lg: 10 }} source={{ uri: ((event.settings?.header_logo !== undefined && event.settings?.header_logo !== '') ? `${_env.eventcenter_base_url}/assets/event/branding/${event.settings?.header_logo}` : images.Logo) }} w="180px" h={(event.settings?.header_logo !== undefined && event.settings?.header_logo !== '') ? '61px' : '38px'} alignSelf={'center'} />
                <VStack w={'100%'} alignItems={'center'} space='4'>
                    <VStack space="20px" width={'100%'}>
                    <Text w={'100%'} fontSize='lg' lineHeight='sm' textAlign={'center'}>{event?.labels?.EVENTSITE_FORGOT_PASSWORD}</Text>
                    <Text w={'100%'} fontSize='lg' lineHeight='sm' textAlign={'left'}>{event?.labels?.EVENTSITE_ENTER_EMAIL}</Text>

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
                                    router.push(`/${event.url}/auth/login`)
                                }}
                            
                            >
                                {event?.labels?.DESKTOP_APP_LABEL_GO_BACK_TO}{event?.labels?.DESKTOP_APP_LABEL_LOGIN}
                            </Button>
                        </Text>
                        <Button
                            width={'100%'}
                            isLoading={processing}
                            onPress={handleSubmit(onSubmit)}
                            minH='48px'
                            endIcon={<IcoLongArrow />}
                            _hover={{ bg: 'primary.secondary' }}
                        >
                        </Button>
                    </VStack>
                </VStack>
            </Flex>
        </Center >
    );
};

export default ResetPasswordRequest;
