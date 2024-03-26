import * as React from 'react';
import { Button, Center, Flex, Text, Image, VStack, Radio, FormControl, Spinner } from 'native-base';
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
import UseEnvService from 'application/store/services/UseEnvService';

type Inputs = {
    provider: string,
};

type ScreenParams = { id: string }

const { useParam } = createParam<ScreenParams>()

const ChooseProvider = ({ props }: any) => {

    const { event } = UseEventService();

    const { _env } = UseEnvService();

    const { processing, chooseProvider, loadProvider, error, response } = UseAuthService();

    const { push } = useRouter();

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<Inputs>();

    const [id] = useParam('id')

    const onSubmit: SubmitHandler<Inputs> = input => {
        chooseProvider({ provider: input.provider, id: Number(id), screen: 'choose-provider' })
    };

    React.useEffect(() => {
        if (response.redirect === "verification") {
            push(`/${event.url}/auth/verification/${response.data.authentication_id}`)
        }
    }, [response.redirect])

    React.useEffect(() => {
        if (id) {
            loadProvider({id: Number(id), screen: 'choose-provider'});
        }
    }, [id])

    return (
            <Center w={'100%'} h="100%" alignItems={'center'} px={15}>
                <Flex borderWidth="1px" borderColor="primary.bdColor" maxWidth={'550px'} bg="primary.box" p={{ base: '30px', md: '50px' }} w="100%" rounded="10">
                    <Image alt='logo' mb={{ base: 5, lg: 10 }} source={{ uri: ((event.settings?.header_logo !== undefined && event.settings?.header_logo !== '') ? `${_env.eventcenter_base_url}/assets/event/branding/${event.settings?.header_logo}` : images.Logo) }} w="180px" h="61px" alignSelf={'center'} />
                    {Object.keys(response).length > 0 ? (
                        <VStack w={'100%'} alignItems={'center'} space='4'>
                            <VStack space="20px" width={'100%'}>
                                <Text w={'100%'} fontSize='lg' lineHeight='sm' textAlign={'center'} >{event.labels.EVENTSITE_TWO_FACTOR_AUTHENTICATION}</Text>
                                <Text w={'100%'} fontSize='lg' lineHeight='sm' >{event.labels.EVENTSITE_AUTHENTICATION_CONTACT_METHOD}</Text>
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
                                                    <Text mx={2}>{response.data.phone}</Text>
                                                </Radio>
                                                <Radio value="email" my="2" backgroundColor="#fff">
                                                    <Text mx={2}>{response.data.email}</Text>
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
                            <Text nativeID='css-reset-4rbku5' fontSize="md">
                                <Link href={`/${event.url}/auth/login`}>
                                    {`${event.labels.DESKTOP_APP_LABEL_GO_BACK_TO} ${event.labels.DESKTOP_APP_LABEL_LOGIN}`}
                                </Link>
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
                    ) : (
                        <VStack space={10} height='187px' alignItems="center" style={{ justifyContent: 'center' }}>
                            <Spinner accessibilityLabel="Loading posts" />
                        </VStack>
                    )}
                </Flex>
            </Center >
    );
};

export default ChooseProvider;
