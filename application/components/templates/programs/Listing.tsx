import React from 'react';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import { Button, Center, Container, Heading, HStack, Icon, IconButton } from 'native-base';
import RectangleDetailView from 'application/components/atoms/programs/RectangleDetailView';

const programs = [{
  id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
  text: 'First point in the agenda, with room for two or three lines of text.',
  starttime: '12:47',
  endtime: '12:47',
  tracks: [{ name: 'Technology', color: '#F5B761' }, { name: 'Nature', color: '#74AD6A' }, { name: 'Banking', color: '#74ADEF' }]
}, {
  id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
  starttime: '11:11',
  endtime: '11:11',
  text: 'First point in the agenda',
  tracks: [{ name: 'Technology', color: '#F5B761' }, { name: 'Banking', color: '#74ADEF' }]
}, {
  id: '58694a0f-3da1-471f-bd96-145571e29d72',
  starttime: '6:22',
  endtime: '6:22',
  text: 'With room for two or three lines of text.',
  tracks: [{ name: 'Technology', color: '#F5B761' }]
}, {
  id: '68694a0f-3da1-431f-bd56-142371e29d72',
  starttime: '8:56',
  endtime: '8:56',
  text: 'First point in the agenda, with room for two or three lines of text.',
  tracks: [{ name: 'Technology', color: '#74ADEF' }]
}, {
  id: '28694a0f-3da1-471f-bd96-142456e29d72',
  starttime: '12:47',
  endtime: '12:47',
  text: 'First point in the agenda, with room for two or three lines of text.',
  tracks: [{ name: 'Technology', color: '#9F1C2B' }]
}];

const HomeListing = () => {
  return (
    <Container mb="3" rounded="10" bg="primary.box" w="100%" maxW="100%">
      <Heading py="1" fontSize="2xl" w="100%" textAlign="center">PROGRAMS</Heading>
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
      {programs?.map((program: any, key: any) =>
        <RectangleDetailView key={key} program={program} />
      )}
      <Center py="3" px="2" w="100%" alignItems="flex-end">
        <Button p="1" _hover={{ bg: 'transparent', _text: { color: 'primary.500' }, _icon: { color: 'primary.500' } }} bg="transparent" width={'auto'} rightIcon={<Icon as={SimpleLineIcons} name="arrow-right" size="sm" />}>
          Show all
        </Button>
      </Center>
    </Container>
  )
}

export default HomeListing;