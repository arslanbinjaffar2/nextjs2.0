import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import StreamBlock from '@src/components/templates/programs/videos/StreamBlock';
import ProgramListing from '@src/components/templates/programs/Listing';
import SpeakerRoundedList from '@src/components/templates/speakers/RoundedList';
import SpeakerListing from '@src/components/templates/speakers/Listing';
import QAListing from '@src/components/templates/qa/Listing';
import OurPolls from '@src/components/molecules/OurPolls';
import MiniChatClient from '@src/components/molecules/MiniChatClient';
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
      <OurPolls />
      <HStack mb="3" space={1} justifyContent="center" w="100%">
        <Button onPress={() => setTab('qa')} borderWidth="1px" py={0} borderColor="primary.darkbox" borderRightRadius="0" borderLeftRadius={8} h="42px" bg={tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>Q & A</Button>
        <Button onPress={() => setTab('speakerlist')} borderWidth="1px" py={0} color="primary.100" borderColor="primary.darkbox" borderLeftRadius="0" borderRightRadius={8} h="42px" bg={!tab ? 'primary.box' : 'primary.darkbox'} w="50%" _text={{ fontWeight: '600' }}>SPEAKERS LIST</Button>
      </HStack>
      <>
        {tab === "qa" && (
          <QAListing />
        )}
        {tab === "speakerlist" && (
          <SpeakerListing />
        )}
      </>
      <MiniChatClient />
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
