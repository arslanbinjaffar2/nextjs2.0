import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/mobile/layouts/Master';

import IndexTemplate from 'application/components/templates/subRegistration/web/Index';

import { Center, Container, Flex, HStack, ScrollView } from 'native-base';


import { useWindowDimensions } from 'react-native';


type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
  const { width } = useWindowDimensions();

  return (
    <Master navigation={navigation}>
      <Center w={'100%'} px={15}>
        <Flex w="100%" h="100%" direction="column">
          <ScrollView nativeID="body-scroll"
          >
            <Flex mx="auto" maxW={width <= 1200 && width >= 970 ? '970px' : width <= 970 ? '725px' : '1200px'} w="100%" py="40px" px="15px">
              <Container position="relative" maxW="100%" w="100%">
                <HStack w="100%" pt="3" space="5" alignItems="flex-start">
                  <Center h={'100%'} w="100%" alignItems="flex-start" justifyContent="flex-start" maxW={(width > 750 ? '600px' : '100%')}>
                    <IndexTemplate />
                  </Center>
                </HStack>
              </Container>
            </Flex>
          </ScrollView>
      </Flex>
      </Center>
    </Master>
      
     
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
