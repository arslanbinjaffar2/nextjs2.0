import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Divider, HStack, Icon, Image, Input, Text, VStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Master from 'applications/app/screens/web/layouts/Master';


type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
  return (
    <Master navigation={navigation}>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text textTransform="uppercase" fontSize="2xl">FLoor Plan</Text>
        </HStack>
        <Image
          source={{
            uri: 'https://wallpaperaccess.com/full/317510.jpg'
          }}
          alt="Alternate Text"
          w="100%"
          h="650px"
          rounded="10"
          mb="3"
        />
        <Box w="100%" bg="primary.box" overflow="hidden" rounded="10px">
          <Input bg="transparent" rounded="0" w="100%" borderWidth={0} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
          <Divider w="100%" bg="primary.text" h="1px" />
          <VStack mb="10" w="100%" space="0">
            <Text borderBottomWidth="1" borderBottomColor="primary.text" px="3" py="2" fontSize="md">A1, Amnesty youth</Text>
            <Text borderBottomWidth="1" borderBottomColor="primary.text" px="3" py="2" fontSize="md">A2, Ungdomssken & UU kobenhavn</Text>
            <Text borderBottomWidth="1" borderBottomColor="primary.text" px="3" py="2" fontSize="md">A3, Dansk Industry (DI)</Text>
          </VStack>
        </Box>
      </Container>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
