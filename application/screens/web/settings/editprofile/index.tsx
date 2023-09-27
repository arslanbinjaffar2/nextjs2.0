import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';

import { Text } from 'native-base';

// import IndexTemplate from 'application/components/templates/settings/web/editprofile/Index';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  return (
    <Master>
      {/* <IndexTemplate /> */}
      <Text>ddd</Text>
    </Master>
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
