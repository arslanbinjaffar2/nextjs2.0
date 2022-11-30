import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Center, Flex, Text, Image, Input, VStack, Icon } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import IcoLongArrow from 'app/assets/icons/IcoLongArrow';
import { images } from 'app/styles';
import BackgroundLayout from 'app/screens/web/layouts/BackgroundLayout';
import { Link as SolitoLink } from 'solito/link'

const Login = ({ navigation }: any) => {
  return (
    <BackgroundLayout>
      <Center w={'100%'} h="100%" alignItems={'center'} px={15}>
        <Flex borderWidth="1px" borderColor="primary.bdColor" maxWidth={'550px'} bg="primary.box" p={{ base: '30px', md: '50px' }} w="100%" rounded="10">
          <Image alt='logo' mb={{ base: 5, lg: 10 }} source={images.Logo} w="180px" h="39px" alignSelf={'center'} />
          <VStack w={'100%'} alignItems={'center'} space='4'>
            <Text w={'100%'} fontSize='lg' lineHeight='sm'>Enter the event code you have received from your organizer.</Text>
            <Input type="text" InputLeftElement={<Icon as={<Ionicons name="mail-outline" />} size={5} ml="2" color="primary.text" />} w={'100%'} placeholder="Email" />
            <Input type="password" leftElement={<Icon as={<Ionicons name="lock-closed-outline" />} size={5} ml="2" color="primary.text" />} w={'100%'} placeholder="Password" />
            <SolitoLink href="/dashboard">
              <Button
                maxW={'230px'}
                w={'100%'}
                minH='48px'
                endIcon={<IcoLongArrow />}
                _hover={{ bg: 'primary.secondary' }}
                pointerEvents="none"
              >
              </Button>
            </SolitoLink>
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
