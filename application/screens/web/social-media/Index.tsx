import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Center, Container, Flex, HStack, Icon, Text } from 'native-base';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Master from 'applications/app/screens/web/layouts/Master';


type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
  return (
    <Master navigation={navigation}>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text textTransform="uppercase" fontSize="2xl">Social media</Text>
        </HStack>
        <Box w="100%" mb="3" bg="primary.box" p="8" pb="1" rounded="10px">
          <Flex direction="row" flexWrap="wrap">
            <Center mb="8" w="25%" alignItems="center" justifyContent="center">
              <Box w="90px" h="90px" shadow="1" bg="#314A7E" rounded="100%" alignItems="center" justifyContent="center">
                <Icon textAlign="center" color="#fff" size="5xl" as={FontAwesome} name="facebook" />
              </Box>
            </Center>
            <Center mb="8" w="25%" alignItems="center" justifyContent="center">
              <Box w="90px" h="90px" shadow="1" bg="#339DC3" rounded="100%" alignItems="center" justifyContent="center">
                <Icon textAlign="center" color="#fff" size="5xl" as={FontAwesome} name="twitter" />
              </Box>
            </Center>
            <Center mb="8" w="25%" alignItems="center" justifyContent="center">
              <Box w="90px" h="90px" shadow="1" bg="#005983" rounded="100%" alignItems="center" justifyContent="center">
                <Icon textAlign="center" color="#fff" size="5xl" as={FontAwesome} name="linkedin" />
              </Box>
            </Center>
            <Center mb="8" w="25%" alignItems="center" justifyContent="center">
              <Box w="90px" h="90px" shadow="1" bg="#314A7E" rounded="100%" alignItems="center" justifyContent="center">
                <Icon textAlign="center" color="#fff" size="5xl" as={FontAwesome} name="flickr" />
              </Box>
            </Center>
            <Center mb="8" w="25%" alignItems="center" justifyContent="center">
              <Box w="90px" h="90px" shadow="1" bg={{
                linearGradient: {
                  colors: ['#fdf497', '#fdf497', '#fd5949', '#d6249f', '#285AEB'],
                  start: [0, 0, 0, 0, 0],
                  end: [1, 0, 0, 0, 0]
                }
              }} rounded="100%" alignItems="center" justifyContent="center">
                <Icon textAlign="center" color="#fff" size="5xl" as={FontAwesome} name="instagram" />
              </Box>
            </Center>
            <Center mb="8" w="25%" alignItems="center" justifyContent="center">
              <Box w="90px" h="90px" shadow="1" bg="#E52D27" rounded="100%" alignItems="center" justifyContent="center">
                <Icon textAlign="center" color="#fff" size="5xl" as={FontAwesome} name="youtube" />
              </Box>
            </Center>
            <Center mb="8" w="25%" alignItems="center" justifyContent="center">
              <Box w="90px" h="90px" shadow="1" bg="#0A819F" rounded="100%" alignItems="center" justifyContent="center">
                <Icon textAlign="center" color="#fff" size="5xl" as={FontAwesome} name="vimeo" />
              </Box>
            </Center>
            <Center mb="8" w="25%" alignItems="center" justifyContent="center">
              <Box w="90px" h="90px" shadow="1" bg="#D45E1E" rounded="100%" alignItems="center" justifyContent="center">
                <Icon textAlign="center" color="#fff" size="5xl" as={FontAwesome} name="rss" />
              </Box>
            </Center>
          </Flex>
        </Box>
      </Container>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
