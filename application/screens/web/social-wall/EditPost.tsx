import * as React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import Master from 'application/screens/web/layouts/Master';
import EditPostTemplate from 'application/components/templates/social-wall/EditPost';

type indexProps = {
  navigation: unknown
}

const EditPost = ({ navigation }: indexProps) => {
  return (
      <Container pt="0" maxW="100%" w="100%">
        <EditPostTemplate />
      </Container>
  );
};

EditPost.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default EditPost;
