import * as React from 'react';
import PropTypes from 'prop-types';
import { images } from 'application/styles';
import Master from 'application/screens/mobile/layouts/Master';
import { Button, Center, Flex, Text, VStack, Image, FormControl, Spinner, Divider, View } from 'native-base';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import UseAuthService from 'application/store/services/UseAuthService';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import UseEventService from 'application/store/services/UseEventService';
import { Link } from 'solito/link'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Countdown from "react-countdown";
import styles from 'application/screens/mobile/auth/styles/styles';

type Inputs = {
    code: string,
};

const CELL_COUNT = 6;

const Verification = ({ navigation, route }: any) => {

    const { event } = UseEventService();

    const [id,] = React.useState(route.params.id);

    const { processing, verification, loadProvider, error, response } = UseAuthService();

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = input => {
        verification({ code: input.code, id: Number(id), authentication_id: Number(id), screen: 'verification', provider: 'email' })
    };

    const [value, setValue] = React.useState('');

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    React.useEffect(() => {
        loadProvider({ id: id, screen: 'verification' });
    }, [id])

    return (
        <Master navigation={navigation}>
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
                                        render={({ field: { onChange, value } }) => (
                                            <CodeField
                                                ref={ref}
                                                {...props}
                                                value={value}
                                                onChangeText={(val) => {
                                                    onChange(val);
                                                    setValue(val);
                                                }}
                                                cellCount={CELL_COUNT}
                                                rootStyle={styles.codeFiledRoot}
                                                keyboardType="number-pad"
                                                textContentType="oneTimeCode"
                                                renderCell={({ index, symbol, isFocused }) => (
                                                    <View
                                                        key={index}
                                                        onLayout={getCellOnLayoutHandler(index)}
                                                    >
                                                        <Text
                                                            key={index}
                                                            style={[styles.cell, isFocused && styles.focusCell]}>
                                                            {symbol || (isFocused ? <Cursor /> : null)}
                                                        </Text>
                                                    </View>
                                                )}
                                            />
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
            </Center>
        </Master>
    );
};

Verification.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default Verification;
