import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Container, Heading, HStack, Icon, Image, Input, Spacer, Text, VStack} from 'native-base';
import Master from '@src/screens/web/layouts/Master';
import {AntDesign} from '@expo/vector-icons';


type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps)  => {
  return (
    <Master navigation={navigation}>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text textTransform="uppercase" fontSize="2xl">Chats</Text>
        </HStack>

      </Container>
      
    </Master>
  );
};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
