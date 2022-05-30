/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import PropTypes from 'prop-types';
import { images } from '@src/styles';
import Layout from '@src/containers/Layout';
import { Button, Center, Flex, Text, VStack, Image } from 'native-base';

const SplashScreen = ({ navigation }) => {
  return (
    <Layout>
      <Center w={'100%'} flex={1}  px={15}>
        <Flex justify="flex-end" p="0" w="100%" h="50%">
          <Image alt='logo' source={images.Logo} w="240" h="52" alignSelf={'center'} />
        </Flex>
        <Flex justify="center" align="center"  pt="10"  w="100%" h="50%">
          <Text fontSize={'34px'} textTransform={'uppercase'} mb="5">Welcome</Text>
          <VStack w="100%" space={4} alignItems="center">
            <Button _text={{fontSize: '22px'}} bg="black" size={'lg'} w="100%" shadow={2} onPress={() => navigation.navigate('Login')}>
              LOGIN WITH EVENT CODE
            </Button>
            <Button _text={{fontSize: '22px'}} w="100%" size={'lg'}  shadow={2} onPress={() => console.log('hello world')}>
              LOGIN WITH EMAIL
            </Button>
          </VStack>
        </Flex>
        
      </Center>
    </Layout>
  );
};

SplashScreen.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
};

export default SplashScreen;
