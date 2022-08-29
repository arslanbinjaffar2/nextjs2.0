import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Center, Flex, Text, Image, Input, VStack, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import IcoLongArrow from '@src/assets/icons/IcoLongArrow';
import { images } from '@src/styles';
import BackgroundLayout from '@src/screens/web/layouts/BackgroundLayout';

const Login = ({ navigation }: any) => {
  return (
    <BackgroundLayout>
      <Center w={'100%'} h="100%" alignItems={'center'} px={15}>
        <Flex maxWidth={'550px'} bg="primary.box" p="50px" w="100%" rounded="lg">
          <Image alt='logo' mb={8} source={images.Logo} w="180px" h="39px" alignSelf={'center'} />
          <VStack w={'100%'} alignItems={'center'} space='4'>
            <Text w={'100%'} fontSize='lg' lineHeight='sm'>Enter the event code you have received from your organizer.</Text>
            <Input type="text" InputLeftElement={<Icon as={<Ionicons name="mail-outline" />} size={5} ml="2" color="primary.text" />} w={'100%'} placeholder="Email" />
            <Input type="password" leftElement={<Icon as={<Ionicons name="lock-closed-outline" />} size={5} ml="2" color="primary.text" />} w={'100%'} placeholder="Password" />
            <Button
              maxW={'230px'}
              w={'100%'}
              endIcon={<IcoLongArrow />}
              _hover={{ bg: 'primary.secondary' }}
              onPress={() => {
                navigation.navigate('dashboard')
              }}
            >
              Login
            </Button>
          </VStack>
        </Flex>
      </Center>
    </BackgroundLayout>
  );
};

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Login;
