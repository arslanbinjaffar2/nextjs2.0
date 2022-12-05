import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Center, Container, Flex, HStack, Icon, Input, Spacer, Switch, Text } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign'
import Master from 'app/screens/web/layouts/Master';

type indexProps = {
  navigation: unknown
}

type checkboxProps = {
  title: string,
  checked: boolean
}

const CheckboxWrapp = ({ title, checked }: checkboxProps) => {
  const [status, setstatus] = React.useState(checked)
  return (
    <Button
      bg={status ? 'primary.secondary' : 'primary.darkbox'}
      px="3"
      py="1"
      mx="1"
      mb="3"
      _hover={{ bg: status ? 'primary.secondary' : 'primary.darkbox' }}
      _pressed={{ bg: status ? 'primary.secondary' : 'primary.darkbox' }}
      _text={{ fontSize: 'lg' }}
      rounded="20px"
      leftIcon={<Icon as={AntDesign} name={status ? 'check' : 'plus'} />}
      onPress={() => {
        setstatus(!status)
      }}

    >
      {title}
    </Button>
  )
}
const Index = ({ navigation }: indexProps) => {
  return (
    <Master navigation={navigation}>
      <Container pt="2" maxW="100%" w="100%">
        <HStack mb="3" pt="2" w="100%" space="3" alignItems="center">
          <Text textTransform="uppercase" fontSize="2xl">Network interest</Text>
        </HStack>
        <HStack mx="-2" space="0" alignItems="center" flexWrap="wrap">
          <Center mb="3" px="1">
            <Button
              px="6"
              py="1"
              rounded="20px"
              bg="primary.500"
              borderWidth="1"
              _text={{ fontSize: 'lg' }}
              borderColor="primary.bdBox"
              colorScheme="primary"
              onPress={() => {
                console.log('hello')
              }}
            >
              All
            </Button>
          </Center>
          <Center mb="3" px="1">
            <Button
              px="6"
              py="1"
              rounded="20px"
              bg="primary.box"
              borderWidth="1"
              borderColor="primary.bdBox"
              _text={{ fontSize: 'lg' }}
              colorScheme="primary"
              onPress={() => {
                console.log('hello')
              }}
            >
              Cetagory 01
            </Button>
          </Center>
          <Center mb="3" px="1">
            <Button
              px="6"
              py="1"
              rounded="20px"
              bg="primary.box"
              borderWidth="1"
              borderColor="primary.bdBox"
              _text={{ fontSize: 'lg' }}
              colorScheme="primary"
              onPress={() => {
                console.log('hello')
              }}
            >
              Cetagory 02
            </Button>
          </Center>
        </HStack>
        <Box w="100%" mb="3">
          <Input rounded="10" w="100%" bg="primary.box" borderWidth={1} borderColor="primary.darkbox" placeholder="Search" leftElement={<Icon ml="2" color="primary.text" size="lg" as={AntDesign} name="search1" />} />
        </Box>
        <Box minH="250px" w="100%" mb="3" bg="primary.box" pt="4" px="5" pb="1" rounded="10px">
          <Text mb="2" fontSize="lg">Cetagory 01</Text>
          <Flex mx="-2" mb="1" direction="row" flexWrap="wrap">
            <CheckboxWrapp checked={false} title="Game name" />
            <CheckboxWrapp checked={true} title="card" />
            <CheckboxWrapp checked={false} title="Racing Zone out" />
          </Flex>
          <Text mb="2" fontSize="lg">Cetagory 02</Text>
          <Flex mx="-2" mb="1" direction="row" flexWrap="wrap">
            <CheckboxWrapp checked={false} title="Game name" />
            <CheckboxWrapp checked={true} title="card" />
            <CheckboxWrapp checked={false} title="Racing Zone out" />
          </Flex>
        </Box>
        <Box w="100%" mb="3" alignItems="center">
          <Button
            size="lg"
            minH="58px"
            w="100%"
            maxW="400px"
            shadow="1"
            textTransform="uppercase"
            _text={{ fontWeight: 600, fontSize: '2xl' }}
            colorScheme="primary"
            onPress={() => {
              console.log('hello')
            }}
          >
            MATCH SEARCH
          </Button>
        </Box>
      </Container>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
