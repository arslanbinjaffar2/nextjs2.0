/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import PropTypes from 'prop-types';
import { images } from '@src/styles';
import Layout from '@src/containers/Layout';
import { Button, Center, Flex, Text, VStack, Image, View } from 'native-base';
import { Platform } from 'react-native';

const platform = Platform.OS !== 'web'? false : true;


const SplashScreen = ({ navigation }) => {
  const Content = () => {
    return(
      <React.Fragment>
        <Flex justify="flex-end" p="0" mb={platform ? '25px' : 0} w="100%" h={platform ? 'auto' : '50%'}>
          <Image alt='logo' source={images.Logo} w="240" h="52" alignSelf={'center'} />
        </Flex>
        <Flex justify="center" align="center"  pt="sm"  w="100%" h={platform ? 'auto' : '50%'}>
          <Text fontSize={'34px'} textTransform={'uppercase'} mb="5">Welcome</Text>
          <VStack w="100%" space={4} alignItems="center">
            <Button _text={{fontSize: '22px'}} bg="black" size={'lg'} w="100%" shadow={2} onPress={() => navigation.navigate('login')}>
              LOGIN WITH EVENT CODE
            </Button>
            <Button _text={{fontSize: '22px'}} w="100%" size={'lg'}  shadow={2} onPress={() => navigation.navigate('login-by-email')}>
              LOGIN WITH EMAIL
            </Button>
          </VStack>
        </Flex>
      </React.Fragment>
    )}
  return (
    <Layout>
      <Center w={'100%'} flex={1}  px={15}>
        <View alignItems="center" justifyContent="center" w="100%" h="100%">
          {!platform &&  <Content navigation={navigation} />}
          {platform &&  
          <View rounded="12" w={450} p="25px" bg="primary.box">
            <Content navigation={navigation} />
          </View>
          }
        </View>
      </Center>
    </Layout>
  );
};

SplashScreen.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
};

export default SplashScreen;
