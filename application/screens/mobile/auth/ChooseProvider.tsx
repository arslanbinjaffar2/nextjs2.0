import * as React from 'react';
import PropTypes from 'prop-types';
import { images } from 'application/styles';
import Master from 'application/screens/mobile/layouts/Master';
import { Button, Center, Flex, Text, VStack, Image, Input, FormControl, Icon, Spinner, Divider, Radio } from 'native-base';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import UseAuthService from 'application/store/services/UseAuthService';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import UseEventService from 'application/store/services/UseEventService';
import { Link } from 'solito/link'

type Inputs = {
    provider: string,
};

const ChooseProvider = ({ navigation, route }: any) => {

    const { event } = UseEventService();

    const [id,] = React.useState<number>(route.params?.id);

    const { processing, chooseProvider, loadProvider, error, response } = UseAuthService();

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = input => {
        chooseProvider({ provider: input.provider, id: id, screen: 'choose-provider' })
    };

    React.useEffect(() => {
        if (id !== undefined) {
            loadProvider({ id: id, screen: 'choose-provider' });
        }
    }, [id])

    return (
        <Master navigation={navigation}>
            <Center w={'100%'} pt={20} px={15}>
                <Flex w="100%" rounded="10">
                    <Image alt='logo' mb={8} source={images.Logo} w="180px" h="61px" alignSelf={'center'} />
                    {Object.keys(response).length > 0 ? (
                        <VStack w={'100%'} alignItems={'center'} space='4'>
                            <VStack space="20px" width={'100%'}>
                                <Text w={'100%'} fontSize='lg' lineHeight='sm' >{event.labels.DESKTOP_CHOOSE_SERVICE_PROVIDER_HEADING}</Text>
                                <FormControl isRequired isInvalid={'provider' in errors || error !== ''}>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange } }) => (
                                            <Radio.Group
                                                name="provider"
                                                flexDirection="column"
                                                onChange={(val) => onChange(val)}
                                                accessibilityLabel="Choose a provider"
                                            >
                                                <Radio value="sms" my="2" backgroundColor="#fff">
                                                    <Text mx={2}>{response.data?.phone}</Text>
                                                </Radio>
                                                <Radio value="email" my="2" backgroundColor="#fff">
                                                    <Text mx={2}>{response.data?.email}</Text>
                                                </Radio>
                                            </Radio.Group>
                                        )}
                                        name="provider"
                                        rules={{ required: 'Provider is required' }}
                                    />
                                    <FormControl.ErrorMessage>
                                        {error ? error : errors.provider?.message}
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

ChooseProvider.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default ChooseProvider;
