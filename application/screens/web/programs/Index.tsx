import * as React from 'react';
import PropTypes from 'prop-types';
import Master from 'application/screens/web/layouts/Master';
import { useState } from 'react';
import IndexTemplate from 'application/components/templates/programs/Index';

type indexProps = {
  navigation: unknown
}

const Index = ({ navigation }: indexProps) => {

  const [tabs, settabs] = useState<string | null>('PROGRAM');

  return (
    <Master navigation={navigation}>
      <IndexTemplate />
    </Master>
  );
};

Index.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Index;
