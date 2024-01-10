import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';

import PollDetail from 'application/components/templates/polls/web/Detail';

type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {

  return (
      <PollDetail />
  );

};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
