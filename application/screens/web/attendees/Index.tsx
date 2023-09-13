import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import IndexTemplate from 'application/components/templates/attendees/web/Index';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import { createParam } from 'solito';

type indexProps = {
  navigation: unknown
}

type ScreenParams = { slug: any }

const { useParam } = createParam<ScreenParams>()

const Index = ({ navigation }: indexProps) => {

  const { FetchAttendees } = UseAttendeeService();

  const [slug] = useParam('slug');

  React.useEffect(() => {
    if (slug === undefined || slug.length === 0) {
      FetchAttendees({ query: '', group_id: 0, page: 1, my_attendee_id: 0 });
    }
  }, [])

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
