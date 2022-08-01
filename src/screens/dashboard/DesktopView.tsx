/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import PropTypes from 'prop-types';
import Layout from '@src/containers/Layout';
import { images } from '@src/styles';
import { Box, Center, Container, Flex, Heading, HStack, Image, Pressable, ScrollView, VStack } from 'native-base';
import Icosettings from '@src/assets/icons/Icosettings';
import Icoreload from '@src/assets/icons/Icoreload';
import IcoBell from '@src/assets/icons/IcoBell'


const DesktopView = ({ navigation }: any) => {
  return (
    <Layout>
      <Flex w="100%" h="100%" direction="column">
        <ScrollView>
          <Center mx="auto" maxW="1200px" w="100%" py="40px"  px="15px">
            <Container maxW="100%" w="100%">
              <HStack w="100%" alignItems="flex-start" space="5">
                <Center alignItems="flex-start" w="265px">
                  <Pressable onPress={()=>{console.log('hello')}}>
                    <Image alt='logo' source={images.Logo} w="225px" h="48px" alignSelf={'center'} />
                  </Pressable>
									
                </Center>
                <Center w="600px">
                  <VStack pb="0" space={0} w="100%">
                    <Heading fontSize="3xl">JANUAR VISION DANMARK</Heading>
                    <Heading pb="1" fontSize="xl">KØBENHAVN 29 JANUAR 11:30 - 16:30</Heading>
                    <Heading fontSize="lg" bold>DR Koncerthus STUDIO 2, 2300 København S</Heading>
                  </VStack>
                </Center>
                <Center alignItems="flex-end" w="265px">
                  <HStack space="5">
                    <Box><Pressable onPress={()=>{console.log('hello')}}><Icosettings width={32} height={32} /></Pressable></Box>
                    <Box><Pressable onPress={()=>{console.log('hello')}}><Icoreload width={34} height={32} /></Pressable></Box>
                    <Box><Pressable onPress={()=>{console.log('hello')}}><IcoBell width={32} height={32} /></Pressable></Box>
                  </HStack>
									
                </Center>
              </HStack>
            </Container>
						
          </Center>
        </ScrollView>
      </Flex>
			
    </Layout>
  );
};

DesktopView.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default DesktopView;
