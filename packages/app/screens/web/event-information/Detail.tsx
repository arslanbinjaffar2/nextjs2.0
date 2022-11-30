import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, HStack, Icon, IconButton, Image, Spacer, Text, VStack, ZStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Master from 'app/screens/web/layouts/Master';


type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {
  return (
    <Master navigation={navigation}>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <HStack space="3" alignItems="center">
            <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text" />
            <Text fontSize="2xl">BACK</Text>
          </HStack>
          <Spacer />
          <Text fontSize="xl">Installing Demyst’s Libraries</Text>
        </HStack>
        <Box mb="3" w="100%" bg="primary.box" py="4" rounded="10">
          <Text px="4" mb="3" fontSize="md">Gul Ahmad is, firm, organization, etc., that finances and buysthe time to broadcast a radio or television program so as to advertise a product, a political party, etc. person who makes a pledge or promise on behalf of another.</Text>
          <Box w="100%" mb="4" px="4" rounded="10">
            <Image
              source={{
                uri: 'https://wallpaperaccess.com/full/316101.jpg'
              }}
              alt="Alternate Text"
              w="100%"
              h="250px"
              rounded="10"

            />
          </Box>

          <HStack mb="3" bg="primary.darkbox" py="1" px="4" space="2" alignItems="center">
            <Icon as={AntDesign} name="file1" size="md" />
            <Text fontSize="lg">Documents</Text>
          </HStack>
          <VStack px="4" w="100%" space="1">
            <HStack w="100%" space="2" alignItems="center">
              <Icon as={AntDesign} name="pdffile1" size="md" />
              <Text fontSize="md">10 things we can do to help</Text>

            </HStack>
          </VStack>
        </Box>
        <Image
          source={{
            uri: 'https://wallpaperaccess.com/full/317501.jpg'
          }}
          alt="Alternate Text"
          w="100%"
          h="150px"
          rounded="10"

        />

      </Container>
    </Master>
  );
};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
