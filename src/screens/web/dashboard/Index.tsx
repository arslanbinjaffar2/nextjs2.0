import * as React from 'react';
import PropTypes from 'prop-types';
import VideoBox from '@src/components/atoms/Videos/VideoBox';
import OurPrograms from '@src/components/molecules/OurPrograms';
import OurSpeakers from '@src/components/molecules/OurSpeakers';
import OurPolls from '@src/components/molecules/OurPolls';
import OurSpeakersList from '@src/components/molecules/OurSpeakersList';
import MiniChatClient from '@src/components/molecules/MiniChatClient';
import Master from '@src/screens/web/layouts/Master';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  return (
    <Master navigation={navigation}>
      <VideoBox />
      <OurPrograms />
      <OurSpeakers />
      <OurPolls />
      <OurSpeakersList />
      <MiniChatClient />
    </Master>

  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
