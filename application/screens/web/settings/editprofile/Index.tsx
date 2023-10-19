import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';

import IndexTemplate from 'application/components/templates/settings/editProfile/Index';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  return (
    <Master section='settings'>
      <IndexTemplate />
    </Master>
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
