import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';

const IcoBack = ({  size }) => {
  const fill = '#ffffff';

  return (
    <Svg
      width={11.263}
      height={19.901}
      viewBox="0 0 11.263 19.901"
    >
      <Path
        data-name="Path 279"
        d="M1.416 18.486l8.85-8.681-8.85-8.392"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  );
};

IcoBack.defaultProps = {
  size: 24
};

IcoBack.propTypes = {
  // optional
  size: PropTypes.number
};

export default IcoBack;