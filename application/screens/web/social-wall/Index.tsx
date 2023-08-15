import * as React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import Master from 'application/screens/web/layouts/Master';
import IndexTemplate from 'application/components/templates/social-wall/Index';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
  return (
    <Master>
      <Container pt="0" maxW="100%" w="100%">
        <IndexTemplate />
      </Container>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
