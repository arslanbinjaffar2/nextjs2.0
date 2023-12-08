import * as React from 'react';

import PropTypes from 'prop-types';

import Master from 'application/screens/web/layouts/Master';

import SurveyResult from 'application/components/templates/surveys/web/Result';

type indexProps = {
  navigation: unknown
}

const Result = ({ navigation }: indexProps) => {

  return (
      <SurveyResult />
  );

};

Result.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Result;
