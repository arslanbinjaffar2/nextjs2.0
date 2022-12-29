import * as React from 'react';
import { Button, Center, Flex, Text, Image, Input, VStack, Icon, Radio, FormControl } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import IcoLongArrow from 'application/assets/icons/IcoLongArrow';
import { images } from 'application/styles';
import BackgroundLayout from 'application/screens/web/layouts/BackgroundLayout';
import UseEventService from 'application/services/UseEventService';
import UseAuthService from 'application/services/UseAuthService';
import { useRouter } from 'solito/router'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import AuthLayout from 'application/screens/web/layouts/AuthLayout';
import { Link } from 'solito/link'

type Inputs = {
    provider: string,
};

const ChoosePassword = ({ props }: any) => {

    const { event } = UseEventService();

    const { isLoggedIn, processing, chooseProvider, error, response } = UseAuthService();

    const { push } = useRouter();

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = input => {
        chooseProvider({ provider: input.provider })
    };

    React.useEffect(() => {
        if (response.redirect === "choose-provider") {
            push(`/${event.url}/auth/choose-provider/${response.data.authentication_id}`)
        } else if (response.redirect === "verification") {
            push(`/${event.url}/auth/verification/${response.data.authentication_id}`)
        } else if (response.redirect === "login") {
            push(`/${event.url}/auth/login`)
        } else if (response.redirect === "dashboard") {
            push(`/${event.url}/dashboard`)
        }
    }, [response.redirect])

    return (
        <AuthLayout>
            <BackgroundLayout>
                <Center w={'100%'} h="100%" alignItems={'center'} px={15}>
                    <Flex borderWidth="1px" borderColor="primary.bdColor" maxWidth={'550px'} bg="primary.box" p={{ base: '30px', md: '50px' }} w="100%" rounded="10">
                        <Image alt='logo' mb={{ base: 5, lg: 10 }} source={{ uri: images.Logo }} w="180px" h="39px" alignSelf={'center'} />
                        <VStack w={'100%'} alignItems={'center'} space='4'>
                            <VStack space="20px" width={'100%'}>
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
                                                <Radio value="sms" my="2" background="#fff">
                                                    <Text mx={2}>Sms</Text>
                                                </Radio>
                                                <Radio value="email" my="2" background="#fff">
                                                    <Text mx={2}>Email</Text>
                                                </Radio>
                                            </Radio.Group>
                                        )}
                                        name="provider"
                                        rules={{ required: 'Provider is required'}}
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
                    </Flex>
                </Center >
            </BackgroundLayout >
        </AuthLayout>
    );
};

export default ChoosePassword;
