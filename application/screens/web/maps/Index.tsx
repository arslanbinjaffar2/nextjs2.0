import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, HStack, Image, Text} from 'native-base';
import Master from 'application/screens/web/layouts/Master';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps)  => {
  return (
    <Master>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text textTransform="uppercase" fontSize="2xl">Map</Text>
        </HStack>
        <Box mb="3" w="100%" overflow="hidden" bg="primary.box" p="0" rounded="10">
          <iframe style={{border: 'none'}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2250.0526149119282!2d12.540472516030071!3d55.67068520578965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465253991407ea6b%3A0xb98bf0442b09ac6d!2sEventbuizz!5e0!3m2!1sen!2s!4v1662112095755!5m2!1sen!2s" width="100%" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </Box>
        <Image
          source={{
            uri:'https://wallpaperaccess.com/full/317501.jpg'
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

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
