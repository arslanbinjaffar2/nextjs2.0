import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Divider, HStack, Icon, Image, Input, Text, VStack } from 'native-base';
import AntDesign from '@expo/vector-icons/AntDesign';
import Master from 'application/screens/web/layouts/Master';
import IndexTemplate from 'application/components/templates/floor-plan/web/Index';


type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
  return (
    <Master>
      <IndexTemplate/>
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
