import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import DetailTemplate from 'application/components/templates/floor-plan/web/Detail';

type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {


  return (
      <DetailTemplate />
  );
};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;