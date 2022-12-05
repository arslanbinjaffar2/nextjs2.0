import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, HStack, Icon, IconButton, Image, Input, Spacer, Text, VStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Master from 'applications/app/screens/web/layouts/Master';


type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
  return (
    <Master navigation={navigation}>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" w="100%" space="3" alignItems="center">
          <Text fontSize="2xl">Practical information</Text>
          <Spacer />
          <Input rounded="10" w="60%" bg="primary.box" borderWidth={0} placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
        </HStack>
        <Box mb="3" bg="primary.box" p="0" w="100%" rounded="10" overflow="hidden">
          <HStack borderBottomWidth="1px" borderBottomColor="primary.text" px="4" py="5" space="4" alignItems="center">
            <Icon as={SimpleLineIcons} name="folder" size="lg" color="primary.text" />
            <Text fontSize="lg">Foodpanda</Text>
            <Spacer />
            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
          </HStack>
          <HStack borderBottomWidth="1px" borderBottomColor="primary.text" px="4" py="5" space="4" alignItems="center">
            <Icon as={AntDesign} name="filetext1" size="lg" color="primary.text" />
            <Text fontSize="lg">Installing Demyst’s Libraries</Text>
            <Spacer />
            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
          </HStack>
          <HStack borderBottomWidth="1px" borderBottomColor="primary.text" px="4" py="5" space="4" alignItems="center">
            <Icon as={AntDesign} name="link" size="lg" color="primary.text" />
            <Text fontSize="lg">Eventbuizz app</Text>
            <Spacer />
            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
          </HStack>
          <HStack borderBottomWidth="0px" borderBottomColor="primary.text" px="4" py="5" space="4" alignItems="center">
            <Icon as={SimpleLineIcons} name="folder" size="lg" color="primary.text" />
            <Text fontSize="lg">Cheetay</Text>
            <Spacer />
            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
          </HStack>

        </Box>
        <Image
          source={{
            uri: 'https://wallpaperaccess.com/full/316101.jpg'
          }}
          alt="Alternate Text"
          w="100%"
          h="140px"
          rounded="10"

        />

      </Container>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
