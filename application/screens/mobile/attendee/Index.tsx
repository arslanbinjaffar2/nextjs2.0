import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/mobile/layouts/Master';
import Header from 'application/screens/mobile/layouts/headers/Header';
import { Center } from 'native-base';
import IndexTemplate from 'application/components/templates/attendees/mobile/index';
import UseAttendeeService from 'application/store/services/UseAttendeeService';
import { useIsFocused } from '@react-navigation/native';

const Index = ({ navigation }: any) => {

  const { FetchAttendees } = UseAttendeeService();

  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      FetchAttendees({ query: '', group_id: 0, page: 1, my_attendee_id: 0 });
    }
  }, [isFocused]);

  return (
    <Master navigation={navigation}>
      <Header minimal={false} navigation={navigation} />
      <Center w={'100%'} px={15}>
        <IndexTemplate />
      </Center>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
