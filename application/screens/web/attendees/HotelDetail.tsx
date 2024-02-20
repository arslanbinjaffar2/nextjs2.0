import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import AttendeeHotelDetail from 'application/components/templates/attendees/web/HotelDetail';

type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {

  return (
      <AttendeeHotelDetail />
  );

};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
