import * as React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import MyPostsTemplate from 'application/components/templates/social-wall/MyPosts';


type indexProps = {
  navigation: unknown
}

const MyPosts = ({ navigation }: indexProps) => {
  return (
      <Container pt="0" maxW="100%" w="100%">
        <MyPostsTemplate />
      </Container>
  );
};

MyPosts.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MyPosts;
