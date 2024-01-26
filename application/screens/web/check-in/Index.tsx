import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, HStack, Icon, IconButton, Image, Spacer, Text, VStack } from 'native-base';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Master from 'application/screens/web/layouts/Master';
import IndexTemplate from 'application/components/templates/check-in/web/Index'
type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  return (
      <IndexTemplate/>
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
