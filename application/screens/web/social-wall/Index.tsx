import * as React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import Master from 'application/screens/web/layouts/Master';
import VerticalView from 'application/components/templates/social-wall/VerticalView';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
  return (
    <Master navigation={navigation}>
      <Container pt="0" maxW="100%" w="100%">
        <VerticalView />
      </Container>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
