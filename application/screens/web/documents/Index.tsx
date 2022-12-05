import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, HStack, Icon, IconButton, Image, Input, Spacer, Text, VStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Master from 'application/screens/web/layouts/Master';


type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
  return (
    <Master navigation={navigation}>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text textTransform="uppercase" fontSize="2xl">Documents</Text>
          <Spacer />
          <Input rounded="10" w="60%" bg="primary.box" borderWidth={1} borderColor="primary.darkbox" placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
        </HStack>
        <Box overflow="hidden" w="100%" bg="primary.box" p="0" rounded="10">
          <HStack borderBottomWidth="1" borderBottomColor="primary.text" w="100%" px="4" py="4" space="3" alignItems="center">
            <Icon size="xl" as={MaterialIcons} name="folder" color="primary.text" />
            <VStack space="0">
              <Text fontSize="md">Foodpanda</Text>
            </VStack>
            <Spacer />
            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
          </HStack>
          <HStack borderBottomWidth="1" borderBottomColor="primary.text" w="100%" px="4" py="4" space="3" alignItems="center">
            <Icon size="xl" as={MaterialIcons} name="folder" color="primary.text" />
            <VStack space="0">
              <Text fontSize="md">Foodpanda</Text>
            </VStack>
            <Spacer />
            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
          </HStack>
          <HStack borderBottomWidth="1" borderBottomColor="primary.text" w="100%" px="4" py="4" space="3" alignItems="center">
            <Icon size="xl" as={AntDesign} name="pdffile1" color="primary.text" />
            <VStack space="0">
              <Text fontSize="md">Installing Demyst’s Libraries.pdf</Text>
              <HStack space="3" alignItems="center">
                <Text fontSize="xs">151.6 kb</Text>
                <Text fontSize="xs">2021-12-11</Text>
                <Text fontSize="xs">10:18:00</Text>
              </HStack>

            </VStack>
            <Spacer />
            <Icon as={AntDesign} name="download" size="md" color="primary.text" />
          </HStack>
          <HStack borderBottomWidth="1" borderBottomColor="primary.text" w="100%" px="4" py="4" space="3" alignItems="center">
            <Icon size="xl" as={AntDesign} name="pdffile1" color="primary.text" />
            <VStack space="0">
              <Text fontSize="md">Installing Demyst’s Libraries.pdf</Text>
              <HStack space="3" alignItems="center">
                <Text fontSize="xs">151.6 kb</Text>
                <Text fontSize="xs">2021-12-11</Text>
                <Text fontSize="xs">10:18:00</Text>
              </HStack>

            </VStack>
            <Spacer />
            <Icon as={AntDesign} name="download" size="md" color="primary.text" />
          </HStack>
          <HStack borderBottomWidth="1" borderBottomColor="primary.text" w="100%" px="4" py="4" space="3" alignItems="center">
            <Icon size="xl" as={AntDesign} name="pdffile1" color="primary.text" />
            <VStack space="0">
              <Text fontSize="md">Installing Demyst’s Libraries.pdf</Text>
              <HStack space="3" alignItems="center">
                <Text fontSize="xs">151.6 kb</Text>
                <Text fontSize="xs">2021-12-11</Text>
                <Text fontSize="xs">10:18:00</Text>
              </HStack>

            </VStack>
            <Spacer />
            <Icon as={AntDesign} name="download" size="md" color="primary.text" />
          </HStack>
          <HStack borderBottomWidth="1" borderBottomColor="primary.text" w="100%" px="4" py="4" space="3" alignItems="center">
            <Icon size="xl" as={MaterialIcons} name="folder" color="primary.text" />
            <VStack space="0">
              <Text fontSize="md">Foodpanda</Text>
            </VStack>
            <Spacer />
            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
          </HStack>
          <HStack borderBottomWidth="0" borderBottomColor="primary.text" w="100%" px="4" py="4" space="3" alignItems="center">
            <Icon size="xl" as={MaterialIcons} name="folder" color="primary.text" />
            <VStack space="0">
              <Text fontSize="md">Foodpanda</Text>
            </VStack>
            <Spacer />
            <Icon as={SimpleLineIcons} name="arrow-right" size="md" color="primary.text" />
          </HStack>

        </Box>

      </Container>

    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
