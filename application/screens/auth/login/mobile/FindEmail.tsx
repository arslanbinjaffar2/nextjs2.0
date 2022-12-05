import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Center, Flex, Text, VStack, Image, Input } from 'native-base';
import { images } from 'applications/app/styles';
import Layout from 'applications/app/containers/mobile/Layout';
import IcoLongArrow from 'applications/app/assets/icons/IcoLongArrow';
import { Link as SolitoLink } from 'solito/link';

const FindEmail = ({ navigation }: any) => {
    return (
        <Layout>
            <Center w={'100%'} pt="20" px={15}>
                <Flex w="100%" rounded="10">
                    <Image alt='logo' mb={8} source={images.Logo} w="180px" h="39px" alignSelf={'center'} />
                    <VStack space='4' bg='primary.box' py='5' px='4' borderRadius='lg'>
                        <Text fontSize='lg' lineHeight='sm'>Please enter the Email  address to find your events.</Text>
                        <SolitoLink href="/events">
                            <Input placeholder="Email" InputRightElement={<Button pointerEvents="none" h="46px"><IcoLongArrow /></Button>} />
                        </SolitoLink>
                    </VStack>
                </Flex>
            </Center>
        </Layout>
    );
};

FindEmail.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default FindEmail;
