import * as React from 'react';
import PropTypes from 'prop-types';
import { images } from 'application/styles';
import Master from 'application/screens/mobile/layouts/Master';
import { Button, Center, Flex, Text, VStack, Image, Input, FormControl, Icon } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import UseAuthService from 'application/store/services/UseAuthService';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import UseEventService from 'application/store/services/UseEventService';
import { Link } from 'solito/link'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

type Inputs = {
    password: string,
    password_confirmation: string,
};

const ResetPassword = ({ navigation, route }: any) => {

    const { event } = UseEventService();

    const { isLoggedIn, processing, reset, error, response } = UseAuthService();

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

    const [token,] = React.useState(route.params.token);

    const onSubmit: SubmitHandler<Inputs> = input => {
        reset({ password: input.password, password_confirmation: input.password_confirmation, token: token! })
    };

    return (
        <Master navigation={navigation}>
            <Center w={'100%'} pt={20} px={15}>
                <Flex w="100%" rounded="10">
                    <Image alt='logo' mb={8} source={images.Logo} w="180px" h="61px" alignSelf={'center'} />
                    <VStack opacity="0.7" space='4' bg='primary.box' py='5' px='4' borderRadius='lg'>
                        <Text w={'100%'} fontSize='lg' lineHeight='sm'>Enter the new password & confirm password.</Text>
                        <FormControl isRequired isInvalid={'password' in errors || error !== ''}>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input onChangeText={(val) => onChange(val)} type="password" leftElement={<Icon as={<Ionicons name="lock-closed-outline" />} size={5} ml="2" color="primary.text" />} placeholder={event.labels.GENERAL_PASSWORD} />
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
                                    <Input onChangeText={(val) => onChange(val)} type="password" leftElement={<Icon as={<Ionicons name="lock-closed-outline" />} size={5} ml="2" color="primary.text" />} placeholder={event.labels.CONFIRM_PASSWORD} />
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
                        <Link href={`/${event.url}/auth/login`}>
                            <Text fontSize='md' lineHeight='sm'>{`${event.labels.DESKTOP_APP_LABEL_GO_BACK_TO} ${event.labels.DESKTOP_APP_LABEL_LOGIN}`}</Text>
                        </Link>
                        <Button
                            isLoading={processing}
                            onPress={handleSubmit(onSubmit)}
                            minH='48px'
                            w={'100%'}
                            endIcon={<IcoLongArrow />}
                            _hover={{ bg: 'primary.secondary' }}
                        >
                        </Button>
                    </VStack>
                </Flex>
            </Center>
        </Master>
    );
};

ResetPassword.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default ResetPassword;
