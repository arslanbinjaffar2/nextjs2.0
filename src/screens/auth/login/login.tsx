import * as React from 'react';
import PropTypes from 'prop-types';
import { images } from '@src/styles';
import Layout from '@src/containers/Layout';
import { Center, Flex, Text, VStack, Image, Input, Box } from 'native-base';

const Login = () => {
  return (
    <Layout>
      <Center w={'100%'} pt="20" px={15}>
        <Flex w="100%" rounded="lg">
          <Image alt='logo' mb={8} source={images.Logo} w="180px" h="39px" alignSelf={'center'} />
          <VStack opacity="0.7" space='4' bg='primary.box' py='5' px='4' borderRadius='lg'>
            <Text fontSize='lg' lineHeight='sm'>Enter the event code you have received from your organizer.</Text>
            <Input placeholder="Default Input" />
          </VStack>
        </Flex>
      </Center>
    </Layout>
  );
};

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Login;
