import * as React from 'react';
import { Button, Center, Flex, Text, Image, VStack, Radio, FormControl, Spinner, Divider } from 'native-base';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import { images } from 'application/styles';
import BackgroundLayout from 'application/screens/web/layouts/BackgroundLayout';
import UseEventService from 'application/store/services/UseEventService';
import UseAuthService from 'application/store/services/UseAuthService';
import { useRouter } from 'solito/router'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import AuthLayout from 'application/screens/web/layouts/AuthLayout';
import { Link } from 'solito/link'
import { createParam } from 'solito';
import ReactCodeInput from 'react-verification-code-input';
import Countdown from "react-countdown";

type Inputs = {
    code: string,
};

type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const Verification = ({ props }: any) => {

    const { event } = UseEventService();

    const { processing, verification, loadProvider, error, response } = UseAuthService();

    const { push } = useRouter();

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<Inputs>();

    const [id] = useParam('id')

    const onSubmit: SubmitHandler<Inputs> = input => {
        verification({ code: input.code, id: Number(id), authentication_id: Number(id), screen: 'verification', provider: 'email' })
    };

    React.useEffect(() => {
        if (response.redirect === "verification") {
            push(`/${event.url}/auth/verification/${response.data.authentication_id}`)
        } else if (response.redirect === "login") {
            push(`/${event.url}/auth/login`)
        } else if (response.redirect === "dashboard") {
            push(`/${event.url}/dashboard`)
        } else if (response.redirect === "reset-password") {
            push(`/${event.url}/auth/reset-password/${response.data.token}`)
        }
    }, [response.redirect])

    React.useEffect(() => {
        if (id) {
            loadProvider({ id: Number(id), screen: 'verification' });
        }
    }, [id])

    return (
        <Center w={'100%'} h="100%" alignItems={'center'} px={15}>
            <Flex borderWidth="1px" borderColor="primary.bdColor" maxWidth={'550px'} bg="primary.box" p={{ base: '30px', md: '50px' }} w="100%" rounded="10">
                <Image alt='logo' mb={{ base: 5, lg: 10 }} source={{ uri: images.Logo }} w="180px" h="39px" alignSelf={'center'} />
                {Object.keys(response).length > 0 ? (
                    <VStack w={'100%'} space='4'>
                        <VStack space="20px" width={'100%'}>
                            <Text w={'100%'} fontSize='lg' lineHeight='sm' textAlign={'center'} >{event.labels.EVENTSITE_AUTHENTICATION_CODE_REQUIRED}</Text>
                            <Text w={'100%'} fontSize='lg' lineHeight='sm' >{event.labels.EVENTSITE_AUTHENTICATION_EMAIL_CODE_SEND_MSG}</Text>
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
                                                        verification({ code: '', id: Number(id), authentication_id: Number(id), screen: 'resend' })
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
                                                                verification({ code: '', id: Number(id), authentication_id: Number(id), screen: 'resend' })
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
        </Center >
    );
};

export default Verification;
