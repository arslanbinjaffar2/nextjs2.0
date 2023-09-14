import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Stream from 'application/components/organisms/programs/videos/Stream';
import ProgramListing from 'application/components/templates/programs/Listing';
import SpeakerRoundedList from 'application/components/templates/speakers/RoundedList';
import SpeakerListing from 'application/components/organisms/speakers/Listing';
import QAListing from 'application/components/organisms/qa/Listing';
import ChatClient from 'application/components/organisms/chat/ChatClient';
import Master from 'application/screens/web/layouts/Master';
import { Button, HStack, Container, IconButton, Icon, Center, Heading } from 'native-base'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import PollRectangleView from 'application/components/atoms/polls/RectangleView';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const [tab, setTab] = useState('qa')

  return (
    <Master>
      {/* <Stream /> */}
      {/* <ProgramListing /> */}
      <SpeakerRoundedList />
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
        <PollRectangleView />
        <PollRectangleView />
        <Center py="3" px="2" w="100%" alignItems="flex-end">
          <Button p="1" _hover={{ bg: 'transparent', _text: { color: 'primary.500' }, _icon: { color: 'primary.500' } }} bg="transparent" width={'auto'} rightIcon={<Icon as={SimpleLineIcons} name="arrow-right" size="sm" />}>
            Show all
          </Button>
        </Center>
      </Container>
      <HStack mb="3" space={1} justifyContent="center" w="100%">
        <Button onPress={() => setTab('qa')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>Q & A</Button>
        <Button onPress={() => setTab('speakerlist')} borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={!tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>SPEAKERS LIST</Button>
      </HStack>
      <>
        {tab === 'qa' && (
          <QAListing />
        )}
        {tab === 'speakerlist' && (
          <SpeakerListing />
        )}
      </>
      <ChatClient />
    </Master>
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
