import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import StreamBlock from '@src/components/organisms/programs/videos/StreamBlock';
import ProgramListing from '@src/components/organisms/programs/Listing';
import SpeakerRoundedList from '@src/components/organisms/speakers/RoundedList';
import SpeakerListing from '@src/components/organisms/speakers/Listing';
import QAListing from '@src/components/organisms/qa/Listing';
import PollListing from '@src/components/organisms/polls/Listing';
import ChatClient from '@src/components/organisms/chat/ChatClient';
import Master from '@src/screens/web/layouts/Master';
import { Button, HStack } from 'native-base'

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const [tab, setTab] = useState('qa')

  return (
    <Master navigation={navigation}>
      <StreamBlock />
      <ProgramListing />
      <SpeakerRoundedList />
      <PollListing />
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
