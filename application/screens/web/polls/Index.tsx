import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import PollTabView from 'application/components/templates/polls/TabView';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  return (
    <Master navigation={navigation}>
      <PollTabView />
    </Master>
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
