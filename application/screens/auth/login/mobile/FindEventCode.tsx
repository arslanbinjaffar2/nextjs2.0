import * as React from 'react';
import PropTypes from 'prop-types';
import { images } from 'application/styles';
import Layout from 'application/containers/mobile/Layout';
import { Button, Center, Flex, Text, VStack, Image, Input } from 'native-base';
import IcoLogin from 'application/assets/icons/IcoLogin';
import { Link as SolitoLink } from 'solito/link';

const FindEventCode = ({ navigation }: any) => {
    return (
        <Layout>
            <Center w={'100%'} pt={20} px={15}>
                <Flex w="100%" rounded="10">
                    <Image alt='logo' mb={8} source={images.Logo} w="180px" h="39px" alignSelf={'center'} />
                    <VStack opacity="0.7" space='4' bg='primary.box' py='5' px='4' borderRadius='lg'>
                        <Text fontSize='lg' lineHeight='sm'>Enter the event code you have received from your organizer.</Text>
                        <SolitoLink href="/events">
                            <Input placeholder="Event code…" InputRightElement={<Button pointerEvents="none" h="46px"><IcoLogin /></Button>} />
                        </SolitoLink>
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
