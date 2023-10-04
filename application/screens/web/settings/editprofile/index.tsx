import * as React from 'react';

import PropTypes from 'prop-types';

import MasterProfile from 'application/screens/web/layouts/MasterProfile';

import IndexTemplate from 'application/components/templates/settings/editprofile/Index';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  return (
    <MasterProfile>
      <IndexTemplate />
    </MasterProfile>
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
