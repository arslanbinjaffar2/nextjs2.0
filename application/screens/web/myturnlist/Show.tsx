import * as React from 'react';
import PropTypes from 'prop-types';

import ShowTemplate from 'application/components/templates/myTurnList/web/Show'

type indexProps = {
  navigation: unknown
}

const Show = ({ navigation }: indexProps) => {
  return (
      <ShowTemplate/>
  );
};

Show.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Show;
