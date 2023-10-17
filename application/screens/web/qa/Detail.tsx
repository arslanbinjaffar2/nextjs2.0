import * as React from 'react';
import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';
import { useState } from 'react';

import DetailTemplate from 'application/components/templates/qa/web/Detail'

type indexProps = {
  navigation: unknown
}

const Detail = ({ navigation }: indexProps) => {
  const [tabs, settabs] = useState<string | null>('ABOUT');
  return (
    <Master>
      <DetailTemplate/>
    </Master>

  );
};

Detail.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Detail;
