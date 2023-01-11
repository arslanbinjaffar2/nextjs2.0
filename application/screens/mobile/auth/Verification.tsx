import * as React from 'react';
import PropTypes from 'prop-types';
import { images } from 'application/styles';
import Layout from 'application/containers/mobile/Layout';
import { Button, Center, Flex, Text, VStack, Image, Input, FormControl, Icon, Spinner, Divider } from 'native-base';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import UseAuthService from 'application/store/services/UseAuthService';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import UseEventService from 'application/store/services/UseEventService';
import { Link } from 'solito/link'
import AuthLayout from 'application/screens/mobile/layouts/AuthLayout';
import ReactCodeInput from 'react-verification-code-input';
import Countdown from "react-countdown";

type Inputs = {
    code: string,
};

const Verification = ({ navigation, route }: any) => {

    const { event } = UseEventService();

    const [id,] = React.useState(route.params.id);

    const { processing, verification, loadProvider, error, response } = UseAuthService();

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = input => {
        verification({ code: input.code, id: Number(id), screen: 'verification', provider: 'email' })
    };

    React.useEffect(() => {
        if (response.redirect === "verification") {
            navigation.navigate(`verification`, {
                id: response.data.authentication_id
            });
        } else if (response.redirect === "login") {
            navigation.navigate(`login`);
        } else if (response.redirect === "dashboard") {
            navigation.navigate(`dashboard`);
        } else if (response.redirect === "reset-password") {
            navigation.navigate(`reset-password`);
        }
    }, [response.redirect])

    React.useEffect(() => {
        loadProvider({ id: id, screen: 'verification' });
    }, [id])

    return (
        <AuthLayout>
            <Layout>
                <Center w={'100%'} pt={20} px={15}>
                    <Flex w="100%" rounded="10">
                        <Image alt='logo' mb={8} source={images.Logo} w="180px" h="39px" alignSelf={'center'} />
                        {Object.keys(response).length > 0 ? (
                            <VStack opacity="0.7" space='4' bg='primary.box' py='5' px='4' borderRadius='lg'>
                                <VStack space="20px" width={'100%'}>
                                    <Text w={'100%'} fontSize='lg' lineHeight='sm' >{event.labels.DESKTOP_VERIFICATION_SCREEN_HEADING}</Text>
                                    <FormControl isRequired isInvalid={'code' in errors || error !== ''}>
                                        <Controller
                                            control={control}
                                            render={({ field: { onChange } }) => (
                                                <ReactCodeInput type='number' onChange={(val) => onChange(val)} fields={6} fieldHeight={40} fieldWidth={75} />
                                            )}
                                            name="code"
                                            rules={{ required: 'Code is required' }}
                                        />
                                        <FormControl.ErrorMessage>
                                            {error ? error : errors.code?.message}
                                        </FormControl.ErrorMessage>
                                    </FormControl>
                                    <Flex direction="row">
                                        <Countdown
                                            date={Date.now() + (response?.data?.ms! ? Number(response?.data?.ms) : 0)}
                                            renderer={({ hours, minutes, seconds, completed }) => {
                                                if (completed) {
                                                    return (
                                                        Number(minutes) < 4 && (
                                                            <Text onPress={() => {
                                                                verification({ code: '', id: Number(id), screen: 'resend' })
                                                            }}>{event.labels.GENERAL_RESEND || 'Resend'}</Text>
                                                        )
                                                    );
                                                } else {
                                                    return (
                                                        <>
                                                            <Text>{event.labels.EVENTSITE_TIME_LEFT} = {minutes}:{seconds}</Text>
                                                            {minutes < 4 && (
                                                                <>
                                                                    <Divider bg="primary.text" thickness={2} mx="2" orientation="vertical" />
                                                                    <Text onPress={() => {
                                                                        verification({ code: '', id: Number(id), screen: 'resend' })
                                                                    }}>{event.labels.GENERAL_RESEND || 'Resend'}</Text>
                                                                </>
                                                            )}
                                                        </>
                                                    );
                                                }
                                            }}
                                        />
                                    </Flex>
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
                            </VStack>
                        ) : (
                            <VStack space={10} height='187px' alignItems="center" style={{ justifyContent: 'center' }}>
                                <Spinner accessibilityLabel="Loading posts" />
                            </VStack>
                        )}
                    </Flex>
                </Center>
            </Layout>
        </AuthLayout>
    );
};

Verification.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Verification;
