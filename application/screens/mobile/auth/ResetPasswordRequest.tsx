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
import validateEmail from 'application/utils/validations/ValidateEmail'

type Inputs = {
    email: string,
};

const ResetPasswordRequest = ({ navigation }: any) => {

    const { event } = UseEventService();

    const { processing, passwordReset, error, response } = UseAuthService();

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = input => {
        passwordReset({ email: input.email })
    };

    return (
        <Master navigation={navigation}>
            <Center w={'100%'} pt={20} px={15}>
                <Flex w="100%" rounded="10">
                    <Image alt='logo' mb={8} source={images.Logo} w="180px" h="61px" alignSelf={'center'} />
                    <VStack opacity="0.7" space='4' bg='primary.box' py='5' px='4' borderRadius='lg'>
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
                        <Link href={`/${event.url}/auth/login`}>
                            <Text w={'100%'} fontSize='md' lineHeight='sm'>{`${event.labels.DESKTOP_APP_LABEL_GO_BACK_TO} ${event.labels.DESKTOP_APP_LABEL_LOGIN}`}</Text>
                        </Link>
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
                </Flex>
            </Center>
        </Master>
    );
};

ResetPasswordRequest.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default ResetPasswordRequest;
