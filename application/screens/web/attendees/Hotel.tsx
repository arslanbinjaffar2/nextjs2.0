import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import AttendeeHotel from 'application/components/templates/attendees/web/Hotel';

type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {

  return (
    <Master>
      <AttendeeHotel />
    </Master>
  );

};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
