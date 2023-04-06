import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import AttendeeDetail from 'application/components/templates/attendees/Detail';

type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {

  return (
    <Master navigation={navigation}>
      <AttendeeDetail />
    </Master>
  );

};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
