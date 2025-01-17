import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import AttendeeBooking from 'application/components/templates/attendees/web/Booking';

type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {

  return (
      <AttendeeBooking />
  );

};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
