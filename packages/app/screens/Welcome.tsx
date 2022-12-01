import * as React from 'react';
import PropTypes from 'prop-types';
import { images } from 'app/styles';
import Layout from 'app/containers/mobile/Layout';
import { Button, Center, Flex, Text, VStack, Image, View } from 'native-base';
import { Link as SolitoLink } from 'solito/link'

const Welcome = ({ navigation }: any) => {

  return (
    <Layout>
      <Center w={'100%'} flex={1} px={15}>
        <View alignItems="center" justifyContent="center" w="100%" h="100%">
          <Flex justify="flex-end" p="0" w="100%" h={'50%'}>
            <Image alt='logo' source={images?.Logo} w="240" h="52" alignSelf={'center'} />
          </Flex>
          <Flex justify="center" align="center" w="100%" h={'50%'}>
            <Text fontSize={'34px'} textTransform={'uppercase'} mb="1">Welcome</Text>
            <VStack w="100%" space={4} alignItems="center">
              <SolitoLink href="/event-code-login" viewProps={{ style: { width: '100%' } }}>
                <Button pointerEvents="none" _text={{ fontSize: '22px' }} bg="black" size={'lg'} shadow={2}>
                  LOGIN WITH EVENT CODE
                </Button>
              </SolitoLink>
              <SolitoLink href="/email-login" viewProps={{ style: { width: '100%' } }}>
                <Button pointerEvents="none" _text={{ fontSize: '22px' }} size={'lg'} shadow={2}>
                  LOGIN WITH EMAIL
                </Button>
              </SolitoLink>
            </VStack>
          </Flex>
        </View>
      </Center>
    </Layout>
  );

};

Welcome.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Welcome;
