import * as React from 'react';
import PropTypes from 'prop-types';
import { images } from 'application/styles';
import Layout from 'application/containers/mobile/Layout';
import { Button, Center, Flex, Text, VStack, Image, Input, FormControl } from 'native-base';
import IcoLogin from 'application/assets/icons/IcoLogin';
import { useRouter } from 'solito/router'
import UseAuthService from 'application/store/services/UseAuthService';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import UseEventService from 'application/store/services/UseEventService';
import UseErrorService from 'application/store/services/UseErrorService';

type Inputs = {
    code: string,
};

const FindEventCode = ({ navigation }: any) => {

    const { event, FetchEventByCode } = UseEventService();

    const { message } = UseErrorService();

    const { isLoggedIn, processing, login } = UseAuthService();

    const { push } = useRouter();

    const { register, handleSubmit, watch, control, formState: { errors } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = input => {
        FetchEventByCode(input.code)
    };

    return (
        <Layout>
            <Center w={'100%'} pt={20} px={15}>
                <Flex w="100%" rounded="10">
                    <Image alt='logo' mb={8} source={images.Logo} w="180px" h="39px" alignSelf={'center'} />
                    <VStack opacity="0.7" space='4' bg='primary.box' py='5' px='4' borderRadius='lg'>
                        <Text fontSize='lg' lineHeight='sm'>Enter the event code you have received from your organizer.</Text>
                        <FormControl isRequired isInvalid={'code' in errors || message !== ''}>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input onBlur={onBlur} onChangeText={(val) => onChange(val)} value={value} placeholder="Event code…" InputRightElement={<Button onPress={handleSubmit(onSubmit)} h="46px"><IcoLogin /></Button>} />
                                )}
                                rules={{
                                    required: 'Field is required'
                                }}
                                name="code"
                                defaultValue=""
                            />
                            <FormControl.ErrorMessage>
                                {errors.code?.type === 'required'
                                    ? 'Event code is required'
                                    : (message ? message : errors.code?.message)}
                            </FormControl.ErrorMessage>
                        </FormControl>
                    </VStack>
                </Flex>
            </Center>
        </Layout>
    );
};

FindEventCode.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default FindEventCode;