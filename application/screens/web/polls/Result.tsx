import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';

import PollResult from 'application/components/templates/polls/web/Result';

type indexProps = {
  navigation: unknown
}

const Result = ({ navigation }: indexProps) => {

  return (
      <PollResult />
  );

};

Result.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Result;
