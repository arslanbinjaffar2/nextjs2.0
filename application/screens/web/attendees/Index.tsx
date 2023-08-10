import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import IndexTemplate from 'application/components/templates/attendees/web/Index';
import UseAttendeeService from 'application/store/services/UseAttendeeService';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const { FetchAttendees, attendees } = UseAttendeeService();

  React.useEffect(() => {
    FetchAttendees({ query: '', group_id: 0, page: 1 });
  }, [])

  console.log(attendees)
  return (
    <Master>
      <IndexTemplate />
    </Master>
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
