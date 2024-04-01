import * as React from 'react';
import PropTypes from 'prop-types';
import MyRegistrationDetail from "application/components/templates/attendees/web/MyRegistration"

type indexProps = {
  navigation: unknown
}

const MyRegistration = ({ navigation }: indexProps) => {

  return (
      <MyRegistrationDetail />
  );

};

MyRegistration.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MyRegistration;
