import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import ProgramDetail from 'application/components/templates/programs/Detail';

type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {
  return (
    <Master navigation={navigation}>
      <ProgramDetail />
    </Master>
  );
};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
