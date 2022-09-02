import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, HStack, Icon, IconButton, Image, Spacer, Text, VStack} from 'native-base';
import {AntDesign,SimpleLineIcons} from '@expo/vector-icons';
import Master from '@src/screens/web/layouts/Master';


type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps)  => {
  return (
    <Master navigation={navigation}>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <HStack  space="3" alignItems="center">
            <Icon as={AntDesign} name="arrowleft" size="xl" color="primary.text"  />
            <Text  fontSize="2xl">BACK</Text>
          </HStack>
          <Spacer />
          <Text fontSize="xl">Installing Demyst’s Libraries</Text>
        </HStack>
        <Box w="100%" bg="primary.box" p="4" rounded="lg">
          <Text mb="3" fontSize="md">Gul Ahmad is, firm, organization, etc., that finances and buysthe time to broadcast a radio or 
television program so as to advertise a product, a political party, etc. person who makes 
a pledge or promise on behalf of another.</Text>
          <Image
            mb="4"
            source={{
              uri:'https://wallpaperaccess.com/full/316101.jpg'
            }}
            alt="Alternate Text"
            w="100%"
            h="250px"
            rounded="lg"
          
          />
          
        </Box>
        
      </Container>      
    </Master>
  );
};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
