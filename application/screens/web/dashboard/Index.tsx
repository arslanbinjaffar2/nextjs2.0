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
import { Button, HStack } from 'native-base'
import PollListingByDate from 'application/components/organisms/polls/PollListingByDate'
import UsePollService from 'application/store/services/UsePollService';
import UseEventService from 'application/store/services/UseEventService';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const [tab, setTab] = useState('qa')
  const { polls, FetchPolls } = UsePollService();
  React.useEffect(()=>{
      FetchPolls();
  },[])

  return (
    <Master>
      {/* <Stream /> */}
      {/* <ProgramListing /> */}
      <SpeakerRoundedList />
      <PollListingByDate polls={polls} />
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
