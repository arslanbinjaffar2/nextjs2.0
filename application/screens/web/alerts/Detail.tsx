import * as React from 'react';
import PropTypes from 'prop-types';
import AlertDetail from 'application/components/templates/alerts/web/Detail';

type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {
  return (
      <AlertDetail />
  );
};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
