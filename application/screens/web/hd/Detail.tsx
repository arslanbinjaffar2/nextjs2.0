import * as React from 'react';
import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';
import { useState } from 'react';

import DetailTemplate from 'application/components/templates/hd/web/Detail'

type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {
  const [tabs, settabs] = useState<string | null>('ABOUT');
  return (
      <DetailTemplate/>
  );
};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
