import * as React from 'react';

import PropTypes from 'prop-types';

import IndexTemplate from 'application/components/templates/networkInterest/web/Index';


type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {
  
  return (
        <IndexTemplate />
  );

};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
