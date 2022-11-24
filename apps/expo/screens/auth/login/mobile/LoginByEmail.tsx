import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Center, Flex, Text, VStack, Image, Input } from 'native-base';
import { images } from 'app/styles';
import Layout from 'app/containers/mobile/Layout';
import IcoLongArrow from 'app/assets/icons/IcoLongArrow';

const LoginByEmail = ({ navigation }: any) => {
  return (
    <Layout>
      <Center w={'100%'} pt="20" px={15}>
        <Flex w="100%" rounded="10">
          <Image alt='logo' mb={8} source={images.Logo} w="180px" h="39px" alignSelf={'center'} />
          <VStack space='4' bg='primary.box' py='5' px='4' borderRadius='lg'>
            <Text fontSize='lg' lineHeight='sm'>Please enter the Email  address to find your events.</Text>
            <Input placeholder="Email" InputRightElement={<Button h="46px" onPress={() => navigation.navigate('event-list')}><IcoLongArrow /></Button>} />
          </VStack>
        </Flex>
      </Center>
    </Layout>
  );
};

LoginByEmail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default LoginByEmail;
