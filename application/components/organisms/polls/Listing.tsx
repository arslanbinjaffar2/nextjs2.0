import React from 'react';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { Button, Center, Container, Heading, HStack, Icon, IconButton } from 'native-base';
import BoxItem from 'application/components/atoms/polls/BoxItem';

const Listing = () => {
  return (
    <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
      <Heading py="1" fontSize="2xl" w="100%" textAlign="center">POLLS</Heading>
      <HStack py="1" w="100%" bg="primary.darkbox" space="0" alignItems="center">
        <Center alignItems="flex-start" w="10%">
          <IconButton
            p="0"
            w="40px"
            variant="transparent"
            icon={<Icon size="md" as={SimpleLineIcons} name="arrow-left" color="primary.text" />}
            onPress={() => {
              console.log('hello')
            }}
          />
        </Center>
        <Center w="80%">
          <Heading fontSize="lg">Wednesday - Oktober 7</Heading>
        </Center>
        <Center alignItems="flex-end" w="10%">
          <IconButton
            p="0"
            w="40px"
            variant="transparent"
            icon={<Icon size="md" as={SimpleLineIcons} name="arrow-right" color="primary.text" />}
            onPress={() => {
              console.log('hello')
            }}
          />
        </Center>
      </HStack>
      <BoxItem />
      <Center py="3" px="2" w="100%" alignItems="flex-end">
        <Button p="1" _hover={{ bg: 'transparent', _text: { color: 'primary.500' }, _icon: { color: 'primary.500' } }} bg="transparent" width={'auto'} rightIcon={<Icon as={SimpleLineIcons} name="arrow-right" size="sm" />}>
          Show all
        </Button>
      </Center>
    </Container>
  )
}

export default Listing;